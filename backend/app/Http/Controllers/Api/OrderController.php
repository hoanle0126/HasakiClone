<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\OrderRequest;
use App\Http\Resources\UserResource;
use App\Http\Resources\OrderResource;
use App\Models\Cart;
use App\Models\Order;
use App\Http\Controllers\Controller;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paginate = request()->query("paginate");
        $search = trim((string) request()->query("search", ""));

        $query = Order::query()
            ->with([
                "user:id,first_name,last_name,email",
                "products:id,name,thumbnail,price",
                "address:id,name,phone,street_address,ward,district,province",
                "discountCode:id,code,discount",
            ])
            ->orderBy("created_at", "desc");

        if ($search !== "") {
            $query->whereHas("user", function ($q) use ($search) {
                $q->where("first_name", "like", "%{$search}%")
                  ->orWhere("last_name", "like", "%{$search}%")
                  ->orWhere("email", "like", "%{$search}%");
            })->orWhere("id", "like", "%{$search}%");
        }

        $orders = $paginate ? $query->paginate($paginate) : $query->get();

        return OrderResource::collection($orders);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $cart = Cart::where('user_id', Auth::id())->first();

        $orderRequest = [
            "payments" => $request->payments,
            "note" => $request->note,
            "discount_code_id" => $request->discount_code_id,
            "address_id" => $request->address_id
        ];
        $orderRequest['user_id'] = Auth::id();
        $products = request()->products;

        $order = Order::create($orderRequest);
        $cart->delete();

        foreach ($products as $value) {
            // Tự động sync sang slave database qua BelongsToManyWithSync
            $order->Products()->attach($value['id'], [
                'quantity' => $value['quantity_cart']
            ]);
        }

        // Load relationships để gửi socket
        $order->load([
            'user:id,first_name,last_name,email',
            'products:id,name,thumbnail,price',
            'address:id,name,phone,street_address,ward,district,province',
            'discountCode:id,code,discount',
        ]);

        // Gửi thông báo socket cho admin
        try {
            $client = new Client(['timeout' => 2.0]);

            // Chuẩn bị dữ liệu order cho socket
            $orderData = [
                'id' => $order->id,
                'orderId' => 'ORD-' . str_pad($order->id, 3, '0', STR_PAD_LEFT),
                'user' => [
                    'id' => $order->user->id,
                    'first_name' => $order->user->first_name,
                    'last_name' => $order->user->last_name,
                    'email' => $order->user->email,
                ],
                'products' => $order->products->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'thumbnail' => $product->thumbnail,
                        'price' => $product->price,
                        'quantity' => $product->pivot->quantity ?? 0,
                    ];
                }),
                'payments' => $order->payments ?? ['status' => 'pending', 'type' => 'offline'],
                'address' => $order->address ? [
                    'id' => $order->address->id,
                    'name' => $order->address->name,
                    'phone' => $order->address->phone,
                    'street_address' => $order->address->street_address,
                    'ward' => $order->address->ward,
                    'district' => $order->address->district,
                    'province' => $order->address->province,
                ] : null,
                'created_at' => $order->created_at->toISOString(),
            ];

            // Gửi thông báo đơn hàng mới
            $client->post(env('SOCKET_URL', 'http://localhost:3001') . '/notify-new-order', [
                'json' => [
                    'event' => 'new_order',
                    'order' => $orderData,
                ]
            ]);

            Log::info('Order notification sent to socket server: Order #' . $order->id);
        } catch (\Throwable $th) {
            Log::error('Failed to send order notification to socket: ' . $th->getMessage());
        }

        return new UserResource(request()->user());
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load([
            "user:id,first_name,last_name,email",
            "products:id,name,thumbnail,price",
            "address:id,name,phone,street_address,ward,district,province",
            "discountCode:id,code,discount",
        ]);

        return new OrderResource($order);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $oldStatus = $order->payments['status'] ?? 'pending';
        $isStatusChanged = false;

        if ($request->has("payments")) {
            $payments = $order->payments ?? [];
            $payments = array_merge($payments, $request->payments);
            $order->payments = $payments;
            
            // Kiểm tra nếu status được đổi thành "completed"
            if (isset($request->payments['status']) && $request->payments['status'] === 'completed' && $oldStatus !== 'completed') {
                $isStatusChanged = true;
            }
        }

        if ($request->has("note")) {
            $order->note = $request->note;
        }

        $order->save();

        $order->load([
            "user:id,first_name,last_name,email",
            "products:id,name,thumbnail,price",
            "address:id,name,phone,street_address,ward,district,province",
            "discountCode:id,code,discount",
        ]);

        // Nếu đơn hàng được xác nhận (status = completed), gửi socket notification
        if ($isStatusChanged) {
            // Gửi thông báo socket cho user
            try {
                $client = new Client(['timeout' => 2.0]);

                // Chuẩn bị dữ liệu order cho socket
                $orderData = [
                    'id' => $order->id,
                    'orderId' => 'ORD-' . str_pad($order->id, 3, '0', STR_PAD_LEFT),
                    'user' => [
                        'id' => $order->user->id,
                        'first_name' => $order->user->first_name,
                        'last_name' => $order->user->last_name,
                        'email' => $order->user->email,
                    ],
                    'products' => $order->products->map(function ($product) {
                        return [
                            'id' => $product->id,
                            'name' => $product->name,
                            'thumbnail' => $product->thumbnail,
                            'price' => $product->price,
                            'quantity' => $product->pivot->quantity ?? 0,
                        ];
                    }),
                    'payments' => $order->payments ?? ['status' => 'completed', 'type' => 'offline'],
                    'address' => $order->address ? [
                        'id' => $order->address->id,
                        'name' => $order->address->name,
                        'phone' => $order->address->phone,
                        'street_address' => $order->address->street_address,
                        'ward' => $order->address->ward,
                        'district' => $order->address->district,
                        'province' => $order->address->province,
                    ] : null,
                    'updated_at' => $order->updated_at->toISOString(),
                ];

                // Gửi thông báo đến user cụ thể
                $client->post(env('SOCKET_URL', 'http://localhost:3001') . '/notify-user-order', [
                    'json' => [
                        'event' => 'order_processed',
                        'userId' => $order->user->id,
                        'order' => $orderData,
                        'message' => `Đơn hàng #${$order->id} đã được xác nhận và đang được chuẩn bị!`,
                    ]
                ]);

                Log::info('Order processed notification sent to socket server for user: ' . $order->user->id);
            } catch (\Throwable $th) {
                Log::error('Failed to send order processed notification to socket: ' . $th->getMessage());
            }
        }

        return new OrderResource($order);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}

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
            $order->Products()->attach($value['id'], [
                'quantity' => $value['quantity_cart']
            ]);
        }

        try {
            $client = new Client(['timeout' => 2.0]);

            $client->post('https://n8n.tuantran.io.vn/webhook-test/order-success', [
                'json' => [  // 👈 QUAN TRỌNG: Phải có key 'json' này
                    'payments' => $request->payments,
                    "user" => Auth::user(),
                    "products" => $products,
                    "id"=> $order->id,
                    "created_at"=> $order->created_at,
                ]
            ]);
        } catch (\Throwable $th) {
            //throw $th;
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
        if ($request->has("payments")) {
            $payments = $order->payments ?? [];
            $payments = array_merge($payments, $request->payments);
            $order->payments = $payments;
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

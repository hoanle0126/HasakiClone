<?php

namespace App\Http\Controllers\Api;

use App\Events\ReviewReplied;
use App\Http\Requests\ReviewRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\Review;
use App\Http\Controllers\Controller;
use Auth;
use GuzzleHttp\Client;
use Http;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product_id = 197403;
        $hasPurchased = request()->user()->Orders()->whereHas("products", function ($query) use ($product_id) {
            $query->where('products.id', $product_id);
        })->exists();
        return response()->json([
            "test" => $hasPurchased
        ]);
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
        $user = Auth::user();
        $review = Review::create([
            'user_id' => $request['user']['id'],
            'product_id' => $request['product_id'],
            'rating' => $request['rating'],
            'description' => $request['description'] ?? '',
            'images' => $request['images'] ?? [],
        ]);

        try {
            // Thêm timeout=2s để lỡ n8n bị lag thì web của bạn không bị treo theo
            $client = new Client(['timeout' => 2.0]);

            $client->post('https://n8n.tuantran.io.vn/webhook/auto-reply', [
                'json' => [  // 👈 QUAN TRỌNG: Phải có key 'json' này
                    'description' => $request['description'] ?? 'Sản phẩm tốt',
                    'user' => $request['user'], // Gửi tên thôi cho nhẹ, gửi cả obj $user cũng được
                    'product_id' => $request['product_id'],
                    'review_id' => $review->id,
                    'rating' => $request['rating']
                ]
            ]);
        } catch (\Exception $e) {
            // Ghi log nếu lỗi, nhưng không chặn người  
            \Log::error("Lỗi gửi Webhook n8n: " . $e->getMessage());
        }

        return new ProductResource(Product::find($request['product_id']));
    }

    public function saveAiReply(Request $request)
    {
        // 1. Lưu vào DB (Giữ nguyên code cũ)
        $review = Review::find($request->review_id);
        $review->reply = $request->reply_content;
        $review->updated_at = now(); // Cập nhật thời gian
        $review->save();

        // 2. --- THAY THẾ PUSHER BẰNG SOCKET.IO ---
        // Gọi sang Node.js đang chạy ở localhost:6001 trên VPS
        try {
            $client = new Client();

            // Gửi data tới Node Socket server
            $client->post('http://localhost:3001/notify-new-review', [
                'json' => [
                    'product_id' => $request->product_id,
                    'data' => [
                        'message' => $request->reply_content
                    ]
                ]
            ]);
        } catch (\Exception $e) {
            \Log::error("Lỗi gọi Socket: " . $e->getMessage());
        }

        return response()->json(['status' => 'OK']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        //
    }
}

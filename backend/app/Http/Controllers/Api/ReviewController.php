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

            $client->post('https://n8n.tuantran.io.vn/webhook-test/auto-reply', [
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
        // Validate input trước
        $request->validate([
            'review_id' => 'required|exists:reviews,id',
            'reply_content' => 'required|string',
            'product_id' => 'required'
        ]);

        try {
            // 1. Tìm review (dùng findOrFail để throw exception nếu không tìm thấy)
            $review = Review::findOrFail($request->review_id);

            // Cập nhật reply
            $review->reply = $request->reply_content;
            $review->updated_at = now();
            $review->save();

            // 2. Gửi notification sang Socket.IO
            try {
                $client = new Client(['timeout' => 5]);

                $client->post('http://localhost:3001/notify-new-review', [
                    'json' => [
                        'product_id' => $request->product_id,
                        'data' => [
                            'review_id' => $review->id,
                            'product_id' => $request->product_id,
                            'message' => $request->reply_content,
                            'updated_at' => $review->updated_at->toIso8601String()
                        ]
                    ]
                ]);

                \Log::info("✅ Socket notification sent for review #{$review->id}");

            } catch (\GuzzleHttp\Exception\ConnectException $e) {
                // Socket server không chạy hoặc không kết nối được
                \Log::warning("⚠️ Cannot connect to Socket server: " . $e->getMessage());
                // Không throw lỗi, vẫn trả về success vì đã lưu DB

            } catch (\Exception $e) {
                \Log::error("❌ Socket notification error: " . $e->getMessage());
            }

            return response()->json([
                'status' => 'OK',
                'message' => 'AI reply saved successfully',
                'data' => [
                    'review_id' => $review->id,
                    'reply' => $review->reply
                ]
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Review không tồn tại
            \Log::error("Review not found: " . $request->review_id);

            return response()->json([
                'status' => 'ERROR',
                'message' => 'Review not found'
            ], 404);

        } catch (\Exception $e) {
            // Lỗi khác
            \Log::error("Error saving AI reply: " . $e->getMessage());

            return response()->json([
                'status' => 'ERROR',
                'message' => 'Failed to save AI reply',
                'error' => $e->getMessage()
            ], 500);
        }
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

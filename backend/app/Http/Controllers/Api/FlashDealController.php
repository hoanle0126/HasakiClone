<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\FlashDealResource;
use App\Http\Resources\ProductResource;
use App\Models\FlashDeal;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class FlashDealController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $flashDeal = Cache::remember("flash_deal:first", 60, function () {
            return FlashDeal::with([
                // Eager-load để tránh N+1 khi build ProductResource
                "products.reviews",
                "products.categories",
                "products.brand",
            ])->first();
        });

        return new FlashDealResource($flashDeal);
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
        $flashDeal = FlashDeal::first();
        $flashDeal->update([
            "start_time" => Carbon::parse($request->start_time),
            "end_time" => Carbon::parse($request->end_time)
        ]);
        if (!empty($request->products)) {
            foreach ($request->products as $product) {
                $existing = $flashDeal->Products()->where('product_id', $product['id'])->first();
                if ($existing) {
                    $flashDeal->products()->syncWithoutDetaching($product['id']);
                } else {
                    $flashDeal->products()->attach($product['id']);
                }
            }
        }

        Cache::forget("flash_deal:first"); // Làm mới cache sau khi cập nhật

        // Gửi thông báo socket cho admin
        try {
            $client = new Client(['timeout' => 2.0]);
            $client->post(env('SOCKET_URL', 'http://localhost:3001') . '/notify-flash-deals', [
                'json' => [
                    'action' => 'updated',
                    'flashDeal' => [
                        'id' => $flashDeal->id,
                        'start_time' => $flashDeal->start_time ? Carbon::parse($flashDeal->start_time)->toISOString() : null,
                        'end_time' => $flashDeal->end_time ? Carbon::parse($flashDeal->end_time)->toISOString() : null,
                        'updated_at' => $flashDeal->updated_at->toISOString(),
                    ]
                ]
            ]);
            Log::info('Flash Deal notification sent to socket server: Flash Deal #' . $flashDeal->id);
        } catch (\Throwable $th) {
            Log::error('Failed to send flash deal notification to socket: ' . $th->getMessage());
        }

        return new FlashDealResource(FlashDeal::with([
            "products.reviews",
            "products.categories",
            "products.brand",
        ])->first());
    }

    /**
     * Display the specified resource.
     */
    public function show(FlashDeal $flashDeal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FlashDeal $flashDeal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FlashDeal $flashDeal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FlashDeal $flashDeal)
    {
        //
    }
}

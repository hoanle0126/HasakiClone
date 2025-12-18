<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\HotDealRequest;
use App\Http\Resources\HotDealResource;
use App\Models\HotDeal;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class HotDealController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hotDeals = Cache::remember("hot_deals:all", 60, function () {
            return HotDeal::with([
                // Eager-load toàn bộ depth cần thiết để tránh N+1
                "dates.products.reviews",
                "dates.products.categories",
                "dates.products.brand",
            ])->get();
        });

        return HotDealResource::collection($hotDeals);
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
    public function store(HotDealRequest $request)
    {
        $hotDeal = HotDeal::create($request->validated());

        foreach ($request->deal_times as $deals_time) {
            $hotDealTime = $hotDeal->dates()->create([
                'time' => Carbon::parse($deals_time['time'])
            ]);

            foreach ($deals_time['products'] as $product) {
                $hotDealTime->products()->attach(
                    $product['product']['id'],
                    [
                        'sales' => $product['sales']
                    ]
                );
            }
        }

        Cache::forget("hot_deals:all"); // Làm mới cache sau khi tạo

        // Gửi thông báo socket cho admin
        try {
            $client = new Client(['timeout' => 2.0]);
            $client->post(env('SOCKET_URL', 'http://localhost:3001') . '/notify-hot-deals', [
                'json' => [
                    'action' => 'created',
                    'hotDeal' => [
                        'id' => $hotDeal->id,
                        'name' => $hotDeal->name,
                        'created_at' => $hotDeal->created_at->toISOString(),
                    ]
                ]
            ]);
            Log::info('Hot Deal notification sent to socket server: Hot Deal #' . $hotDeal->id);
        } catch (\Throwable $th) {
            Log::error('Failed to send hot deal notification to socket: ' . $th->getMessage());
        }

        return $this->index();
    }

    /**
     * Display the specified resource.
     */
    public function show(HotDeal $hotDeal)
    {
        return new HotDealResource($hotDeal);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HotDeal $hotDeal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(HotDealRequest $request, HotDeal $hotDeal)
    {
        $hotDeal->update($request->validated());

        $hotDeal->dates()->delete();
        foreach ($request->deal_times as $deals_time) {
            $hotDealTime = $hotDeal->dates()->create([
                'time' => Carbon::parse($deals_time['time'])
            ]);

            foreach ($deals_time['products'] as $product) {
                $hotDealTime->products()->attach(
                    $product['product']['id'],
                    [
                        'sales' => $product['sales']
                    ]
                );
            }
        }

        Cache::forget("hot_deals:all"); // Làm mới cache sau khi cập nhật

        // Gửi thông báo socket cho admin
        try {
            $client = new Client(['timeout' => 2.0]);
            $client->post(env('SOCKET_URL', 'http://localhost:3001') . '/notify-hot-deals', [
                'json' => [
                    'action' => 'updated',
                    'hotDeal' => [
                        'id' => $hotDeal->id,
                        'name' => $hotDeal->name,
                        'updated_at' => $hotDeal->updated_at->toISOString(),
                    ]
                ]
            ]);
            Log::info('Hot Deal notification sent to socket server: Hot Deal #' . $hotDeal->id);
        } catch (\Throwable $th) {
            Log::error('Failed to send hot deal notification to socket: ' . $th->getMessage());
        }

        return $this->index();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HotDeal $hotDeal)
    {
        $hotDealId = $hotDeal->id;
        $hotDealName = $hotDeal->name;
        $hotDeal->delete();

        Cache::forget("hot_deals:all"); // Làm mới cache sau khi xóa

        // Gửi thông báo socket cho admin
        try {
            $client = new Client(['timeout' => 2.0]);
            $client->post(env('SOCKET_URL', 'http://localhost:3001') . '/notify-hot-deals', [
                'json' => [
                    'action' => 'deleted',
                    'hotDeal' => [
                        'id' => $hotDealId,
                        'name' => $hotDealName,
                    ]
                ]
            ]);
            Log::info('Hot Deal notification sent to socket server: Hot Deal #' . $hotDealId . ' deleted');
        } catch (\Throwable $th) {
            Log::error('Failed to send hot deal notification to socket: ' . $th->getMessage());
        }

        return $this->index();
    }
}

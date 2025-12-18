<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\DiscountCodeRequest;
use App\Http\Resources\DiscountCodeResource;
use App\Models\DiscountCode;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class DiscountCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $discountCodes = Cache::remember("discount_codes:all", 60, function () {
            return DiscountCode::with([
                "products",
                "brands",
            ])->get();
        });

        return DiscountCodeResource::collection($discountCodes);
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
    public function store(DiscountCodeRequest $request)
    {
        $discountCode = $request->validated();
        $discountCode['products'] = request()->products;
        $discountCode['brands'] = request()->brands;
        $products = request()->products;
        $brands = request()->brands;
        $code = DiscountCode::create($discountCode);

        foreach ($products as $product) {
            $code->Products()->attach($product['id']);
        }

        foreach ($brands as $brand) {
            $code->Brands()->attach($brand['id']);
        }

        Cache::forget("discount_codes:all"); // Làm mới cache sau khi tạo

        // Gửi thông báo socket cho admin
        try {
            $client = new Client(['timeout' => 2.0]);
            $client->post(env('SOCKET_URL', 'http://localhost:3001') . '/notify-discount-codes', [
                'json' => [
                    'action' => 'created',
                    'discountCode' => [
                        'id' => $code->id,
                        'code' => $code->code,
                        'name' => $code->name,
                        'discount' => $code->discount,
                        'created_at' => $code->created_at->toISOString(),
                    ]
                ]
            ]);
            Log::info('Discount Code notification sent to socket server: Discount Code #' . $code->id);
        } catch (\Throwable $th) {
            Log::error('Failed to send discount code notification to socket: ' . $th->getMessage());
        }

        return DiscountCodeResource::collection(
            DiscountCode::with(["products", "brands"])->get()
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(DiscountCode $discountCode)
    {
        return new DiscountCodeResource($discountCode);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DiscountCode $discountCode)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DiscountCodeRequest $request, DiscountCode $discountCode)
    {
        $discountCodeForm = $request->validated();
        $discountCodeForm['products'] = request()->products;
        $discountCodeForm['brands'] = request()->brands;
        $products = request()->products;
        $brands = request()->brands;
        $discountCode->update($discountCodeForm);

        $discountCode->Products()->detach();
        foreach ($products as $product) {
            $discountCode->Products()->attach($product['id']);
        }

        $discountCode->Brands()->detach();
        foreach ($brands as $brand) {
            $discountCode->Brands()->attach($brand['id']);
        }

        Cache::forget("discount_codes:all"); // Làm mới cache sau khi cập nhật

        // Gửi thông báo socket cho admin
        try {
            $client = new Client(['timeout' => 2.0]);
            $client->post(env('SOCKET_URL', 'http://localhost:3001') . '/notify-discount-codes', [
                'json' => [
                    'action' => 'updated',
                    'discountCode' => [
                        'id' => $discountCode->id,
                        'code' => $discountCode->code,
                        'name' => $discountCode->name,
                        'discount' => $discountCode->discount,
                        'updated_at' => $discountCode->updated_at->toISOString(),
                    ]
                ]
            ]);
            Log::info('Discount Code notification sent to socket server: Discount Code #' . $discountCode->id);
        } catch (\Throwable $th) {
            Log::error('Failed to send discount code notification to socket: ' . $th->getMessage());
        }

        return DiscountCodeResource::collection(
            DiscountCode::with(["products", "brands"])->get()
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DiscountCode $discountCode)
    {
        $discountCodeId = $discountCode->id;
        $discountCodeCode = $discountCode->code;
        $discountCode->delete();

        Cache::forget("discount_codes:all"); // Làm mới cache sau khi xóa

        // Gửi thông báo socket cho admin
        try {
            $client = new Client(['timeout' => 2.0]);
            $client->post(env('SOCKET_URL', 'http://localhost:3001') . '/notify-discount-codes', [
                'json' => [
                    'action' => 'deleted',
                    'discountCode' => [
                        'id' => $discountCodeId,
                        'code' => $discountCodeCode,
                    ]
                ]
            ]);
            Log::info('Discount Code notification sent to socket server: Discount Code #' . $discountCodeId . ' deleted');
        } catch (\Throwable $th) {
            Log::error('Failed to send discount code notification to socket: ' . $th->getMessage());
        }

        return $this->index();
    }
}

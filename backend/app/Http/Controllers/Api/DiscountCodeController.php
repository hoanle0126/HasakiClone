<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\DiscountCodeRequest;
use App\Http\Resources\DiscountCodeResource;
use App\Models\DiscountCode;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
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

        return DiscountCodeResource::collection(
            DiscountCode::with(["products", "brands"])->get()
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DiscountCode $discountCode)
    {
        $discountCode->delete();

        Cache::forget("discount_codes:all"); // Làm mới cache sau khi xóa
        return $this->index();
    }
}

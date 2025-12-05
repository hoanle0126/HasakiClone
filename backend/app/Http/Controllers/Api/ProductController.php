<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Brand;
use App\Models\Categories;
use App\Models\Product;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paginate = request()->query("paginate");
        $search = request()->query("search");
        $excludingParam = request()->query("excluding");
        $excluding = $excludingParam ? explode(",", $excludingParam) : [];
        return ProductResource::collection(Product::where("name", "like", "%{$search}%")
            ->whereNotIn("id", $excluding)
            ->orderBy("created_at", "desc")
            ->paginate($paginate));
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
        try {
            // Cố gắng tạo sản phẩm
            Product::create($request->all());

            // Nếu thành công, trả về index
            return $this->index();

        } catch (Exception $e) {
            // Nếu có lỗi, trả về object lỗi (JSON)
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi lưu sản phẩm.',
                'error_detail' => $e->getMessage() // Lấy chi tiết lỗi
            ], 500); // Mã lỗi 500 (Internal Server Error)
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $product->update($request->all());
        return $this->index();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return $this->index();
    }
}

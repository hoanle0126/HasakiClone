<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Brand;
use App\Models\Categories;
use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paginate = request()->query("paginate");
        $search = trim((string) request()->query("search", ""));
        $excludingParam = request()->query("excluding");
        $excluding = $excludingParam ? explode(",", $excludingParam) : [];

        $cacheKey = sprintf(
            "products_index:%s:%s:%s",
            $paginate ?? "null",
            $search ?: "_",
            implode("-", $excluding)
        );

        $products = Cache::remember($cacheKey, 60, function () use ($paginate, $search, $excluding) {
            $query = Product::query()
                ->with([
                    // Eager-load tối thiểu để tránh N+1 nhưng không tải khối lượng lớn
                    "reviews",
                    "categories:id,name,url,thumbnail,parent_id",
                    "brand:id,name,logo",
                ])
                ->whereNotIn("id", $excluding)
                ->orderBy("created_at", "desc");

            if ($search !== "") {
                // Chỉ lọc khi có chuỗi search để tránh full table scan không cần thiết
                $query->where("name", "like", "%{$search}%");
            }

            return $query->paginate($paginate);
        });

        return ProductResource::collection($products);
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
            $product = Product::create($request->all());
            Cache::flush(); // Xóa cache để dữ liệu mới hiển thị ngay

            $client = new Client(['timeout' => 2.0]);

            $client->post('https://n8n.tuantran.io.vn/webhook/add-products', [
                'json' => [  // 👈 QUAN TRỌNG: Phải có key 'json' này
                    'url' => $product['url']
                ]
            ]);
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
        Cache::flush(); // Làm mới cache sau khi cập nhật
        return $this->index();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        Cache::flush(); // Làm mới cache sau khi xóa
        return $this->index();
    }
}

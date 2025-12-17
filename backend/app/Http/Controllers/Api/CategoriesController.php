<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\CategoriesResource;
use App\Http\Resources\CategoryResource;
use App\Models\Categories;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Categories::where("name", "Sức Khỏe - Làm Đẹp")->first();
        return CategoriesResource::collection(Cache::remember("categories:index", 60, function () use ($categories) {
            return Categories::with([
                "children",
                "products",
            ])->where("parent_id", $categories->id)->get();
        }));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return CategoriesResource::collection(Cache::remember("categories:create", 60, function () {
            return Categories::with([
                "children",
                "products",
            ])->where("type", "Heath & Beauty")->get();
        }));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $parentId = null)
    {
        $category = Categories::create([
            "name" => $request['name'],
            "thumbnail" => $request['thumbnail'],
            "type" => $request['type'],
            "parent_id" => $parentId
        ]);
        Cache::forget("categories:index");
        Cache::forget("categories:create");
        Cache::forget("categories:children");
        // Cache chi tiết theo slug/page sẽ tự hết hạn; dùng flush nhỏ này cho các key chính

        // // Đệ quy thêm children nếu có
        // $children = $request['children'] ?? [];
        // if (!empty($children)) {
        //     foreach ($children as $child) {
        //         $childRequest = new Request($child); // Tạo request mới cho child
        //         $this->store($childRequest, $category->id);
        //     }
        // }

        // // Chỉ trả về khi là cấp gốc
        // if ($parentId === null) {
        //     return CategoryResource::collection(Categories::all());
        // }
    }

    /**
     * Display the specified resource.
     */
    public function show($categories)
    {
        $cacheKey = "categories:show:" . $categories . ":page_" . request()->query("page", 1);
        [$category, $productChildren] = Cache::remember($cacheKey, 60, function () use ($categories) {
            $category = Categories::with([
                "children",
                "products",
            ])->where("url", $categories)->first();
            $productChildren = Product::whereIn("categories_id", $category->getAllChildIds())->paginate(40);
            return [$category, $productChildren];
        });

        return response()->json([
            "products" => $productChildren,
            "category" => new CategoryResource($category)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Categories $categories)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $categories)
    {
        $category = Categories::where("id", $categories)->first();
        $category->update([
            "name" => $request['name'],
            "thumbnail" => $request['thumbnail'],
            "type" => $request['type']
        ]);
        Cache::forget("categories:index");
        Cache::forget("categories:create");
        Cache::forget("categories:children");

        // // Đệ quy thêm children nếu có
        $children = $request['children'] ?? [];
        if (!empty($children)) {
            foreach ($children as $child) {
                $childRequest = new Request($child); // Tạo request mới cho child
                $this->update($childRequest, $child['id']);
            }
        }

        // // Chỉ trả về khi là cấp gốc
        if ($category['parent_id'] === null) {
            return $this->index();
        }

        return $this->index();

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($categories)
    {
        $category = Categories::where("id", $categories)->first();
        $category->delete();
        $this->deleteChildren($category);

        Cache::forget("categories:index");
        Cache::forget("categories:create");
        Cache::forget("categories:children");
        return $this->index();
    }

    public function deleteChildren($categories)
    {
        foreach ($categories->children as $child) {
            $this->deleteChildren($child);
            $child->delete();
        }
    }
}

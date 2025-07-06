<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\CategoriesResource;
use App\Models\Categories;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CategoriesResource::collection(Categories::whereNull("parent_id")
            ->with("parent")
            ->get());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return CategoriesResource::collection(Categories::where("type", "Heath & Beauty")->get());
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

        // Đệ quy thêm children nếu có
        $children = $request['children'] ?? [];
        if (!empty($children)) {
            foreach ($children as $child) {
                $childRequest = new Request($child); // Tạo request mới cho child
                $this->store($childRequest, $category->id);
            }
        }

        // Chỉ trả về khi là cấp gốc
        if ($parentId === null) {
            return CategoriesResource::collection(Categories::all());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($categories)
    {
        $category = Categories::where("id", $categories)->first();
        return new CategoriesResource($category);
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

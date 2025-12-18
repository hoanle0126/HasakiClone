<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\BrandResource;
use App\Models\Brand;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $limit = (int) request()->query("limit", 50);
        $page = (int) request()->query("page", 1);

        $cacheKey = "brands:index:limit_{$limit}:page_{$page}";

        $brands = Cache::remember($cacheKey, 60, function () use ($limit) {
            return Brand::select([
                "id",
                "name",
                "url",
                "description",
                "thumbnail",
                "banner",
                "logo",
                "created_at",
                "updated_at",
            ])
                ->orderBy('created_at', 'desc')
                ->paginate($limit);
        });

        return BrandResource::collection($brands);
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
        $brand = Brand::create([
            "name" => $request->name,
            "description" => $request->description,
            "thumbnail" => $request->thumbnail,
            "logo" => $request->logo,
            "banner" => $request->banner
        ]);

        Cache::flush();

        // Gửi thông báo socket cho admin
        try {
            $client = new Client(['timeout' => 2.0]);
            $client->post(env('SOCKET_URL', 'http://localhost:3001') . '/notify-brands', [
                'json' => [
                    'action' => 'created',
                    'brand' => [
                        'id' => $brand->id,
                        'name' => $brand->name,
                        'url' => $brand->url,
                        'thumbnail' => $brand->thumbnail,
                        'logo' => $brand->logo,
                        'banner' => $brand->banner,
                        'created_at' => $brand->created_at->toISOString(),
                    ]
                ]
            ]);
            Log::info('Brand notification sent to socket server: Brand #' . $brand->id);
        } catch (\Throwable $th) {
            Log::error('Failed to send brand notification to socket: ' . $th->getMessage());
        }

        return $this->index();
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        $products = $brand->products()->with([
            // Eager-load để tránh N+1 cho các trường trong ProductResource
            "reviews",
            "categories",
            "brand",
        ]);
        $sort = request()->query("sort");
        $paginate = request()->query("limit");
        switch ($sort) {
            case 'price_asc':
                $products->orderBy("price");
                break;
            case 'price_desc':
                $products->orderByDesc("price");
                break;
            case 'new':
                $products->orderByDesc("created_at");
                break;

            default:
                # code...
                break;
        }
        return [
            "brand" => new BrandResource($brand),
            "products" => $products->paginate($paginate ? $paginate : 40)
        ];
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Brand $brand)
    {
        $brand->update([
            "name" => $request->name,
            "description" => $request->description,
            "thumbnail" => $request->thumbnail,
            "logo" => $request->logo,
            "banner" => $request->banner
        ]);

        Cache::flush();

        // Gửi thông báo socket cho admin
        try {
            $client = new Client(['timeout' => 2.0]);
            $client->post(env('SOCKET_URL', 'http://localhost:3001') . '/notify-brands', [
                'json' => [
                    'action' => 'updated',
                    'brand' => [
                        'id' => $brand->id,
                        'name' => $brand->name,
                        'url' => $brand->url,
                        'thumbnail' => $brand->thumbnail,
                        'logo' => $brand->logo,
                        'banner' => $brand->banner,
                        'updated_at' => $brand->updated_at->toISOString(),
                    ]
                ]
            ]);
            Log::info('Brand notification sent to socket server: Brand #' . $brand->id);
        } catch (\Throwable $th) {
            Log::error('Failed to send brand notification to socket: ' . $th->getMessage());
        }

        return $this->index();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        $brandId = $brand->id;
        $brandName = $brand->name;
        $brand->delete();

        Cache::flush();

        // Gửi thông báo socket cho admin
        try {
            $client = new Client(['timeout' => 2.0]);
            $client->post(env('SOCKET_URL', 'http://localhost:3001') . '/notify-brands', [
                'json' => [
                    'action' => 'deleted',
                    'brand' => [
                        'id' => $brandId,
                        'name' => $brandName,
                    ]
                ]
            ]);
            Log::info('Brand notification sent to socket server: Brand #' . $brandId . ' deleted');
        } catch (\Throwable $th) {
            Log::error('Failed to send brand notification to socket: ' . $th->getMessage());
        }

        return $this->index();
    }
}

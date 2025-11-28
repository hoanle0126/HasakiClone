<?php

use App\Events\NewMessage;
use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CategoriesController;
use App\Http\Controllers\Api\DiscountCodeController;
use App\Http\Controllers\Api\FlashDealController;
use App\Http\Controllers\Api\HotDealController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VoucherController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\PaymentController;
use App\Http\Resources\BrandResource;
use App\Http\Resources\CategoriesResource;
use App\Http\Resources\CityResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\UserResource;
use App\Models\Brand;
use App\Models\Categories;
use App\Models\City;
use App\Models\District;
use App\Models\HotDeal;
use App\Models\Product;
use App\Models\Ward;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource("/categories", CategoriesController::class);
Route::apiResource("/brands", BrandController::class);
Route::post("/add-brands", function (Request $request) {
    $categories = HotDeal::all();
    foreach ($categories as $category) {
        $category->update(['url' => Str::slug($category->name)]);

    }
    return HotDeal::all();
});
Route::get("/add-products", function () {
    // Xử lý từng đợt 100 sản phẩm để không bị hết RAM
    Product::chunk(100, function ($products) {
        foreach ($products as $product) {
            // Kiểm tra xem images có phải mảng và có dữ liệu không
            if (is_array($product->images) && count($product->images) > 0) {
                $product->update([
                    "thumbnail" => $product->images[0]
                ]);
            }
        }
    });

    return "Đã cập nhật thumbnail thành công!";
});

Route::get('/debug-config', function () {
    return [
        'message' => 'Kiểm tra cấu hình Database thực tế',
        'db_host_from_config' => config('database.connections.mysql.host'),
        'db_port_from_config' => config('database.connections.mysql.port'),
        'db_host_from_env' => env('DB_HOST'),
        'db_socket' => env('DB_SOCKET'), // Kẻ thù thầm lặng
    ];
});

Route::apiResource("/products", ProductController::class);
Route::apiResource("/users", UserController::class);
Route::post("/payments", [PaymentController::class, 'processPayment']);
Route::apiResource("/addresses", AddressController::class)->middleware('auth:sanctum');
Route::apiResource("/carts", CartController::class)->middleware('auth:sanctum');
Route::apiResource("/orders", OrderController::class)->middleware('auth:sanctum');
Route::apiResource("/hot-deals", HotDealController::class);
Route::apiResource("/flash-deals", FlashDealController::class);
Route::apiResource("/discount-codes", DiscountCodeController::class);
Route::apiResource("/reviews", ReviewController::class)->middleware('auth:sanctum');
Route::get('/categories-children', function (Request $request) {
    $categories = Categories::where("type", "Heath & Beauty")
        ->get()
        ->filter(function ($item) {
            return $item->children->isEmpty();
        });
    return CategoriesResource::collection($categories);
});


Route::get("/list_cities", function () {
    return CityResource::collection(City::all());
});
require __DIR__ . '/auth.php';
<?php

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
use App\Http\Controllers\Api\VoucherController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\BrandResource;
use App\Http\Resources\CategoriesResource;
use App\Http\Resources\CityResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\UserResource;
use App\Models\Attribute;
use App\Models\AttributeOption;
use App\Models\Brand;
use App\Models\Categories;
use App\Models\City;
use App\Models\District;
use App\Models\HotDeal;
use App\Models\Product;
use App\Models\Ward;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use function PHPUnit\Framework\isArray;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource("/categories", CategoriesController::class);
Route::apiResource("/brands", BrandController::class);

Route::apiResource("/products", ProductController::class);
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
Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest')
    ->name('login');
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:sanctum')
    ->name('logout');
Route::get('/user', function () {

    return new UserResource(request()->user());
})
    ->middleware('auth:sanctum')
    ->name('login');

Route::get("/list_cities", function () {
    return CityResource::collection(City::all());
});



Route::post("/add-products", function (Request $request) {
    $products = $products = $request->input('products', []);

    if (!is_array($products) || empty($products)) {
        return response()->json(['error' => 'products must be a non-empty array'], 400);
    }

    foreach ($products as $product) {
        // $category = Categories::where("name", $product['category'])->first();
        // $brand = Brand::where("name", $product['brand'])->first();
        // $products_name = Product::where("name", $product["name"])->exists();
        $product_id_exist = Product::where("id", $product["id"])->exists();
        $product_id = Product::where("id", $product["id"])->first();
        // $attributes = $product["attribute"];

        // if (!$category || !$brand) {
        //     continue; // hoặc return lỗi
        // }

        // if (Product::find($product['id'])) {
        //     continue; // tránh duplicate ID
        // }

        // if (!$products_name) {
        //     Product::create([
        //         "id" => $product["id"],
        //         "name" => $product["name"],
        //         "english_name" => $product["english_name"],
        //         "sku" => $product["sku"],
        //         "images" => $product["images"],
        //         "thumbnail" => $product["images"][0] ?? null,
        //         "price" => $product["price"],
        //         "sales" => $product["sales"],
        //         "description" => $product["description"],
        //         "parameters" => $product["parameters"],
        //         "guide" => $product["guide"],
        //         "ingredients" => $product["ingredients"],
        //         "announce_number" => $product["announce_number"],
        //         "categories_id" => $category->id,
        //         "brand_id" => $brand->id,
        //     ]);
        // }

        if ($product_id_exist) {
            $product_id->update([
                "parameters" => $product["parameters"]
            ]);
        }

        // foreach ($attributes as $attribute) {
        //     $product_exists = Product::where("id", $product["id"])->exists();
        //     if ($product_exists) {
        //         $attribute_created = Attribute::firstOrCreate([
        //             "label" => $attribute["label"],
        //             "code_name" => $attribute["code"],
        //             "display_type" => $attribute["display_type"],
        //             "product_id" => $product["id"],
        //         ]);

        //         $attribute_options = $attribute["options"];
        //         foreach ($attribute_options as $attribute_option) {
        //             $option = AttributeOption::create([
        //                 "value" => $attribute_option["value"],
        //                 "attribute_id" => $attribute_created["id"]
        //             ]);
        //             $attribute_products = $attribute_option["products"];
        //             foreach ($attribute_products as $attribute_product) {
        //                 $option_exist = Product::where("id", $attribute_product)->exists();
        //                 if ($option_exist) {
        //                     $option->Products()->attach($attribute_product);
        //                 }
        //             }
        //         }
        //     }


        // }
    }

    return response()->json(['success' => true, 'products_added' => count($products)]);
});
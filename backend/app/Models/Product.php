<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Str;

class Product extends Model
{
    protected $fillable = [
        "name",
        "description",
        "images",
        "guide",
        "ingredients",
        "parameters",
        "quantity",
        "remain",
        "categories_id",
        "brand_id",
        "price",
        "url",
        "sales",
        "english_name",
        "id",
        "thumbnail",
        "search_count"
    ];

    protected $casts = [
        "parameters" => "array",
        "images" => "array"
    ];

    protected static function booted()
    {
        static::creating(function ($product) {
            if (is_null($product->remain)) {
                $product->remain = $product->quantity ?? 0;
            }
            $product->url = Str::slug($product->name);
            $currentImages = $product->images ?? []; // Đảm bảo là mảng

            // Chỉ thêm thumbnail vào mảng nếu nó chưa tồn tại trong mảng đó
            if ($product->thumbnail && !in_array($product->thumbnail, $currentImages)) {
                array_unshift($currentImages, $product->thumbnail); // Đưa lên đầu mảng
            }

            $product->images = $currentImages;
        });
        static::updating(function ($product) {
            $product->url = Str::slug($product->name);
        });
    }
    public function getRouteKeyName()
    {
        return 'url'; // hoặc 'code', 'sku', 'name' tùy bạn
    }
    public function categories()
    {
        return $this->belongsTo(Categories::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class, "brand_id");
    }

    public function hotDealDates()
    {
        return $this->belongsToMany(HotDealDate::class)->withPivot("sales");
    }

    public function flashDeal()
    {
        return $this->belongsToMany(FlashDeal::class);
    }

    public function carts()
    {
        return $this->belongsToMany(Cart::class)->withPivot("quantity");
    }

    public function DiscountCode()
    {
        return $this->belongsToMany(DiscountCode::class);
    }

    public function Orders()
    {
        return $this->belongsToMany(Order::class)->withPivot("quantity");
    }

    public function Reviews()
    {
        return $this->hasMany(Review::class);
    }
}

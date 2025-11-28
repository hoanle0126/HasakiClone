<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $fillable = [
        "name",
        "description",
        "thumbnail",
        "banner",
        "logo",
        "url"
    ];

    public static function booted()
    {
        static::creating(function ($brand) {
            $brand->url = \Str::slug($brand->name);
        });
        static::updating(function ($brand) {
            $brand->url = \Str::slug($brand->name);
        });
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
    public function getRouteKeyName()
    {
        return 'url'; // hoặc 'code', 'sku', 'name' tùy bạn
    }

    public function DiscountCode()
    {
        return $this->belongsToMany(DiscountCode::class);
    }
}

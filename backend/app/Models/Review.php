<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        "id",
        "rating",
        "product_id",
        "user_id",
        "rating",
        "description",
        "images",
        "reply"
    ];

    protected $casts = [
        "images" => "array"
    ];

    public function Products()
    {
        return $this->belongsTo(Product::class);
    }
}

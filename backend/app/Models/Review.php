<?php

namespace App\Models;

use App\Traits\SyncsToSlaveDatabase;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use SyncsToSlaveDatabase;
    protected $fillable = [
        "id",
        "rating",
        "product_id",
        "user_id",
        "rating",
        "description",
        "images",
        "reply",
        "name"
    ];

    protected $casts = [
        "images" => "array"
    ];

    public function Products()
    {
        return $this->belongsTo(Product::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    protected $fillable = [
        "name",
        "discount",
    ];

    public function Products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function Brands()
    {
        return $this->belongsToMany(Brand::class);
    }
}

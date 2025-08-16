<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    protected $fillable = [
        "label",
        "display_type",
        "code_name",
        "product_id"
    ];

    public function Options(){
        return $this->hasMany(AttributeOption::class);
    }

    public function Product(){
        return $this->belongsTo(Product::class);
    }
}

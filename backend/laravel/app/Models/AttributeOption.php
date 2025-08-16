<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttributeOption extends Model
{
    protected $fillable = [
        "value",
        "attribute_id"
    ];

    public function Attribute(){
        return $this->belongsTo(Attribute::class);
    }

    public function Products(){
        return $this->belongsToMany(Product::class);
    }
}

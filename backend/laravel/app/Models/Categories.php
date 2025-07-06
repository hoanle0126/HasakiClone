<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Str;

class Categories extends Model
{
    protected $fillable = [
        "name",
        "thumbnail",
        "type",
        "parent_id",
        "url"
    ];

    public function getAncestorsAttribute()
    {
        $ancestors = [];
        $ancestors[] = [
            "id" => $this->id,
            "name" => $this->name,
            "url" => $this->url
        ];
        $category = $this;
        while ($category->parent) {
            $category = $category->parent;
            $ancestors[] = [
                "id" => $category->id,
                "name" => $category->name,
                "url" => $category->url
            ];
        }

        return array_reverse($ancestors);
    }

    public function getProductChildrenAttribute()
    {
        $allChildren = collect();
        foreach ($this->children as $child) {
            $allChildren = $allChildren->merge($child->products);
            $allChildren->merge($child->product_children);
        }
        return $allChildren;
    }

    public function parent()
    {
        return $this->belongsTo(Categories::class, "parent_id");
    }

    public function children()
    {
        return $this->hasMany(Categories::class, "parent_id");
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}

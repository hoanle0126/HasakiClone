<?php

namespace App\Http\Resources;

use App\Models\Brand;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $this->withoutWrapping();
        return [
            'id' => $this->id,
            "reviews" => $this->reviews,
            'name' => $this->name,
            'url' => $this->url,
            'thumbnail' => $this->images[0],
            "price" => $this->price,
            "total_price" => $this->price - $this->price * $this->sales / 100,
            "quantity" => $this->quantity,
            "quantity_cart" => $this->pivot ? $this->pivot->quantity : 0,
            "remain" => $this->remain,
            "sales" => $this->sales,
            "guide" => $this->guide,
            "images" => $this->images,
            "categories_id" => $this->categories_id,
            "english_name" => $this->english_name,
            "brand" => [
                "name" => $this->brand['name'],
                "logo" => $this->brand['logo'],
            ],
            "brand_id" => $this->brand_id,
            "created_at" => $this->created_at,
            "search_count" => $this->search_count,
        ];
    }
}

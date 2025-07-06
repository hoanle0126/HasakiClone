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
            'name' => $this->name,
            'url' => $this->url,
            'categories' => $this->categories['ancestors'],
            'recommends' => $this->categories['products']->reject(fn($product) => $product->id === $this->id)->take(5)->values(),
            'thumbnail' => $this->thumbnail,
            "parameters" => $this->parameters ? $this->parameters : ["test" => ""],
            "price" => $this->price,
            "quantity" => $this->quantity,
            "remain" => $this->remain,
            "description" => $this->description,
            "sales" => $this->sales,
            "ingredients" => $this->ingredients,
            "guide" => $this->guide,
            "images" => $this->images,
            "categories_id" => $this->categories_id,
            "brand" => [
                "name" => $this->brand['name'],
                "logo" => $this->brand['logo'],
                "products" => $this->brand['products']->reject(fn($product) => $product->id === $this->id)->take(5)->values(),
            ],
            "brand_id" => $this->brand_id,
            "created_at" => $this->created_at,
            "search_count" => $this->search_count
        ];
    }
}

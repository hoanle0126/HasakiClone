<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            "id" => $this->id,
            "user" => $this->user ? [
                "id" => $this->user->id,
                "first_name" => $this->user->first_name,
                "last_name" => $this->user->last_name,
                "email" => $this->user->email,
            ] : null,
            "products" => $this->products->map(function ($product) {
                return [
                    "id" => $product->id,
                    "name" => $product->name,
                    "thumbnail" => $product->thumbnail,
                    "price" => $product->price,
                    "quantity" => $product->pivot->quantity ?? 0,
                ];
            }),
            "payments" => $this->payments ? array_merge($this->payments, [
                "status" => $this->payments["status"] ?? "pending"
            ]) : ["status" => "pending", "name" => "N/A", "type" => "offline"],
            "note" => $this->note,
            "discount_code" => $this->discountCode ? [
                "id" => $this->discountCode->id,
                "code" => $this->discountCode->code,
                "discount" => $this->discountCode->discount,
            ] : null,
            "address" => $this->address ? [
                "id" => $this->address->id,
                "name" => $this->address->name,
                "phone" => $this->address->phone,
                "street_address" => $this->address->street_address,
                "ward" => $this->address->ward,
                "district" => $this->address->district,
                "province" => $this->address->province,
            ] : null,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}

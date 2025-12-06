<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
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
            "reply" => $this->reply,
            "first_name" => User::find($this->user_id),
            "updated_at" => $this->updated_at,
            "description" => $this->description,
            "rating" => $this->rating
        ];
    }
}

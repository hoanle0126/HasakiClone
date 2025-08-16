<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttributeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    protected $parent;

    public function __construct($resource, $parent)
    {
        parent::__construct($resource);
        $this->parent = $parent;
    }

    public function toArray(Request $request): array
    {
        $list_options = collect($this->parent->Attributes)->filter(function ($item) {
            return $item["label"] != $this->label;
        })->map(function ($item) {
            return $item["label"];
        })->values();

        return [
            "id" => $this->id,
            "label" => $this->label,
            "display_type" => $this->display_type,
            "options" => collect($this->options)->map(function ($option) use ($list_options) {
                return [
                    "value" => $option->value,
                    "attribute" => $option->attribute["label"],
                    "products" => collect($option->products)
                        // ->filter(function ($item) use ($list_options) {
                        //     return collect($list_options)->every(function ($option_label) use ($item) {
                        //         return $item->parameters[$option_label] == $this->parent->parameters[$option_label];
                        //     });
                        // })
                        // ->map(function ($item) use ($list_options) {
                        //     return [
                        //         "id" => $item->id,
                        //         "name" => $item->name,
                        //         "url" => $item->url,
                        //         "thumbnail" => $item->thumbnail,
                        //         "parameters" => $item->parameters,
                        //         "options" => $list_options
                        //     ];
                        // })
                        // ->first()
                ];
            })
        ];
    }
}

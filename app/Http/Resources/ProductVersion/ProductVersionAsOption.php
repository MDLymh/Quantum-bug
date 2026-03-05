<?php

namespace App\Http\Resources\ProductVersion;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductVersionAsOption extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "value"=>$this->id,
            "name"=>$this->version
        ];
    }
}

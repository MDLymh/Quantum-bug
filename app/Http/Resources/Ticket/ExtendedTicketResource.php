<?php

namespace App\Http\Resources\Ticket;

use App\Http\Resources\SimplifiedTicketCommentResource;
use App\Http\Resources\TicketEvidenceLinkResource;
use App\Models\Product;
use App\Models\TicketCategory;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExtendedTicketResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "category" =>TicketCategory::find($this->category_id)->name,
            "created_at"=> Carbon::parse($this->created_at)->isoFormat('D/MM/YYYY HH:mm'),
            "description"=>$this->description,
            "ticket"=>$this->id,
            "product"=>Product::find($this->product_id)->name,
            "status"=>$this->status,
            "title"=>$this->title,
            "updated_at"=>Carbon::parse($this->updated_at)->isoFormat('D/MM/YYYY HH:mm'),
            "images"=> TicketEvidenceLinkResource::collection($this->evidence)->resolve(),
            "comments"=>SimplifiedTicketCommentResource::collection($this->comments)->resolve()
        ];
    }
}

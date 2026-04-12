<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuoteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'customer_name' => $this->customer_name,
            'status' => $this->status,
            'subtotal' => $this->subtotal,
            'tax' => $this->tax,
            'total' => $this->total,
            'items' => QuoteItemResource::collection($this->whenLoaded('items')),
            'documents' => DocumentResource::collection($this->whenLoaded('documents')),
            'versions' => QuoteVersionResource::collection($this->whenLoaded('versions')),
            'created_at' => $this->created_at,
        ];
    }
}

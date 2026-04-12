<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuoteVersionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'version_number' => $this->version_number,
            'title' => $this->title,
            'customer_name' => $this->customer_name,
            'subtotal' => $this->subtotal,
            'tax' => $this->tax,
            'total' => $this->total,
            'items' => QuoteVersionItemResource::collection($this->whenLoaded('items')),
            'documents' => DocumentVersionResource::collection(
                $this->whenLoaded('documentVersions')
            ),
            'published_at' => $this->published_at,
        ];
    }
}

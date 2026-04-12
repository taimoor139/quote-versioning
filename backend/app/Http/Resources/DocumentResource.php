<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
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
            'name' => $this->name,
            'active_version' => new DocumentVersionResource(
                $this->whenLoaded('activeVersion')
            ),
            'versions' => DocumentVersionResource::collection(
                $this->whenLoaded('versions')
            ),
        ];
    }
}

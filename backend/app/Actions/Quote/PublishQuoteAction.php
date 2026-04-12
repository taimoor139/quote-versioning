<?php

namespace App\Actions\Quote;

use App\Models\Quote;
use App\Models\QuoteVersion;
use App\Models\QuoteVersionLineItem;
use Illuminate\Support\Facades\DB;

class PublishQuoteAction
{
    public function execute(Quote $quote): QuoteVersion
    {
        return DB::transaction(function () use ($quote) {

            $quote = $quote->load(['items', 'documents.versions']);
            $nextVersion = $quote->versions()->max('version_number') + 1;
            $version = QuoteVersion::create([
                'quote_id' => $quote->id,
                'version_number' => $nextVersion,
                'title' => $quote->title,
                'customer_name' => $quote->customer_name,
                'subtotal' => $quote->subtotal,
                'tax' => $quote->tax,
                'total' => $quote->total,
                'published_at' => now(),
            ]);

            foreach ($quote->items as $item) {
                $version->items()->create([
                    'description' => $item->description,
                    'quantity' => $item->quantity,
                    'unit_price' => $item->unit_price,
                ]);
            }
            $documentVersionIds = [];

            foreach ($quote->documents as $document) {
                $active = $document->versions
                    ->where('is_active', true)
                    ->first();

                if ($active) {
                    $documentVersionIds[] = $active->id;
                }
            }

            $version->documentVersions()->attach($documentVersionIds);
            $quote->update(['status' => 'published']);

            return $version;
        });
    }
}

<?php

namespace App\Services;

use App\Models\Quote;
use App\Models\QuoteLineItem;
use Illuminate\Support\Facades\DB;

class QuoteService
{
    const TAX_RATE = 0.15;

    public function create(array $data): Quote
    {
        return Quote::create([
            'title' => $data['title'],
            'customer_name' => $data['customer_name'],
        ]);
    }

    public function addItem(Quote $quote, array $data): QuoteLineItem
    {
        return DB::transaction(function () use ($quote, $data) {

            $item = $quote->items()->create($data);

            $this->recalculateTotals($quote->fresh());

            return $item;
        });
    }

    public function updateItem(QuoteLineItem $item, array $data): QuoteLineItem
    {
        return DB::transaction(function () use ($item, $data) {

            $item->update($data);

            $this->recalculateTotals($item->quote->fresh());

            return $item;
        });
    }

    public function deleteItem(QuoteLineItem $item): void
    {
        DB::transaction(function () use ($item) {

            $quote = $item->quote;

            $item->delete();

            $this->recalculateTotals($quote->fresh());
        });
    }

    public function recalculateTotals(Quote $quote): void
    {
        $subtotal = $quote->items()
            ->selectRaw('SUM(quantity * unit_price) as subtotal')
            ->value('subtotal') ?? 0;

        $tax = $subtotal * self::TAX_RATE;
        $total = $subtotal + $tax;

        $quote->update([
            'subtotal' => $subtotal,
            'tax' => $tax,
            'total' => $total,
            'version' => $quote->version + 1,
        ]);
    }
}

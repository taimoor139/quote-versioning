<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuoteItemRequest;
use App\Http\Requests\UpdateQuoteItemRequest;
use App\Models\Quote;
use App\Models\QuoteLineItem;
use App\Services\QuoteService;
use App\Http\Resources\QuoteItemResource;
use Illuminate\Http\Request;

class QuoteItemController extends Controller
{
    protected $quoteService;

    public function __construct(QuoteService $quoteService)
    {
        $this->quoteService = $quoteService;
    }

    public function store(StoreQuoteItemRequest $request, Quote $quote)
    {
        $item = $this->quoteService->addItem($quote, $request->validated());
        return ApiResponse::success(new QuoteItemResource($item), 'Item added successfully', 201);
    }

    public function update(UpdateQuoteItemRequest $request, QuoteLineItem $item)
    {
        $item = $this->quoteService->updateItem($item, $request->validated());
        return ApiResponse::success(new QuoteItemResource($item), 'Item updated successfully');
    }

    public function destroy(QuoteLineItem $item)
    {
        $this->quoteService->deleteItem($item);
        return ApiResponse::success(null, 'Item deleted successfully');
    }
}

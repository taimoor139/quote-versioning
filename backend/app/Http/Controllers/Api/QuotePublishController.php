<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Quote;
use App\Actions\Quote\PublishQuoteAction;
use App\Helpers\ApiResponse;
use App\Http\Requests\PublishQuoteRequest;
use App\Http\Resources\QuoteVersionResource;

class QuotePublishController extends Controller
{
    protected $publishAction;

    public function __construct(PublishQuoteAction $publishAction)
    {
        $this->publishAction = $publishAction;
    }

    public function store(PublishQuoteRequest $request, Quote $quote)
    {
        if ($quote->status === 'published') {
            return response()->json([
                'message' => 'Quote already published'
            ], 400);
        }

        $version = $this->publishAction->execute($quote);
        $version->load(['items', 'documentVersions']);

        return ApiResponse::success(new QuoteVersionResource($version), 'Quote published successfully');
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuoteRequest;
use App\Http\Resources\QuoteResource;
use App\Models\Quote;
use App\Services\QuoteService;
use Illuminate\Http\Request;

class QuoteController extends Controller
{
    protected $quoteService;

    public function __construct(QuoteService $quoteService)
    {
        $this->quoteService = $quoteService;
    }

    public function index()
    {
        $quotes = Quote::latest()->paginate(10);

        return ApiResponse::success(
            QuoteResource::collection($quotes),
            'Quotes retrieved successfully',
            200,
            [
                'pagination' => [
                    'current_page' => $quotes->currentPage(),
                    'last_page' => $quotes->lastPage(),
                    'per_page' => $quotes->perPage(),
                    'total' => $quotes->total(),
                ]
            ]
        );
    }

    public function store(StoreQuoteRequest $request)
    {
        $quote = $this->quoteService->create($request->validated());
        return ApiResponse::success(new QuoteResource($quote), 'Quote created successfully', 201);
    }

    public function show(Quote $quote)
    {
        $quote->load([
            'items',
            'versions.items',
            'versions.documentVersions',
            'documents.activeVersion',
            'documents.versions'
        ]);

        return ApiResponse::success(new QuoteResource($quote), 'Quote retrieved successfully');
    }
}

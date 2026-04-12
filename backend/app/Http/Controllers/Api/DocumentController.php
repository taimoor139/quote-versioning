<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDocumentRequest;
use App\Models\Document;
use App\Services\DocumentService;
use App\Http\Resources\DocumentResource;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    protected $documentService;

    public function __construct(DocumentService $documentService)
    {
        $this->documentService = $documentService;
    }

    public function store(StoreDocumentRequest $request)
    {
        $document = $this->documentService->createDocument($request->quote_id, $request->name);
        return ApiResponse::success(new DocumentResource($document), 'Document created successfully', 201);
    }

    public function show(Document $document)
    {
        $document->load([
            'versions',
            'activeVersion'
        ]);

        return ApiResponse::success(new DocumentResource($document), 'Document retrieved successfully');
    }
}

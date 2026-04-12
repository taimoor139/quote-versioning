<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDocumentVersionRequest;
use App\Models\Document;
use App\Services\DocumentService;
use App\Http\Resources\DocumentVersionResource;
use Illuminate\Http\Request;

class DocumentVersionController extends Controller
{
    protected $documentService;

    public function __construct(DocumentService $documentService)
    {
        $this->documentService = $documentService;
    }

    public function store(StoreDocumentVersionRequest $request, Document $document)
    {
        $version = $this->documentService->uploadNewVersion($document, $request->file('file'));
        return ApiResponse::success(new DocumentVersionResource($version), 'Document version uploaded successfully', 201);
    }
}

<?php

namespace App\Services;

use App\Models\Document;
use App\Models\DocumentVersion;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class DocumentService
{
    public function createDocument(int $quoteId, string $name): Document
    {
        return Document::create([
            'quote_id' => $quoteId,
            'name' => $name,
        ]);
    }

    public function uploadNewVersion(Document $document, UploadedFile $file): DocumentVersion
    {
        return DB::transaction(function () use ($document, $file) {

            DocumentVersion::where('document_id', $document->id)
                ->update(['is_active' => false]);

            $nextVersion = $document->versions()->max('version_number') + 1;
            $path = $file->store('documents');
            return DocumentVersion::create([
                'document_id' => $document->id,
                'file_path' => $path,
                'version_number' => $nextVersion,
                'is_active' => true,
            ]);
        });
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuoteVersionDocument extends Model
{
    protected $table = 'quote_version_documents';

    public $timestamps = false;

    protected $fillable = [
        'quote_version_id',
        'document_version_id',
    ];
}

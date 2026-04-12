<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuoteVersion extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'quote_id',
        'version_number',
        'title',
        'customer_name',
        'subtotal',
        'tax',
        'total',
        'published_at',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'tax' => 'decimal:2',
        'total' => 'decimal:2',
        'published_at' => 'datetime',
    ];

    public function quote()
    {
        return $this->belongsTo(Quote::class);
    }

    public function items()
    {
        return $this->hasMany(QuoteVersionLineItem::class);
    }

    public function documentVersions()
    {
        return $this->belongsToMany(DocumentVersion::class, 'quote_version_documents');
    }
}

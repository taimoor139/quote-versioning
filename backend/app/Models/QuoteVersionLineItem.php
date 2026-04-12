<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuoteVersionLineItem extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'quote_version_id',
        'description',
        'quantity',
        'unit_price',
    ];

    protected $casts = [
        'unit_price' => 'decimal:2',
    ];

    public function quoteVersion()
    {
        return $this->belongsTo(QuoteVersion::class);
    }
}

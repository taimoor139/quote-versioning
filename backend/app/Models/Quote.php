<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    protected $fillable = [
        'title',
        'customer_name',
        'status',
        'subtotal',
        'tax',
        'total',
        'version',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'tax' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    public function items()
    {
        return $this->hasMany(QuoteLineItem::class);
    }

    public function versions()
    {
        return $this->hasMany(QuoteVersion::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}

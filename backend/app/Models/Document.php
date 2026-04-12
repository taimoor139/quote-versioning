<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'quote_id',
        'name',
    ];

    public function quote()
    {
        return $this->belongsTo(Quote::class);
    }

    public function versions()
    {
        return $this->hasMany(DocumentVersion::class);
    }

    public function activeVersion()
    {
        return $this->hasOne(DocumentVersion::class)->where('is_active', true);
    }
}

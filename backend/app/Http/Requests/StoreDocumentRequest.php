<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDocumentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'quote_id' => 'required|exists:quotes,id',
            'name' => 'required|string|max:255',
        ];
    }
}

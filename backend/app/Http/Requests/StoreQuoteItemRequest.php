<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuoteItemRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'description' => 'required|string|max:500',
            'quantity' => 'required|integer|min:1',
            'unit_price' => 'required|numeric|min:0',
        ];
    }
}

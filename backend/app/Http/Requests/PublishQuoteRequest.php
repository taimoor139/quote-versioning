<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PublishQuoteRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [];
    }
}

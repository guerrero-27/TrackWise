<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreIncomeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01|max:9999999.99',
            'income_date' => 'required|date',
            'source' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
        ];
    }
}

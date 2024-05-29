<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;


class StoreLotRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'lotName' => 'required',
            'lotDesc' => 'required',
            'photos' => 'required|array',
            'photos.*' => 'required|file',
            'selectedCategories' => 'required|array',
            'selectedCategories.*' => 'required|numeric',
            'startBid' => 'required|numeric',
            'tradeEndTime'=> 'required|date'
        ];
    }

}

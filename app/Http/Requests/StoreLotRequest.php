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
            'photos' => 'required|file',
            //'photos.*' => 'required|file',
            'selectedCategories' => 'required|array',
            'selectedCategories.*' => 'required|numeric',
            'startBid' => 'required|numeric',
            'tradeEndTime'=> 'required|date'
        ];
    }

    public function messages()
    {
        return [
            'lotName.required' => 'The lot name is mandatory.',
            'lotDesc.required' => 'The lot description is mandatory.',
            'photos.required' => 'You must upload at least one photo.',
            //'photos.array' => 'You must upload an array of photos',
            'selectedCategories.required'=> 'At least one category must be chosen',
            'selectedCategories.array'=> 'An array of categories must be passed',
            'startBid.required' => 'The starting bid is required.',
            'tradeEndTime.required' => 'You must specify the end time for the trade.',
        ];
    }
}

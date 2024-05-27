<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateLotRequest extends FormRequest
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
        //todo check if at least one photo exist
        return [
            'lotName' => 'required|string|max:70',
            'lotDesc' => 'required|string',
            'deletedStoredPhotos' => 'array',
            'deletedStoredPhotos.*' => 'numeric',
            'photos' => 'array',
            'photos.*' => 'file'
        ];
    }
}

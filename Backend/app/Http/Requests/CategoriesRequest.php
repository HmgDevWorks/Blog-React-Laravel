<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoriesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'=>['required', 'string', 'max:100'],
            'description'=>['required', 'string', 'max:100']
        ];
    }

    public function messages():array{
        return [
            'name.required'=> 'El nombre es un campo necesario.',
            'name.string'=> 'El nombre debe ser una cadena de carácteres.',
            'name.max'=> 'El nombre no puede superar los 100 carácteres.',
        ];
    }
    
}

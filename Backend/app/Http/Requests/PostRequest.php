<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
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
            'title'=>['required','string','max:255'],
            'content'=>['required','string'],
            'id_categories'=>['required','numeric','min:1'],
            'id_user'=>['required','numeric','min:1']
        ];
    }

    public function messages():array{
        return [
            'title.required'=> 'El nombre de usuario es un campo necesario.',
            'title.string'=> 'El nombre de usuario debe ser una cadena de carácteres.',
            'title.max'=> 'El nombre de usuario no puede superar los 100 carácteres.',

            'content.required'=> 'El contenido es un campo necesario.',
            'content.string'=> 'El contenido debe ser una cadena de carácteres.',

            'id_categories.required'=> 'El id de categoría es un campo necesario.',
            'id_categories.numeric'=> 'El id de categoría debe ser un número.',
            'id_categories.min'=> 'El id de categoría debe ser 1.',

            'id_user.required'=> 'El id de categoría es un campo necesario.',
            'id_user.numeric'=> 'El id de categoría debe ser un número.',
            'id_user.min'=> 'El id de categoría debe ser 1.',

        ];
    }
}

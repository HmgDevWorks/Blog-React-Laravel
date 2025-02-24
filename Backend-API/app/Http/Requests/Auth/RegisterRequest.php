<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Validation\Rules;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name_user' => ['required', 'string', 'max:255'],
            'email_user' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password_user' => ['required', Rules\Password::defaults()],
        ];
    }
}

<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class UpdateUserRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name_user'=>['required','string','max:100'],
            'email_user' => ['required', 'string', 'email', 'unique:users'],
            'password_user' => ['required', 'string','min:6'],
            'password_new'=>['required', 'string','min:6']
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        if (! Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'email' => trans('auth.failed'),
            ]);
        }

        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->input('email')).'|'.$this->ip());
    }

    public function messages():array{
        return [
            'name_user.required'=> 'El nombre de usuario es un campo necesario.',
            'name_user.string'=> 'El nombre de usuario debe ser una cadena de carácteres.',
            'name_user.max'=> 'El nombre de usuario no puede superar los 100 carácteres.',

            'password_user.required'=> 'La contraseña es un campo necesario.',
            'password_user.string'=> 'La contraseña debe ser una cadena de carácteres.',
            'password_user.min'=> 'La contraseña debe tener mínimo 6 carácteres',
            'password_user.confirmed'=> 'Las contraseñas no coinciden.',

            'email_user.required'=> 'El correo electrónico es un campo necesario.',
            'email_user.string'=> 'El correo electrónico debe ser una cadena de carácteres.',
            'email_user.email'=> 'No has escrito una dirección de correo electrónico.',
            'email_user.unique'=> 'Esta dirección de correo electrónico ya está siendo utilizada',

            'terminos.required'=> 'No has aceptado los términos y condiciones'
        ];
    }
}
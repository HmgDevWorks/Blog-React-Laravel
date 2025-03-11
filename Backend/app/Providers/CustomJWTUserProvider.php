<?php
namespace App\Providers;

use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Support\Facades\Hash;

class CustomJWTUserProvider extends EloquentUserProvider
{
    /**
     * Override the validateCredentials method to use custom password field.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @param  array  $credentials
     * @return bool
     */
    public function validateCredentials($user, array $credentials)
    {
        return Hash::check($credentials['password_user'], $user->getAuthPassword()); // Usamos 'password_user' en lugar de 'password'
    }
}
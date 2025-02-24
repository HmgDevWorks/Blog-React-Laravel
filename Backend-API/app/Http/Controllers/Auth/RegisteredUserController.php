<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): Response|JsonResponse
    {
        return response()->json(status:200);
        
        $request->validate([
            'name_user' => ['required', 'string', 'max:255'],
            'email_user' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password_user' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name_user' => $request->name_user,
            'email_user' => $request->email_user,
            'password_user' => $request->password_user,
            'name_lastName' => $request->name_lastName ?? null,
            'bio' => $request->bio ?? null,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return response()->noContent();
    }
}

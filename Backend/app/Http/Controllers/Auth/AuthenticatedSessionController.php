<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthenticatedSessionController extends Controller
{
    public function store(LoginRequest $request)
    {
        $credentials = [
            'email_user' => $request->input('email'),
            'password' => $request->input('password'),
        ];

        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => 'Las credenciales no corresponden'], 401);
        }

        $user = Auth::user();
        if ($user->hasRole('banned')) { //verifica si el usuario esta banned, si esta banned no puede entrar y no genera el token
            return response()->json(['error' => 'Este usuario ha sido suspendido.'], 403);
        }

        $token = JWTAuth::fromUser($user);
        return response()->json([
            'authToken' => $token,
            // 'user' => [
            //     '_id' => $user->id,
            //     'name' => $user->name_user,
            //     'role' => $user->roles->pluck('name'),
            // ]
        ]);
    }
}
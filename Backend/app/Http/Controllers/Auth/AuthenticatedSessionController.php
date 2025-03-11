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

        // $credentials = $request->only('email_user', 'password'); // No hagas Hash::make() aquí

        // if (!$token = Auth::attempt($credentials)) {
        //     return response()->json(['error' => 'Las credenciales no corresponden'], 401);
        // }

        // // Si la autenticación es correcta, devolvemos el token
        // return response()->json(['token' => $token]);

        $credentials = [
            'email_user' => $request->input('email'),
            'password' => $request->input('password'), // Deja la contraseña en texto plano
        ];

        if (Auth::attempt($credentials)) { //codigo de jwt que autentifica si el usuario es correcto comparandolo con la bbdd
            $user = Auth::user();
            $token = JWTAuth::fromUser($user);
            return response()->json(['token' => $token]);
        } else {
            return response()->json(['error' => 'Las credenciales no corresponden',$credentials], 401);
        }

        // Si las credenciales son incorrectas
    }

    // /**
    //  * Destroy an authenticated session.
    //  */
    // public function destroy(Request $request): Response
    // {
    //     Auth::logout(); Esta comentado porque lo realizan desde el front

    //     return response()->noContent();
    // }

}
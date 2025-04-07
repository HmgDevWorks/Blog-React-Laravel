<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function verifyToken(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'message' => 'successMsg.successToken',
            'user' => [
                'id' => $user->id,
                'role' => $user->roles()->first()->name, // Obtiene el primer rol asignado
                'email_user' => $user->email_user
            ]
        ]);
    }

    public function refreshToken()
    {
        return response()->json([
            'token' => Auth::refresh(),
            'message' => 'successMsg.successTokenUpdate'
        ]);
    }
}

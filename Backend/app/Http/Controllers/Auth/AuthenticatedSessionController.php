
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;
use Laravel\Sanctum\HasApiTokens;

class AuthenticatedSessionController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'email_user' => 'required|email',
            'password_user' => 'required',
        ]);

        // Buscar el usuario por email
        $user = \App\Models\User::where('email_user', $request->email_user)->first();

        // Verificar si el usuario existe y la contraseña es válida
        if (!$user || !\Hash::check($request->password_user, $user->password_user)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Crear un token de acceso
        $token = $user->createToken($user->email_user . '_Token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token, // Devolver el token
        ], 200);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        // Invalidar el token
        Auth::user()->tokens->each(function ($token) {
            $token->delete();
        });

        return response()->json(['message' => 'Sesión cerrada correctamente.']);
    }
}

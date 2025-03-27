<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Mail\CustomEmailVerification;
use Illuminate\Support\Facades\Log;


class EmailVerificationController extends Controller
{
    public function resend(Request $request)
    {
        $user = User::where('email_user', $request->email_user)->first();

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'El email ya ha sido verificado'], 200);
        }

        Mail::to($user->email_user)->send(new CustomEmailVerification($user));

        return response()->json(['message' => 'Correo de verificación reenviado']);
    }

    public function verify($id, $hash)
    {
        $user = User::findOrFail($id);
        $generatedHash = sha1($user->getEmailForVerification());
        Log::info("Hash generado: $generatedHash");
        Log::info("Hash recibido en la URL: $hash");

         if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
             return redirect('http://localhost:5173/verify-failed'); // Redirige si el hash no es válido
         }

         if ($user->hasVerifiedEmail()) {
             return redirect('http://localhost:5173/login'); // Si ya estaba verificado, redirige al login
         }

         $user->markEmailAsVerified();
    }
}

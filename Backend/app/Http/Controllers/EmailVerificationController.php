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
        // $user = User::findOrFail($id);

        // if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
        //     return response()->json(['message' => 'Enlace de verificación no válido'], 403);
        // }

        // if ($user->hasVerifiedEmail()) {
        //     return response()->json(['message' => 'El email ya ha sido verificado'], 200);
        // }

        // $user->markEmailAsVerified();

        // return response()->json(['message' => 'Cuenta verificada con éxito']);

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

         //return redirect()->to('http://localhost:5173');; // Redirige al login con un query param

        // $user = User::findOrFail($id);

        // if (!$user->hasVerifiedEmail()) {
        //     $user->markEmailAsVerified();
        // }

        // // Redirige al usuario a la página principal (o cualquier otra página que prefieras)
        // return redirect('http://localhost:5173');
    }
}

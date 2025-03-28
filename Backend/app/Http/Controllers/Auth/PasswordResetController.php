<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Notifications\PasswordResetNotification;
use Illuminate\Support\Facades\Mail; 
use App\Mail\PasswordResetMail;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon; 

class PasswordResetController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate([ // valida la info que le llega
            'email_user' => 'required|email',  
        ]);

        $user = User::where('email_user', $request->email_user)->first();

        DB::table('password_reset_tokens')
        ->where('email_user', $user->email_user)
        ->where('created_at', '<', Carbon::now()->subMinutes(5)) // si el token es más antiguo de 1 hora, lo eliminamos
        ->delete();

        if (DB::table('password_reset_tokens')->where('email_user', $user->email_user)->exists()) { //si el user ya tenia un token pedido para reestablecer contraseña se borra de la base de datos para que se pueda generar uno nuevo
            DB::table('password_reset_tokens')
                ->where('email_user', $user->email_user)
                ->delete();
        }

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $token = Str::random(60); // creamos el token nosotros mismos con una combi random

        DB::table('password_reset_tokens')->insert([ 
            'email_user' => $user->email_user,  // Usamos 'email_user' para hacer la inserción
            'token' => $token,
            'created_at' => now(),
        ]);

        //$user->notify(new PasswordResetNotification($token));
       // Mail::to($user->email_user)->send(new PasswordResetNotification($token)); 
       $url = url(env('FRONTEND_URL') . '/password/reset/' . $token . '?email=' . $user->email_user); //creamos la url a mano con los datos que queremos mandar para que los recoja el front

       Mail::to($user->email_user)->send(new PasswordResetMail($url,$user)); //funcion pa llamar al mail

        return response()->json(['message' => 'Correo de restablecimiento enviado']);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([ //campos que deberia de tener el request mas el password_confirmation
            'email_user' => 'required|email',
            'token' => 'required',
            'password' => 'required|min:6',  
        ]);

        $tokenRecord = DB::table('password_reset_tokens')->where('token', $request->token)->first(); //busca el token creado para compararlo despues con el del link

        if (!$tokenRecord || $tokenRecord->email_user != $request->email_user) {
            return response()->json(['message' => 'Token inválido o correo incorrecto'], 400);
        }

        $user = User::where('email_user', $request->email_user)->first();

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        if (Carbon::parse($tokenRecord->created_at)->addMinutes(5)->isPast()) { //comprueba si ha pasao 5 min en la duracion del tokkken
            return response()->json(['message' => 'El enlace ha caducado, vuelva a pedir otro'], 400);
        }

        $user->password_user = Hash::make($request->password); 
        $user->save();

        DB::table('password_reset_tokens')->where('token', $request->token)->delete(); //se borra el token una vez usado ya que no admite mas mails iguales 

        return response()->json(['message' => 'Contraseña restablecida correctamente']);
    }
}
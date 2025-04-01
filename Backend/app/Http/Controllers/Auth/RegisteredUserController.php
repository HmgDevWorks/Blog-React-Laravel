<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail; // Asegúrate de importar Mail
use App\Mail\CustomEmailVerification; // Asegúrate de importar tu clase de correo



class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */

public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name_user' => ['required', 'string', 'max:255'],
        'email_user' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
        'password_user' => ['required', 'confirmed', Rules\Password::min(6)], 
        'img_user' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $imgPath = 'avatars/default.png'; 

    if ($request->hasFile('img_user') && $request->file('img_user')->isValid()) {
        $image = $request->file('img_user');
        $imageName = time() . '.' . $image->extension(); // Genera un nombre único
        $image->move(public_path('avatars'), $imageName); // Guarda la imagen en public/avatars
        $imgPath = 'avatars/' . $imageName; // Ruta de la imagen en la base de datos
    }

    $user = User::create([
        'name_user' => $request->input('name_user'),
        'email_user' => $request->input('email_user'),
        'password_user' => Hash::make($request->input('password_user')),
        'img_user' => $imgPath, // Guardar ruta de la imagen en la base de datos
    ]);

    if ($user) {
        try {
            // Asignar el rol al usuario
            $user->assignRole('reader');
            Mail::to($user->email_user)->send(new CustomEmailVerification($user)); //envia mail para confirmar la cuenta
        } catch (\Exception $e) {
            return response()->json(["message" => "errorMsg.errorRole", 400]);
        }

        return response()->json([
            'message' => "infoMsg.infoCreateUser",
            'user' => $user
        ], 201);
    }

    return response()->json(['message' => 'errorMsg.errorCreateUser'], 500);
}
}
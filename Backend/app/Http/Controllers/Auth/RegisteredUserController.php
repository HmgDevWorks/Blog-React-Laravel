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
            'password_user' => ['required', 'confirmed', Rules\Password::min(6)], //ojo cuidao con eso que podria estar mal
            'img_user' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'], // Imagen opcional
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {

            $imgPath = 'avatars/default.png'; // Imagen por defecto
            if ($request->hasFile('img_user') && $request->file('img_user')->isValid()) {
                $image = $request->file('img_user');
                $imageName = time() . '.' . $image->extension(); // funcion time para generrar un nombre unico a traves del time
                $image->move(public_path('avatars'), $imageName); // Guardar en public/avatars
                $imgPath = 'avatars/' . $imageName; // Ruta para la BD
            }

            $user = User::create([
                'name_user' => $request->input('name_user'),
                'email_user' => $request->input('email_user'),
                'password_user' => Hash::make($request->input('password_user')),
                'img_user' => $imgPath, // Guardamos la ruta en la base de datos
            ]);
            if ($user) {
                try {
                    $user->assignRole('reader');

                } catch (\Exception $e) {
                    return response()->json(["mensaje" => "Error al asignar el role", 400]);
                }
                return response()->json($user, 201);
        }

       // $token = JWTAuth::fromUser($user);

        return response()->json(['message' => "Usuario creado correctamente",'user' => $user],201);
    }
}
}

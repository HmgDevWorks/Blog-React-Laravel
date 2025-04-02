<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Log;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next) //funcion para validar el token, es decir que el que recibimos de front es el mismo que usamos en back para que el usuario pueda hacer peticiones
    {
        try {

            $user = JWTAuth::parseToken()->authenticate(); //compara tokens para verificar al user 
            // Log::info('USUARIOOOO',$user)
            $request->merge(['user' => $user]); // Agrega el usuario a la petición CON ESTO SUPUESTAMENTE NO HARIA FALTA HACER AUTHUSER?AUTH()=>USER() EN LOS SERVICES/CONTROLADORES
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token inválido o expirado'], Response::HTTP_UNAUTHORIZED);
        }

        return $next($request);
    }
}

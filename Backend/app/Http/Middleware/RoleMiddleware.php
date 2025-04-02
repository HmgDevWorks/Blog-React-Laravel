<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): JsonResponse
    {
        // Obtener el usuario autenticado
        $user = auth()->user();

        // Si el usuario no está autenticado o no tiene los roles correctos, devolver el error
        if (!$user || !in_array($user->role, $roles)) {
            return response()->json(['error' => 'No tienes permisos para acceder'], 403);
        }

        // Si pasa la validación, continuar con la solicitud
        return $next($request);
    }
}
<?php

namespace App\Http;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Authenticate;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    protected $middleware = [
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ];

    protected $middlewareGroups = [
        'web' => [
            // Las rutas web van aquí
        ],

        'api' => [
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];

    protected $routeMiddleware = [
        'auth' => AuthenticatedSessionController::class, // Middleware de autenticación básica
        'jwt' => \App\Http\Middleware\JwtMiddleware::class,  // Tu middleware JWT
        'role' => \App\Http\Middleware\RoleMiddleware::class,          // Middleware de roles de Spatie
        //'permission' => PermissionMiddleware::class, // Middleware de permisos de Spatie, sale en rojo por que no esta creado
    ];
}
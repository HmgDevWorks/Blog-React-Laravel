<?php

namespace App\Providers;

use App\Services\CategoriesService;
use App\Services\PermissionService;
use App\Services\PostService;
use App\Services\RoleService;
use App\Services\UserService;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(PostService::class, function ($app) { // Con esta función se está registrando las funciones del PostService para el controller
            return new PostService();
        });        
        $this->app->bind(CategoriesService::class, function ($app) { // Con esta función se está registrando las funciones del PostService para el controller
            return new CategoriesService();
        });         
        $this->app->bind(PermissionService::class, function ($app) { // Con esta función se está registrando las funciones del PostService para el controller
            return new PermissionService();
        });         
        $this->app->bind(RoleService::class, function ($app) { // Con esta función se está registrando las funciones del PostService para el controller
            return new RoleService();
        });         
        $this->app->bind(UserService::class, function ($app) { // Con esta función se está registrando las funciones del PostService para el controller
            return new UserService();
        }); 
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });
    }
}

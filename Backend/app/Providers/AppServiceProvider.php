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
        $this->app->bind(PostService::class, function ($app) { 
            return new PostService();
        });        
        $this->app->bind(CategoriesService::class, function ($app) { 
            return new CategoriesService();
        });         
        $this->app->bind(PermissionService::class, function ($app) { 
            return new PermissionService();
        });         
        $this->app->bind(RoleService::class, function ($app) { 
            return new RoleService();
        });         
        $this->app->bind(UserService::class, function ($app) { 
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

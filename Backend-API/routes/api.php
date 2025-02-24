<?php

use App\Http\Controllers\Api\Auth\AuthUserController;
use App\Http\Controllers\Api\CategoriesController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])
    ->name('api.')->group(function () {
        Route::controller(AuthUserController::class)
            ->group(function () {
                Route::prefix('user')->name('user.')->group(function () {
                    Route::post('register', 'store')->name('register');
                    Route::post('login', 'login')->name('login');
                });
            });
        Route::controller(ProfileController::class)->group(function () {
            Route::prefix('users')->name('users.')->group(function () {
                Route::get('', 'index'); //muestra todos los usuarios
                Route::post('store',  'store')->name('store');
                Route::get('show/{user}', 'show')->name('show'); //muestra el usuario por el id
                Route::put('update/{user}', 'update')->name('update');
                Route::put('changeRole/{user}', 'changeRole');
                Route::delete('destroy/{user}', 'destroy');
            });
        });
        Route::controller(CategoriesController::class)->group(function () {
            Route::prefix('categories')->name('categories.')->group(function () {
                Route::get('', 'index');
                Route::post('store',  'store')->name('store');
                Route::get('show/{categories}', 'show')->name('show');
                Route::put('update/{categories}', 'update')->name('update');
                Route::delete('destroy/{categories}', 'destroy');
            });
        });
        Route::controller(RoleController::class)->group(function () {
            Route::prefix('role')->name('role.')->group(function () {
                Route::get('', 'index');
                Route::post('store',  'store')->name('store');
                Route::get('show/{role}', 'show')->name('show');
                Route::put('update/{role}', 'update')->name('update');
                Route::delete('destroy/{role}', 'destroy');
            });
        });
        Route::controller(PostController::class)->group(function () {
            Route::prefix('posts')->name('posts.')->group(function () {
                Route::get('', 'index'); // enseña los 10 últimos
                Route::get('show', 'show'); // Enseña todos los posts
                Route::get('show/{post}', 'showOne'); // Enseña un post por un id
                Route::get('user/{id}', 'postUser');    //Enseña los post a traves del id del usuario
                Route::post('store',  'store')->name('store');
                Route::put('update/{post}', 'update')->name('update');
                Route::delete('destroy/{post}', 'destroy');
            });
        });

    });
    
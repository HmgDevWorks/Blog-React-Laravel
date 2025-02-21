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
                });
            });
        Route::controller(ProfileController::class)->group(function () {
            Route::prefix('users')->name('users.')->group(function () {
                Route::get('', 'index');
                Route::post('store',  'store')->name('store');
                Route::get('show/{user}', 'show')->name('show');
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
                Route::get('', 'index');
                Route::get('showAll', 'showAll');
                Route::post('store',  'store')->name('store');
                Route::get('show/{role}', 'show')->name('show');
                Route::put('update/{role}', 'update')->name('update');
                Route::delete('destroy/{role}', 'destroy');
            });
        });

    });

/*
    Route::controller(ProfileController::class)->group(function () {
        Route::get('', 'index')->name('index');
        Route::post('store',  'store')->name('store');//->middleware(['auth'])->middleware(['role:administrador']);
        Route::get('show/{user}', 'show')->name('show')->middleware(['auth']);
        Route::put('update/{user}', 'update')->name('update')->middleware(['auth'])->middleware(['role:administrador']);
        Route::put('changeRole/{user}', 'changeRole')->name('changeRole');//->middleware(['auth'])->middleware(['role:administrador']);
        Route::delete('destroy/{user}', 'destroy')->name('destroy')->middleware(['auth'])->middleware(['role:administrador']);
    });
    
    Route::controller(CategoriesController::class)->group(function () {
        Route::get('', 'index');
        Route::post('store', 'store')->name('categories.store');//->middleware(['auth'])->middleware(['role:administrador']);
        Route::get('show/{categories}', 'show')->name('categories.show');//->middleware(['auth']);
        Route::put('update/{categories}', 'update')->name('categories.update');//->middleware(['auth'])->middleware(['role:administrador']);
        Route::delete('destroy/{categories}', 'destroy')->name('categories.destroy');//->middleware(['auth'])->middleware(['role:administrador']);
    });
    
    Route::controller(RoleController::class)->group(function () {
        Route::get('/role', 'index');
        Route::post('/role/store', 'store')->name('categories.store')->middleware(['auth'])->middleware(['role:administrador']);
        Route::get('/role/show/{role}', 'show')->name('categories.show')->middleware(['auth']);
        Route::put('/role/update/{role}', 'update')->name('categories.update')->middleware(['auth'])->middleware(['role:administrador']);
        Route::delete('/role/destroy/{role}', 'destroy')->name('categories.destroy')->middleware(['auth'])->middleware(['role:administrador']);
    });
    
    Route::controller(PostController::class)->group(function () {
        Route::get('/posts', 'index')->name('posts.index');
        Route::get('/posts/showAll', 'showAll');
        Route::post('/posts/store', 'store')->name('posts.store')->middleware(['auth'])->middleware(['role:administrador']);
        Route::get('/posts/show/{post}', 'show')->name('posts.show')->middleware(['auth']);
        Route::put('/posts/update/{post}', 'update')->name('posts.update')->middleware(['auth'])->middleware(['role:administrador']);
        Route::delete('/posts/destroy/{post}', 'destroy')->name('posts.destroy')->middleware(['auth'])->middleware(['role:administrador']);
    });
    */
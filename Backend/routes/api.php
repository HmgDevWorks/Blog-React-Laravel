<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//cambiar cuando lo tengamos hecho
 Route::controller(ProfileController::class)->group(function () {
    Route::get('/users', 'index')->name('users.index');
    Route::get('/users/{user}', 'show')->name('users.show');
    Route::post('/users/store',  'store')->name('users.store');//->middleware(['auth'])->middleware(['role:administrador']);
    //Route::get('/users/show/{user}', 'show')->name('users.show')->middleware(['auth']);
    Route::put('/users/update/{user}', 'update')->name('users.update'); //->middleware(['auth'])->middleware(['role:administrador']);
    Route::put('/users/changeRole/{user}', 'changeRole')->name('users.changeRole');//->middleware(['auth'])->middleware(['role:administrador']);
    Route::delete('/users/destroy/{user}', 'destroy')->name('users.destroy')->middleware(['auth'])->middleware(['role:administrador']);
});

Route::controller(CategoriesController::class)->group(function () {
    Route::get('/categories', 'index');
    Route::post('/categories/store', 'store')->name('categories.store')->middleware(['auth:sanctum'])->middleware(['role:admin']);
    Route::get('/categories/show/{categories}', 'show')->name('categories.show');
    Route::put('/categories/update/{categories}', 'update')->name('categories.update')->middleware(['auth:sanctum'])->middleware(['role:admin']);
    Route::delete('/categories/destroy/{categories}', 'destroy')->name('categories.destroy')->middleware(['auth:sanctum'])->middleware(['role:admin']);
});

Route::controller(RoleController::class)->group(function () {
    Route::get('/role', 'index');
    Route::post('/role/store', 'store')->name('role.store')->middleware(['auth:sanctum'])->middleware(['role:admin']);
    Route::get('/role/show/{role}', 'show')->name('role.show');
    Route::put('/role/update/{role}', 'update')->name('role.update')->middleware(['auth:sanctum'])->middleware(['role:admin']);
    Route::delete('/role/destroy/{role}', 'destroy')->name('role.destroy')->middleware(['auth:sanctum'])->middleware(['role:admin']);
});

Route::controller(PostController::class)->group(function () {
    Route::get('/posts', 'index')->name('posts.index');
    Route::get('/posts/showAll', 'showAll');
    Route::get('/posts/user/{id}', 'postUser');    
    Route::post('/posts/store', 'store')->name('posts.store')->middleware(['auth'])->middleware(['role:administrador']);
    Route::get('/posts/show/{post}', 'show')->name('posts.show')->middleware(['auth']);
    Route::put('/posts/update/{post}', 'update')->name('posts.update')->middleware(['auth'])->middleware(['role:administrador']);
    Route::delete('/posts/destroy/{post}', 'destroy')->name('posts.destroy')->middleware(['auth'])->middleware(['role:administrador']);
});

?>
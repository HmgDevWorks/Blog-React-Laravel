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
    Route::post('/users/store',  'store')->name('users.store')->middleware(['auth:sanctum'])->middleware(['role:admin']);
    Route::get('/users/show/{user}', 'show')->name('users.show');
    Route::put('/users/update/{user}', 'update')->name('users.update')->middleware(['auth:sanctum'])->middleware(['role:admin']);
    Route::put('/users/changeRole/{user}', 'changeRole')->name('users.changeRole')->middleware(['auth:sanctum'])->middleware(['role:admin']);
    Route::delete('/users/destroy/{user}', 'destroy')->name('users.destroy')->middleware(['auth:sanctum'])->middleware(['role:admin']);
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
    Route::post('/posts/store', 'store')->name('posts.store')->middleware(['auth:sanctum'])->middleware(['role:admin']);
    Route::get('/posts/show/{post}', 'show')->name('posts.show');
    Route::put('/posts/update/{post}', 'update')->name('posts.update')->middleware(['auth:sanctum'])->middleware(['role:admin']);
    Route::delete('/posts/destroy/{post}', 'destroy')->name('posts.destroy')->middleware(['auth:sanctum'])->middleware(['role:admin']);
});

//Pruebas login
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');


?>
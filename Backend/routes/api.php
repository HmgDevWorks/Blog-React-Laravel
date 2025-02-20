<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\PostController;
use App\Models\User;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
//cambiar cuando lo tengamos hecho
Route::post('/login', 'index');
// Route::controller(UserController::class)->group(function () {
//     Route::get('/users', 'index')->name('users.index');
//     Route::post('/users', 'store')->name('users.store');
//     Route::get('/users/create',  'create')->name('users.create')->middleware(['auth'])->middleware(['role:administrador']);
//     Route::get('/users/{user}', 'show')->name('users.show')->middleware(['auth']);
//     Route::put('/users/{user}', 'update')->name('users.update')->middleware(['auth'])->middleware(['role:administrador']);
//     Route::delete('/users/{user}', 'destroy')->name('users.destroy')->middleware(['auth'])->middleware(['role:administrador']);
//     Route::get('/users/{user}/edit', 'edit')->name('users.edit')->middleware(['auth'])->middleware(['role:administrador']);
// });

Route::controller(CategoriesController::class)->group(function () {
    Route::get('/categories', 'index');
    Route::post('/categories', 'store')->name('categories.store');
    Route::get('/categories/create',  'create')->name('categories.create')->middleware(['auth'])->middleware(['role:administrador']);
    Route::get('/categories/{category}', 'show')->name('categories.show')->middleware(['auth']);
    Route::put('/categories/{category}', 'update')->name('categories.update')->middleware(['auth'])->middleware(['role:administrador']);
    Route::delete('/categories/{category}', 'destroy')->name('categories.destroy')->middleware(['auth'])->middleware(['role:administrador']);
    Route::get('/categories/{category}/edit', 'edit')->name('categories.edit')->middleware(['auth'])->middleware(['role:administrador']);
});

Route::controller(PostController::class)->group(function () {
    Route::get('/posts', 'index')->name('posts.index');
    Route::post('/posts', 'store')->name('posts.store');
    Route::get('/posts/create',  'create')->name('posts.create')->middleware(['auth'])->middleware(['role:administrador']);
    Route::get('/posts/{post}', 'show')->name('posts.show')->middleware(['auth']);
    Route::put('/posts/{post}', 'update')->name('posts.update')->middleware(['auth'])->middleware(['role:administrador']);
    Route::delete('/posts/{post}', 'destroy')->name('posts.destroy')->middleware(['auth'])->middleware(['role:administrador']);
    Route::get('/posts/{post}/edit', 'edit')->name('posts.edit')->middleware(['auth'])->middleware(['role:administrador']);
});
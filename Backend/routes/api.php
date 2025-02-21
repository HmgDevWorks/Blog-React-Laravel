<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:passport');
//cambiar cuando lo tengamos hecho
 Route::controller(ProfileController::class)->group(function () {
    Route::get('/users', 'index')->name('users.index');
    Route::post('/users/store',  'store')->name('users.store');//->middleware(['auth'])->middleware(['role:administrador']);
    Route::get('/users/show/{user}', 'show')->name('users.show')->middleware(['auth']);
    Route::put('/users/update/{user}', 'update')->name('users.update')->middleware(['auth'])->middleware(['role:administrador']);
    Route::put('/users/changeRole/{user}', 'changeRole')->name('users.changeRole');//->middleware(['auth'])->middleware(['role:administrador']);
    Route::delete('/users/destroy/{user}', 'destroy')->name('users.destroy')->middleware(['auth'])->middleware(['role:administrador']);
});

Route::controller(CategoriesController::class)->group(function () {
    Route::get('/categories', 'index');
    Route::post('/categories/store', 'store')->name('categories.store');//->middleware(['auth'])->middleware(['role:administrador']);
    Route::get('/categories/show/{categories}', 'show')->name('categories.show');//->middleware(['auth']);
    Route::put('/categories/update/{categories}', 'update')->name('categories.update');//->middleware(['auth'])->middleware(['role:administrador']);
    Route::delete('/categories/destroy/{categories}', 'destroy')->name('categories.destroy');//->middleware(['auth'])->middleware(['role:administrador']);
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
<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\FavoritesController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Middleware\JwtMiddleware;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:passport');
//cambiar cuando lo tengamos hecho
Route::controller(ProfileController::class)->middleware([JwtMiddleware::class])->group(function () {
    Route::get('/users', 'index')->name('users.index'); //muestra todos los usuarios
    Route::get('/users/{user}', 'show')->name('users.show'); //muestra el usuario por el id
    Route::get('/users/number', 'showNUsers'); // Devuelve la cantidad de users
    Route::post('/users/store', 'store')->name('users.store');//->middleware(['auth'])->middleware(['role:administrador']);
    Route::put('/users/update/{user}', 'update')->name('users.update'); //->middleware(['auth'])->middleware(['role:administrador']);
    Route::put('/users/changeRole/{user}', 'changeRole')->name('users.changeRole');//->middleware(['auth'])->middleware(['role:administrador']);
    Route::delete('/users/destroy/{user}', 'destroy')->name('users.destroy');//->middleware(['auth'])->middleware(['role:administrador']);
});

Route::controller(CategoriesController::class)->group(function () {
    Route::get('/categories', 'index');
    Route::post('/categories/store', 'store')->name('categories.store');//->middleware(['auth'])->middleware(['role:administrador']);
    Route::get('/categories/show/{categories}', 'show')->name('categories.show');//->middleware(['auth']);
    Route::put('/categories/update/{categories}', 'update')->name('categories.update');//->middleware(['auth'])->middleware(['role:administrador']);
    Route::delete('/categories/destroy/{categories}', 'destroy')->name('categories.destroy');//->middleware(['auth'])->middleware(['role:administrador']);
});

Route::controller(RoleController::class)->group(function () {
    Route::get('/role', 'index'); // Enseña todos los roles 
    Route::post('/role/store', 'store')->name('role.store');//->middleware(['auth'])->middleware(['role:administrador']); // crea un nuevo rol
    Route::get('/role/show/{role}', 'show')->name('role.show');//->middleware(['auth']); // Enseña un rol 
    Route::put('/role/update/{role}', 'update')->name('role.update');//->middleware(['auth'])->middleware(['role:administrador']); // Modifica un roll
    Route::delete('/role/destroy/{role}', 'destroy')->name('role.destroy');//->middleware(['auth'])->middleware(['role:administrador']); // Elimina un roll
});

Route::controller(PostController::class)->group(function () {
    Route::get('/posts', 'index')->name('posts.index'); // enseña los 10 últimos
    Route::get('/posts/show', 'show'); // Enseña todos los posts
    Route::get('/posts/show/{post}', 'showOne'); // Enseña un post por un id
    Route::get('/posts/categories/{cat}', 'showPostByCategory'); // Enseña todos los post pasandole una categoría
    Route::get('/posts/number', 'showNPost'); // Devuelve la cantidad de posts
    Route::get('/posts/user/{id}', 'postUser');    //Enseña los post a traves del id del usuario
    Route::get('/posts/searchPosts', 'searchPosts');    //Ruta para buscar posts BARRA DE BÚSQUEDA
    Route::get('/posts/posts-overview/{userId}', 'getUserPostsOverview');    // Devuelve las estadísticas para el Dashboard
    Route::post('/posts/store', 'store')->name('posts.store');//->middleware(['auth'])->middleware(['role:administrador']); //Crea un post
    Route::put('/posts/update/{post}', 'update')->name('posts.update');//->middleware(['auth'])->middleware(['role:administrador']); //Actualiza Post
    Route::delete('/posts/destroy/{post}', 'destroy')->name('posts.destroy');//->middleware(['auth'])->middleware(['role:administrador']); //Borra 
});

//Login
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
//Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);//->middleware('auth:api');
Route::get('/user', [ProfileController::class, 'getUser'])->middleware('auth:api');
Route::get('/verify-token', function (Request $request) {
    return response()->json(['message' => 'Token válido', 'user' => $request->user()]);
});

Route::controller(FavoritesController::class)->middleware('auth:api')->group(function () {
    Route::get('/favorites/{userId}', 'index')->name('favorites.index'); // enseña todos los favoritos
    Route::post('/favorites/store/{postId}', 'store')->name('favorites.store');//->middleware(['auth'])->middleware(['role:administrador']); //Crea un nuevo fav
    Route::delete('/favorites/destroy/{postId}', 'destroy')->name('favorites.destroy');//->middleware(['auth'])->middleware(['role:administrador']); //Borra un fav marcado
});
?>
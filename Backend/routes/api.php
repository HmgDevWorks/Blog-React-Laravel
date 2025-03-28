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
use App\Http\Controllers\PermissionController;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Kernel;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Models\User;
use App\Mail\CustomEmailVerification;
use Illuminate\Support\Facades\Mail;
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:passport');

//Rutas que no necesitan AUTH // Rutas que son para el INDEX,HOME
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
//Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:api');
Route::get('/user', [ProfileController::class, 'getUser'])->middleware('auth:api');
Route::middleware('auth:api')->get('/verify-token', function (Request $request) {
    $user = $request->user();
    return response()->json([
        'message' => 'Token válido',
        'user' => [
            'id' => $user->id,
            'role' => $user->roles()->first()->name, // Obtiene el primer rol asignado
            'email_user' => $user->email_user
        ]
    ]);
});
Route::get('/categories/{data}', [CategoriesController::class, 'showCategoriesByName']);
Route::middleware('auth:api')->post('/refresh-token', function () { //renueva el token para que no se expire a los 60 minutos
    return response()->json([
        'token' => auth()->refresh(),
        'message' => 'Token actualizado correctamente'
    ]);
});

Route::get('/verify-email/{id}/{hash}', function ($id, $hash) {
    $user = User::findOrFail($id);

    if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
        return response()->json(['message' => 'Enlace de verificación no válido'], 403);
    }

    if ($user->hasVerifiedEmail()) {
        return response()->json(['message' => 'El email ya ha sido verificado'], 200);
    }

    $user->markEmailAsVerified();

    return response()->json(['message' => 'Cuenta verificada con exito']);
})->name('verification.verify'); //->middleware(['signed'])

Route::post('/email/resend', function (Request $request) {
    $user = User::where('email_user', $request->email_user)->first();

    if (!$user) {
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    if ($user->hasVerifiedEmail()) {
        return response()->json(['message' => 'El email ya ha sido verificado'], 200);
    }

    Mail::to($user->email_user)->send(new CustomEmailVerification($user));

    return response()->json(['message' => 'Correo de verificación reenviado']);
});

Route::get('/categories', [CategoriesController::class, 'index']);
Route::get('/stats/counter', [PostController::class, 'getStatsForCounter']);



Route::controller(ProfileController::class)->middleware([JwtMiddleware::class])->group(function () {
    Route::get('/users/infouser','getInfoUser')->name('users.getInfoUser')->middleware('role:admin|editor|viewer'); //muestra info no sensible del user
    //Route::get('/users/infofav','getInfoFavUser')->name('users.getInfoFavUser')->middleware('role:admin|editor'); //muestra los favs que tienen los post de un user editor/admin
    Route::get('/users/infoviews','getInfoViewUser')->name('users.getInfoViewUser')->middleware('role:admin|editor'); //cantidad de visitas que tienen todos sus posts
    Route::get('/users/infousercrypt','getInfoUserCrypted')->name('users.getInfoUserCrypted')->middleware('role:admin|editor|viewer'); //muestra toda la info del user pero cryptada
    Route::get('/users', 'index')->name('users.index')->middleware('role:admin|editor'); //muestra todos los usuarios
    Route::get('/users/{user}', 'show')->name('users.show')->middleware('role:admin|editor|reader'); //muestra el usuario por el id
    Route::post('/users/store', 'store')->name('users.store')->middleware('role:admin'); //crea un usuario sin registro normal
    Route::put('/users/update/{user}', 'update')->name('users.update')->middleware('role:admin|editor|reader');; //middleware en el servicio
    Route::put('/users/changeRole/{user}', [ProfileController::class, 'changeRole'])->name('users.changeRole')->middleware('role:admin'); //cambio de roles, solo se puede si eres adminn
    Route::delete('/users/destroy/{user}', 'destroy')->name('users.destroy')->middleware('role:admin'); //eliminar un perfil
});
Route::controller(CategoriesController::class)->group(function () {
    Route::get('/categories', 'index');
});
Route::controller(CategoriesController::class)->middleware([JwtMiddleware::class])->group(function () {
    // Route::get('/categories', 'index');//->middleware('role:admin|editor|reader');//ver todas categorias
    Route::get('/categories/posts/{name}', 'PostForCategory')->name('categories.PostsForCategory')->middleware('role:admin|editor|reader');
    Route::post('/categories/store', 'store')->name('categories.store')->middleware('role:admin'); //crear una categoria
    Route::get('/categories/show/{categories}', 'show')->name('categories.show')->middleware('role:admin|editor|reader'); //motrar todos los post de una categoria
    Route::put('/categories/update/{categories}', 'update')->name('categories.update')->middleware('role:admin'); //modificar una categoria
    Route::delete('/categories/destroy/{categories}', 'destroy')->name('categories.destroy')->middleware('role:admin'); //eliminar una categoria
});

Route::controller(RoleController::class)->middleware([JwtMiddleware::class])->group(function () {
    Route::get('/role', 'index')->middleware('role:admin');
    Route::post('/role/store', 'store')->name('role.store')->middleware('role:admin'); // crea un nuevo rol
    Route::get('/role/show/{role}', 'show')->name('role.show')->middleware('role:admin'); // Enseña un rol 
    Route::put('/role/update/{role}', 'update')->name('role.update')->middleware('role:admin'); // Modifica un roll
    Route::delete('/role/destroy/{role}', 'destroy')->name('role.destroy')->middleware('role:admin'); // Elimina un roll
});

Route::controller(PermissionController::class)->middleware([JwtMiddleware::class])->group(function () {
    Route::get('/permission', 'index')->middleware('role:admin'); //enseña todos los permisos
    Route::post('/permission/create', 'create')->name('permission.create')->middleware('role:admin'); //crea un nuevo permiso
    Route::post('/permission/{role}/permissions','assignPermissionToRole')->name('permission.assignPermissionToRole')->middleware('role:admin');
    Route::post('/roles/{role}/permissions/revoke','revokePermissionFromRole')->name('permission.revokePermissionFromRole')->middleware('role:admin');
});

Route::controller(PostController::class)->middleware([JwtMiddleware::class])->group(function () {
    Route::get('/posts', 'index')->name('posts.index')->middleware('role:admin|editor|reader'); // enseña los 10 últimos
    Route::get('/posts/{id}','getPublishedPostById')->name('posts.getPublishedPostById')->middleware('role:admin|editor|reader');//enseña los posts published de un user
    Route::get('/posts/status','getPublishedOrDraftOrDeletedPosts')->name('posts.getPublishedOrDraftOrDeletedPosts')->middleware('role:admin|editor|reader');//elige y enseña los posts published draft o deleted del user auth
    Route::get('/posts/show', 'show')->middleware('role:admin|editor|reader'); // Enseña todos los posts
    Route::get('/posts/show/{post}', 'getPostById')->middleware('role:admin|editor|reader'); // Enseña un post por un id
    Route::get('/posts/user/{id}', 'postUser')->middleware('role:admin|editor|reader');    //Enseña los post a traves del id del usuario
    Route::get('/posts/searchPosts', 'searchPosts')->middleware('role:admin|editor|reader');    //Ruta para buscar posts BARRA DE BÚSQUEDA
    Route::get('/posts/posts-overview/{userId}', 'getUserPostsOverview')->middleware('role:admin|editor|reader');    // Devuelve las estadísticas para el Dashboard
    Route::post('/posts/store', 'store')->name('posts.store')->middleware('role:admin|editor'); //Crea un post
    Route::put('/posts/update/{post}', 'update')->name('posts.update')->middleware('role:admin|editor'); //Actualiza Post
    Route::delete('/posts/destroy/{post}', 'destroy')->name('posts.destroy'); //->middleware('role:admin|editor'); //Borra 
});

Route::get('/posts/news', [PostController::class, 'getTenNewsPost'])->name('posts.getTenNewsPost');

Route::controller(FavoritesController::class)->middleware([JwtMiddleware::class])->group(function () {
    Route::get('/favorites', 'getFavoritesForAuthenticatedUser')->name('favorites.getFavoritesForAuthenticatedUser')->middleware('role:admin|editor|reader'); //solo enseña los del usuario verificado
    Route::get('/favorites/{userId}', 'index')->name('favorites.index')->middleware('role:admin'); // enseña todos los favoritos se puede modificar para que salgan todos del tiron o como esta por user_id
    Route::post('/favorites/store/{postId}', 'store')->name('favorites.store')->middleware('role:admin|editor|reader'); //Crea un nuevo fav
    Route::delete('/favorites/destroy/{postId}', 'destroy')->name('favorites.destroy')->middleware('role:admin|editor|reader'); //Borra un fav marcado hay que pasarle el ID del post para borrarlo, no el id que tiene el favoritos
});

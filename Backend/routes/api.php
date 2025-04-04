<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\FavoritesController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\AuthController;
use App\Http\Kernel;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Models\User;
use App\Mail\CustomEmailVerification;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\UploadController;


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:passport');

//Rutas que no necesitan AUTH // Rutas que son para el INDEX,HOME
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
//Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:api');
Route::get('/user', [ProfileController::class, 'getUser'])->middleware('auth:api');

Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])->name('verification.verify'); //verifica la cuenta del user una vez se crea
Route::post('/email/resend', [EmailVerificationController::class, 'resend']); //reenvia el email para que pueda verificar cuenta

Route::post('/password/email', [PasswordResetController::class, 'sendResetLinkEmail']); //envia el correo con el link para restablecer la pass
Route::post('/password/reset', [PasswordResetController::class, 'resetPassword']); //ruta que verifica los datos para poder cambiar la contraseña

Route::get('/categories', [CategoriesController::class, 'index']); //muestra las categorias
Route::get('/stats/counter', [PostController::class, 'getStatsForCounter']); //stats para el footer
Route::get('/categories/{data}', [CategoriesController::class, 'showCategoriesByName']); //muestra el nombre de las categorias
Route::get('/posts/news', [PostController::class, 'getTenNewsPost']);
Route::get('/newsletter/generate', [NewsletterController::class, 'generate']); //ruta para probar que la newsletter se envia y que envia todo bene
Route::get('/popular-users', [PostController::class, 'searchPopuUser']);

Route::middleware('auth:api')->get('/verify-token', [AuthController::class, 'verifyToken']);
Route::middleware('auth:api')->post('/refresh-token', [AuthController::class, 'refreshToken']);
Route::post('/upload', [UploadController::class, 'uploadImage'])->middleware([JwtMiddleware::class])->middleware('role:admin|editor'); //ruta para subir img al post
Route::post('/profile/upload-avatar', [UploadController::class, 'uploadAvatar'])->middleware([JwtMiddleware::class])->middleware('role:admin|editor'); //ruta para cambiar la imagen de perfil

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

Route::controller(ProfileController::class)->middleware([JwtMiddleware::class])->group(function () {
    Route::get('/users/infouser', 'getInfoUser')->name('users.getInfoUser')->middleware('role:admin|editor|viewer'); //muestra info no sensible del user
    //Route::get('/users/infofav','getInfoFavUser')->name('users.getInfoFavUser')->middleware('role:admin|editor'); //muestra los favs que tienen los post de un user editor/admin
    Route::get('/users/infoviews', 'getInfoViewUser')->name('users.getInfoViewUser')->middleware('role:admin|editor'); //cantidad de visitas que tienen todos sus posts
    Route::get('/users/infousercrypt', 'getInfoUserCrypted')->name('users.getInfoUserCrypted')->middleware('role:admin|editor|viewer'); //muestra toda la info del user pero cryptada
    Route::get('/users', 'index')->name('users.index')->middleware('role:admin|editor'); //muestra todos los usuarios
    Route::get('/users/{user}', 'show')->name('users.show')->middleware('role:admin|editor|reader'); //muestra el usuario por el id
    Route::post('/users/store', 'store')->name('users.store')->middleware('role:admin'); //crea un usuario sin registro normal
    Route::put('/users/update', 'update')->name('users.update')->middleware('role:admin|editor|reader');
    ; //middleware en el servicio
    Route::put('/users/updatePassword', 'getUpdatePassword')->name('users.getUpdatePassword')->middleware('role:admin|editor|reader'); //cambia la contraseña, se necesita "current_password" y "new_password"
    Route::put('/users/changeRole/{user}', 'changeRole')->name('users.changeRole')->middleware('role:admin'); //cambio de roles, solo se puede si eres adminn
    Route::delete('/users/destroy/{user}', 'destroy')->name('users.destroy')->middleware('role:admin'); //eliminar un perfil
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
    Route::put('/role/update/{user}', 'update')->name('role.update')->middleware('role:admin'); // Modifica un roll del user, necesita el id y de value role:rol
    Route::delete('/role/destroy/{role}', 'destroy')->name('role.destroy')->middleware('role:admin'); // Elimina un roll
});

Route::controller(PermissionController::class)->middleware([JwtMiddleware::class])->group(function () {
    Route::get('/permission', 'index')->middleware('role:admin'); //enseña todos los permisos
    Route::post('/permission/create', 'create')->name('permission.create')->middleware('role:admin'); //crea un nuevo permiso
    Route::post('/permission/{role}/permissions', 'assignPermissionToRole')->name('permission.assignPermissionToRole')->middleware('role:admin');
    Route::post('/roles/{role}/permissions/revoke', 'revokePermissionFromRole')->name('permission.revokePermissionFromRole')->middleware('role:admin');
});

Route::get('/posts/searchAuthors', [PostController::class, 'searchAuthors']);

Route::controller(PostController::class)->middleware([JwtMiddleware::class])->group(function () {
    Route::get('/posts/show', 'index')->name('posts.index')->middleware('role:admin|editor|reader'); // enseña los 10 últimos
    Route::get('/posts/count', 'getCountPost')->name('posts.getCountPost')->middleware('role:admin|editor|reader');//muestra la cantidad de post published que tiene el user
    Route::get('/posts/authUser', 'getPostsAuthUser')->name('posts.getPostsAuthUser')->middleware('role:admin|editor'); //muestra los posts publis y delet del user auth para el crear articulo
    Route::get('/posts/published/{id}', 'getPublishedPostById')->name('posts.getPublishedPostById')->middleware('role:admin|editor|reader');//enseña los posts published de un user
    Route::get('/posts/admin/{id}', 'getPostsForAdminbyId')->name('posts.getPostsForAdminbyId')->middleware('role:admin');//muestra todos los post de un user a un admin
    Route::get('/posts/status', 'getPostsByStatus')->name('posts.getPostsByStatus')->middleware('role:admin|editor|reader');//elige y enseña los posts published draft o deleted del user auth
    Route::get('/posts/all', 'show')->name('posts.show')->middleware('role:admin|editor|reader'); // Enseña todos los posts (URL modificada)
    Route::get('/posts/show/{post}', 'getPostById')->middleware('role:admin|editor|reader'); // Enseña un post por un id
    Route::get('/posts/user/{id}', 'postUser')->middleware('role:admin|editor|reader');     //Enseña los post a traves del id del usuario
    Route::get('/posts/searchPosts', 'searchPosts')->middleware('role:admin|editor|reader');      //Ruta para buscar posts BARRA DE BÚSQUEDA 
    //Route::get('/posts/searchAuthors','searchAuthors')->middleware('role:admin|editor|reader');//ruta para barra de busqueda de autores   
    Route::get('/posts/posts-overview/{userId}', 'getUserPostsOverview')->middleware('role:admin|editor|reader');      // Devuelve las estadísticas para el Dashboard
    Route::post('/posts/store', 'store')->name('posts.store')->middleware('role:admin|editor'); //Crea un post
    Route::put('/posts/update/{post}', 'update')->name('posts.update')->middleware('role:admin|editor'); //Actualiza Post
    Route::delete('/posts/destroy/{post}', 'destroy')->name('posts.destroy')->middleware('role:admin|editor'); //Borra
});

Route::controller(FavoritesController::class)->middleware([JwtMiddleware::class])->group(function () {
    Route::get('/favorites', 'getFavoritesForAuthenticatedUser')->name('favorites.getFavoritesForAuthenticatedUser')->middleware('role:admin|editor|reader'); //solo enseña los del usuario verificado
    Route::get('/favorites/count', 'getFavsCount')->name('favorites.getFavsCount')->middleware('role:admin|editor|reader'); //muestra la cantidad de favs que tiene el user
    Route::get('/favorites/{userId}', 'index')->name('favorites.index')->middleware('role:admin'); // enseña todos los favoritos se puede modificar para que salgan todos del tiron o como esta por user_id
    Route::post('/favorites/store/{postId}', 'store')->name('favorites.store')->middleware('role:admin|editor|reader'); //Crea un nuevo fav
    Route::delete('/favorites/destroy/{postId}', 'destroy')->name('favorites.destroy')->middleware('role:admin|editor|reader'); //Borra un fav marcado hay que pasarle el ID del post para borrarlo, no el id que tiene el favoritos
});

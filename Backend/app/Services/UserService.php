<?php
// Hemos creado dentro de la carpeta App, la carpeta Services, para añadir los servicios de cada modelo
namespace App\Services;

use App\Models\User;
use App\Models\Favorites;
use App\Models\Post;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Stmt\TryCatch;
use Spatie\Permission\Contracts\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


class UserService
{
    public function getAllUser() // Esta función recoge todos los datos de la tabla User
    { 
        return User::all();
    }

    public function getUserById($id)  // Devuelve el usuario con el ID especificado, o lanza un error 404 si no existe. Tambíen devulve Nposts y Nfavs si es admin o editor
    {   
        $user = User::findOrFail($id);

        if ($user->hasRole('admin') || $user->hasRole('editor')) {

            $user->favourites = $user->favorites()->count();
            $user->posts = $user->posts()->count();
            unset($user->roles);

            return $user;  
        }
        unset($user->roles);        
        return $user;

        //return User::findOrFail($id);
    }

    public function createUser($data)// Devuelve el usuario recién creado, la función create recibe un array y va rellenando la BBDD. 
    { 
        try {
            if (User::where('email_user', $data->email_user)->exists()) {
                return response()->json(['message' => 'errorMsg.errorMailDuplicate'], 409); // 409, codigo de error de conflicto de datos
            }
            if (User::where('name_user', $data->name_user)->exists()) {
                return response()->json(['message' => 'errorMsg.errorNameUserDuplicate'], 409); // 409, codigo de error de conflicto de datos
            }
            $user = User::create([
                'name_user' => $data->name_user,
                'email_user' => $data->email_user,
                'password_user' => $data->password_user,
                // 'name_lastName' => $data->name_lastName ?? 'abc',
                'bio' => $data->bio ?? 'abc',
            ]);
            if ($user) {
                try {
                    $user->assignRole('reader');

                } catch (\Exception $e) {
                    return response()->json(["message" => "errorMsg.errorAssignRole", 400]);
                }
                return response()->json($user, 201);
            }
        } catch (\Exception $e) {
            return response()->json(["message" => "errorMsg.errorCreateUser", 400]);
        }
    }

    public function assignRoleUser($request, $user) // Esta función, hace un shoftDelete de un usuario, devuelve mesaje OK o mensaje KO
    { 
        if ($user->hasRole('admin'))
            return (response()->json(["message" => "errorMsg.errorChangeAdminRole"], 400));
        if ($request->role == 'admin')
            return (response()->json(["message" => "errorMsg.errorChangeRoleUserAdmin"], 400));
        if ($user->roles()->get()->isNotEmpty()) {
            $user->roles()->detach();
        }
        $user->assignRole($request->role);
        return (response()->json(["message" => "successMsg.successAssignRole"], 200));
    }

    public function deleteAuthUser()
    {
        if (Auth::check()) {
            $user = Auth::user();
            if (!$user->hasRole('admin')) {
                $user->delete();
                return response()->json(["message" => "successMsg.successDeleteUser"], 200);
            } else {
                return response()->json(["message" => "errorMsg.errorDeleteAdminDelete"], 403); // Código de estado más apropiado para "no autorizado"
            }
        } else {
            return response()->json(["message" => "errorMsg.unauthenticated"], 401); // Código de estado para "no autenticado"
        }
    }

    public function deleteAdminUsers($id)
    {
        $user = User::withTrashed()->find($id);

        if (!$user) {
            return response()->json(["message" => "Usuario no encontrado"], 404);
        }

        if ($user->trashed()) { //si el user ya esta softdeleteado
            return response()->json(["message" => "El usuario ya estaba eliminado"], 200);
        }

        if ($user->hasRole('admin')) {
            return response()->json(["message" => "errorMsg.errorDeleteAdminDelete"], 403);
        }

        $user->delete();

        return response()->json(["message" => "successMsg.successDeleteUser"], 200);
        }

    public function restoreUser($id)
    {
        $user = User::withTrashed()->find($id);

        if (!$user) {
            return response()->json(["message" => "Usuario no encontrado"], 404);
        }

        if (!$user->trashed()) {
            return response()->json(["message" => "El usuario no estaba eliminado"], 200);
        }

        $user->restore();

        return response()->json(["message" => "successMsg.successRestoreUser"], 200);
    }

    public function updateUser(Request $request, User $user): JsonResponse
    {
        
        $authUser = $request->user(); // obtiene el user verif
            $user = $authUser;
    
        if (!$user) {
            return response()->json(["message" => "errorMsg.errorUpdateUser"], 404);
        }
    
        if (!$authUser->hasRole('admin') && $authUser->id !== $user->id) { // verifica que el user autenticado tiene permisos
            return response()->json(["message" => "errorMsg.errorPermissionModifyUser"], 403);
        }
    
        $data = $request->only(['name_user', 'email_user', 'bio']);
    
        // if ($request->hasFile('img_user')) { // comprueba si hay cambios en la imagen 
        //     $image = $request->file('img_user');
        //     $imageName = time() . '.' . $image->extension();
        //     $image->move(public_path('avatars'), $imageName);
    
        //     if ($user->img_user && $user->img_user !== 'avatars/default.png') { // elimina la imagen anterior si es diferente de la predeterminada
        //         $oldImagePath = public_path($user->img_user);
        //         if (file_exists($oldImagePath)) {
        //             unlink($oldImagePath);
        //         }
        //     }
    
        //     $data['img_user'] = 'avatars/' . $imageName;
        // }
    
        $data = array_filter($data); // Esto eliminará campos vacíos
        $user->update($data);
        return response()->json(["message" => "successMsg.successUpdateUser"], 200);
    }

    public function getInfoUser()
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'errorMsg.errorUserNotAuth'], 401);
        }
        return response()->json([
            'name_user' => $user->name_user,
            'img_user' => $user->img_user,
        ]);
    }

    public function getInfoFavUser()
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'errorMsg.errorUserNotAuth'], 401);
        }

        $posts = $user->posts()->withCount('favorites')->get(); //funcion automatica de laravel que hace que pueda contar la cantidad de favoritos que tiene ese post
    
        $filteredPosts = $posts->filter(function ($post) {
            return $post->favorites_count > 0;
        });
        return response()->json($filteredPosts->map(function ($post) {
            return [
                'post_id' => $post->id,
                'title' => $post->title, // Opcional, si quieres mostrar el título
                'favorites_count' => $post->favorites_count,
            ];
        }));
    }

    public function getInfoViewUser()
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'errorMsg.errorUserNotAuth'], 401);
        }
        
        $posts = $user->posts;
        $postViews = $posts->map(function ($post) {
            return [
                'post_id' => $post->id,
                'title' => $post->title,
                'views' => $post->views, // Si el campo views_count existe
            ];
        });
    
        return response()->json($postViews);
    }

    public function getInfoUserCrypted()
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'errorMsg.errorUserNotAuth'], 401);
        }

        $encryptedData = encrypt($user->toArray());
        return response()->json(['data' => $encryptedData]);
    }

    public function getUpdatePassword(Request $request)
    {
        $authUser = auth()->user();
            $request->validate([ //campos a rellenar
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:6', 
        ]);
    
        if (!Hash::check($request->current_password, $authUser->password_user)) {
            return response()->json(['error' => 'La contraseña actual es incorrecta.'], 422);
        }
    
        $authUser->password_user = Hash::make($request->new_password);
        $authUser->save();  
    
        return response()->json(['message' => 'successMsg.successUpdatePass']);
    }
       
}
?>
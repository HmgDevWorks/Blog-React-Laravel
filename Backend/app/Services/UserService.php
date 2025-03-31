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
use Illuminate\Support\Facades\Log;


class UserService
{
    public function getAllUser() // Esta función recoge todos los datos de la tabla User
    { 
        return User::all();
    }

    public function getUserById($id)  // Devuelve el post con el ID especificado, o lanza un error 404 si no existe
    {   
        return User::findOrFail($id);
    }

    public function createUser($data)// Devuelve el usuario recién creado, la función create recibe un array y va rellenando la BBDD. 
    { 
        try {
            if (User::where('email_user', $data->email_user)->exists()) {
                return response()->json(['message' => 'El email ya esta registrado', 'mensaje' => 'malmalrequetemal'], 409); // 409, codigo de error de conflicto de datos
            }
            if (User::where('name_user', $data->name_user)->exists()) {
                return response()->json(['message' => 'El nombre de ususario ya esta registrado'], 409); // 409, codigo de error de conflicto de datos
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
                    return response()->json(["mensaje" => "Error al asignar el role", 400]);
                }
                return response()->json($user, 201);
            }
        } catch (\Exception $e) {
            return response()->json(["mensaje" => "Error al crear el usuario", 400]);
        }
    }

    public function assignRoleUser($request, $user) // Esta función, hace un shoftDelete de un usuario, devuelve mesaje OK o mensaje KO
    { 
        if ($user->hasRole('admin'))
            return (response()->json(["mensaje" => "Error no se puede modificar el rol al usuario administrador"], 400));
        if ($request->role == 'admin')
            return (response()->json(["mensaje" => "Error no se puede asignar el rol de administrador a un usuario"], 400));
        if ($user->roles()->get()->isNotEmpty()) {
            $user->roles()->detach();
        }
        $user->assignRole($request->role);
        return (response()->json(["mensaje" => "Rol asignado con exito"], 200));
    }

    public function deleteUser($user) // Esta función, hace un shoftDelete de un usuario, devuelve mesaje OK o mensaje KO
    { 
        if ($user && !$user->hasRole('admin')) {
            $user->delete();
            return (response()->json(["mensaje" => "Usuario eliminado con exito"], 200));
        } else {
            return (response()->json(["mensaje" => "Error al borrar el usuario"], 201));

        }
    }

    public function updateUser(Request $request, User $user): JsonResponse
    {
        
        $authUser = $request->user(); // obtiene el user verif
            $user = $authUser;
    
        if (!$user) {
            return response()->json(["mensaje" => "Error al actualizar el usuario"], 404);
        }
    
        if (!$authUser->hasRole('admin') && $authUser->id !== $user->id) { // verifica que el user autenticado tiene permisos
            return response()->json(["mensaje" => "No tienes permiso para modificar este usuario"], 403);
        }
    
        $data = $request->only(['name_user', 'email_user', 'bio', 'img_user']);
        Log::info('Datos recibidos:', $request->all());
        Log::info('Archivo recibido:', [$request->file('img_user')]);
    
        if ($request->hasFile('img_user')) { // comprueba si hay cambios en la imagen 
            $image = $request->file('img_user');
            $imageName = time() . '.' . $image->extension();
            $image->move(public_path('avatars'), $imageName);
    
            if ($user->img_user && $user->img_user !== 'avatars/default.png') { // elimina la imagen anterior si es diferente de la predeterminada
                $oldImagePath = public_path($user->img_user);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }
    
            $data['img_user'] = 'avatars/' . $imageName;
        }
    
        $data = array_filter($data); // Esto eliminará campos vacíos
        $user->update($data);
        return response()->json(["mensaje" => "Usuario actualizado correctamente"], 200);
    }

    public function getInfoUser()
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
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
            return response()->json(['error' => 'Usuario no autenticado'], 401);
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
            return response()->json(['error' => 'Usuario no autenticado'], 401);
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
            return response()->json(['error' => 'Usuario no autenticado'], 401);
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
    
        if (!Hash::check($request->current_password, $authUser->password_user)) {  // verifica si la contraseña actual es correcta
            throw ValidationException::withMessages([
                'current_password' => ['La contraseña actual es incorrecta.'],
            ]);
        }
    
        $authUser->password_user = Hash::make($request->new_password);
        $authUser->save();  
    
        return response()->json(['message' => 'Contraseña actualizada correctamente.']);
    }
       
}
?>
<?php
// Hemos creado dentro de la carpeta App, la carpeta Services, para añadir los servicios de cada modelo
namespace App\Services;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Stmt\TryCatch;
use Spatie\Permission\Contracts\Role;

class UserService {
    
    public function getAllUser(){ // Esta función recoge todos los datos de la tabla User
        return User::all();
    }

    public function getUserById($id){    // Devuelve el post con el ID especificado, o lanza un error 404 si no existe
        return User::findOrFail($id);
    }

    public function createUser($data){ // Devuelve el usuario recién creado, la función create recibe un array y va rellenando la BBDD. 
        try{
            if(User::where('email_user', $data->email_user)->exists()){
                return response()->json(['message' => 'El email ya esta registrado'], 409); // 409, codigo de error de conflicto de datos
            }
            if(User::where('name_user', $data->name_user)->exists()){
                return response()->json(['message' => 'El nombre de ususario ya esta registrado'], 409); // 409, codigo de error de conflicto de datos
            }
            
                $user = User::create([
                'name_user' => $data->name_user,
                'email_user' => $data->email_user,
                'password_user' => $data->password_user,
                'name_lastName' => $data->name_lastName ?? null,
                'bio' => $data->bio ?? null,
            ]);
            if($user){
                try{
                    $user->assignRole('reader');
                    
                }catch(\Exception $e){
                    return response()->json(["mensaje"=>"Error al asignar el role", 400]);
                }
                return response()->json($user, 201);
            }
        }catch (\Exception $e) {
            return response()->json(["mensaje"=>"Error al crear el usuario", 400]);
        }
    }

    public function assignRoleUser($request, $user){ // Esta función, hace un shoftDelete de un usuario, devuelve mesaje OK o mensaje KO
        if($user->hasRole('admin'))
            return(response()->json(["mensaje"=>"Error no se puede modificar el rol al usuario administrador"], 400));
        if($request->role == 'admin')
            return(response()->json(["mensaje"=>"Error no se puede asignar el rol de administrador a un usuario"], 400));
        if ($user->roles()->get()->isNotEmpty()) {
            $user->roles()->detach();
        }
        $user->assignRole($request->role);
        return(response()->json(["mensaje"=>"Rol asignado con exito"], 200));
    }

    public function deleteUser($user){ // Esta función, hace un shoftDelete de un usuario, devuelve mesaje OK o mensaje KO
        if ($user && !$user->hasRole('admin')) {
            $user->delete();
            return(response()->json(["mensaje"=>"Usuario eliminado con exito"], 200));
        } else {
            return(response()->json(["mensaje"=>"Error al borrar el usuario"], 201));

        }
    }

    public function updateUser($data, $user){    // Esta función actualiza un usuario 
        if ($user) {
            $user->update([
                'name_user' => $data->name_user,
                'email_user' => $data->email_user,
                'name_lastName' => $data->name_lastName,
                'img_user' => $data->img_user,
                'bio' => $data->bio,
                'update_at' => now(),
            ]);
            return response()->json(["mensaje"=>"Usuario actualizado correctamente", 200]);; 
        }else {
            return response()->json(["mensaje"=>"Error al actualizar el usuario", 200]);; 
        }
    }
}
?>
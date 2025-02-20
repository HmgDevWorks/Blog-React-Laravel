<?php
// Hemos creado dentro de la carpeta App, la carpeta Services, para añadir los servicios de cada modelo
namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserService {
    
    public function getAllUser(){ // Esta función recoge todos los datos de la tabla User
        return User::all();
    }

    public function getUserById($id){    // Devuelve el post con el ID especificado, o lanza un error 404 si no existe
        return User::findOrFail($id);
    }

    public function createUser($data){ // Devuelve el usuario recién creado, la función create recibe un array y va rellenando la BBDD. 
        if(User::where('email_user', $data->email_user)->exists() || User::where('name_user', $data->name_user)->exists()){
            return response()->json(['message' => 'El usuario ya esta registrado'], 409); // 409, codigo de error de conflicto de datos
        }
        $user = User::create([
            'name_user' => $data->name_user,
            'email_user' => $data->email_user,
            'password_user' => $data->password_user,
            'name_lastName' => $data->name_lastName ?? null,
            'bio' => $data->bio ?? null,
        ]);
        //$this->assignRoleUser($user, 'reader');
        return response()->json($user);
    }

    public function assignRoleById($id, $role){
        $user = User::findOrFail($id);
        $this->assignRoleUser($user, $role);
    }

    public function assignRoleUser($user, $role){
        if($user->hasRole('admin'))
            return(NULL);
        if ($user->roles()->isNotEmpty()) {
            $user->roles()->detach();
        }
        $user->assignRole($role);
    }

    public function deleteUser($id){ // Devuelve V o F, si se le pasa un id de un post que no existe F y si el id existe, el post pasa a estar en estado 'delete'
        $user = User::findOrFail($id);
        if ($user && !$user->hasRole('admin')) {
            $user->delete();
            return true;
        }
    }

    public function updateUser($data){    // Esta función recibe los usuario del post actualizado, con los cambios indicados por el usuario, 
        $user = User::findOrFail($data->id); // si encuentra el id del ususario cambia los datos del antiguo. 
        if ($user) {
            $user->update([
                'name_user' => $data->name_user,
                'email_user' => $data->email_user,
                'name_lastName' => $data->name_lastName,
                'img_user' => $data->img_user,
                'bio' => $data->bio,
            ]);
            return true; 
        }else {
            return false; 
        }
    }
}
?>
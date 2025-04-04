<?php
// Hemos creado dentro de la carpeta App, la carpeta Services, para añadir los servicios de cada modelo
namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use App\Models\User;


class RoleService {
    
    public function getAllRole(){ // Esta función recoge todos los datos de la tabla role
        return Role::all();
    }

    public function getRoleById($id){    // Devuelve el role con el ID especificado, o lanza un error 404 si no existe
        return Role::findOrFail($id);
    }

    public function createRole($data){ // Devuelve el role recién creado, la función create recibe un array y va rellenando la BBDD. 
        $role = Role::create(
            [
                'name' => $data->name
            ]
        );
        if($role)
            return response()->json(["message"=>"successMsg.successRoleOk", 201]);
        return response()->json(["message"=>"errorMsg.errorCreateRole", 400]);
    }
    
    public function updateRole(Request $request, User $user)
    {
        $authUser = auth()->user();
        if (!$authUser->hasRole('admin')) {
            return response()->json(["message" => "errorMsg.errorChangeRoles"], 403);
        }

        if ($user->hasRole('admin')) {
            return response()->json(["message" => "errorMsg.errorChangeAdminRole"], 403);
        }

        $request->validate([ //lo que se pide en el json para poder cambiar el rol
            'role' => 'required|string|in:editor,reader,banned',
        ]);

        $role = Role::where('name', $request->role)->first(); // buscar el rol por nombre y obtener su ID
        if (!$role) {
            return response()->json(["ERROR AQUI" => "errorMsg.errorRoleNotExist"], 400);
        }

        $user->syncRoles([$role->id]); //funcion que asigna el rol en la tabla model has roles
        return response()->json(["message" => "successMsg.successUpdateRole"], 200);
    }
    
    public function destroyRole($role){ // Devuelve V o F, si se le pasa un id de un role que no existe F y si el id existe, el role pasa a estar en estado 'delete'
        if(Role::destroy($role->id))
            return response()->json(["message"=>"successMsg.successDeleteRole", 204]);
        return response()->json(["message"=>"errorMsg.errorDeleteRole", 400]);
    }
}

?>
<?php
// Hemos creado dentro de la carpeta App, la carpeta Services, para añadir los servicios de cada modelo
namespace App\Services;

// use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

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
            return response()->json(["mensaje"=>"Rol creado", 201]);
        return response()->json(["mensaje"=>"Error al crear el rol", 400]);
    }
    
    public function updateRole($data, $role){    // Esta función recibe los datos del role actualizado, con los cambios indicados por el usuario, 
        //$role = Role::findOrFail($data->id); // si encuentra el id del role cambia los datos del antiguo. 
        if ($role) {
            $role->update([
                'name' => $data->name ?? $role->name,
            ]);
            return response()->json(["mensaje"=>"Rol actualizado correctamente", 200]);
        }else {
            return response()->json(["Error al actualizar el rol", 400]);
        }
    }

    public function destroyRole($role){ // Devuelve V o F, si se le pasa un id de un role que no existe F y si el id existe, el role pasa a estar en estado 'delete'
        if(Role::destroy($role->id))
            return response()->json(["mensaje"=>"Rol eliminado correctamente", 204]);
        return response()->json(["mensaje"=>"Error al eliminar el rol", 400]);
    }
}

?>
<?php
// Hemos creado dentro de la carpeta App, la carpeta Services, para añadir los servicios de cada modelo
namespace App\Services;

// use App\Models\Categories;
// use App\Models\Post;
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
        return Role::create($data); 
    }

    public function deleteRole($id){ // Devuelve V o F, si se le pasa un id de un role que no existe F y si el id existe, el role pasa a estar en estado 'delete'
        if (Role::findOrFail($id)) {
            $rol = Role::findOrFail($id);
            $rol->status = "deleted";
            return true; 
        }else {
            return false; 
        }
    }
    
    public function updateRole($data){    // Esta función recibe los datos del role actualizado, con los cambios indicados por el usuario, 
        $rol = Role::findOrFail($data->id); // si encuentra el id del role cambia los datos del antiguo. 
        if ($rol) {
            $rol->update([
                'name' => $data->name,
            ]);
            return true; 
        }else {
            return false; 
        }
    }
    

}


?>
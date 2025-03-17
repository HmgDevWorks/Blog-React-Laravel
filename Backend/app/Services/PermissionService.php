<?php
// Hemos creado dentro de la carpeta App, la carpeta Services, para añadir los servicios de cada modelo
namespace App\Services;

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\User;

class PermissionService
{
    /**
     * Asigna un permiso a un rol específico.
     *
     * @param string $roleName
     * @param string $permissionName
     * @return void
     */
    public function assignPermissionToRole(string $roleName, string $permissionName)
    {
        // Busca el rol y el permiso por nombre
        $role = Role::findByName($roleName);
        $permission = Permission::findByName($permissionName);

        // Asigna el permiso al rol
        if ($role && $permission) {
            $role->givePermissionTo($permission);
        }
    }

    /**
     * Asigna permisos por defecto a los roles.
     *
     * @return void
     */
    public function assignDefaultPermissionsToRoles()
    {
        // Asigna permisos predeterminados al rol "administrador"
        $adminRole = Role::findByName('admin');
        $adminPermissions = Permission::all();
        $adminRole->givePermissionTo($adminPermissions);

        // Asigna permisos predeterminados al rol "editor"
        $editorRole = Role::findByName('editor');
        $editorPermissions = ['create_post','delete_post','update_post','publish_post','view_post','create_user','delete_user','update_user','view_user','banned_user'];
        $editorRole->givePermissionTo($editorPermissions);

        // Asigna permisos predeterminados al rol "lector"
         $readerRole = Role::findByName('reader');
         $readerPermissions = ['view_post'];
         $readerRole->givePermissionTo($readerPermissions);

         // Asigna permisos predeterminados al rol "banned"
         $bannedRole = Role::findByName('banned');
         $bannedPermissions = Role::findByName('banned_user');
         $bannedRole->givePermissionTo($bannedPermissions);
    }

    /**
     * Verifica si un usuario tiene un permiso específico.
     *
     * @param User $user
     * @param string $permission
     * @return bool
     */
    public function userHasPermission(User $user, string $permission)
    {
        return $user->can($permission);
    }

    /**
     * Verifica si un usuario tiene el rol de administrador.
     *
     * @param User $user
     * @return bool
     */
    public function isAdmin(User $user)
    {
        return $user->hasRole('admin');
    }

    /**
     * Verifica si un usuario tiene el rol de editor.
     *
     * @param User $user
     * @return bool
     */
    public function isEditor(User $user)
    {
        return $user->hasRole('editor');
    }

    /**
     * Verifica si un usuario tiene el rol de lector.
     *
     * @param User $user
     * @return bool
     */
    public function isReader(User $user)
    {
        return $user->hasRole('reader');
    }

    public function updatePermission($data){    // Esta función recibe los datos de los permisso actualizado, con los cambios indicados por el usuario, 
        $permission = permission::findOrFail($data->id); // si encuentra el id del permission cambia los datos del antiguo. 
        if ($permission) {
            $permission->update([
                'name' => $data->name,
            ]);
            return true; 
        }else {
            return false; 
        }
    }
}


?>
<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function index() :JsonResponse
    {
        $permissions = Permission::all();
        return response()->json($permissions);
    }

    // Crear un nuevo permiso
    public function create(Request $request) :JsonResponse
    {
        $validated = $request->validate([ // Validar los datos
            'name' => 'required|string|unique:permissions,name',
            'guard_name' => 'required|string|in:api',
        ]);

        try {
            $permission = Permission::create([
                'name' => $validated['name'],
                'guard_name' => $validated['guard_name'],
            ]);
    
            return response()->json([
                'message' => 'successMsg.successCreatePermission',
                'permission' => $permission,
            ], 201); 
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'errorMsg.errorCreatePermission',
                'details' => $e->getMessage(),
            ], 500); 
        }
    }

    public function assignPermissionToRole(Request $request) :JsonResponse //asigna permisos para latabla roles has permission
    {
        $validated = $request->validate([
            'role_id' => 'required|exists:roles,id',
            'permissions' => 'required|array',
            'permissions.*' => 'exists:permissions,id',
        ]);

        $role = Role::find($validated['role_id']);
        $role->givePermissionTo($validated['permissions']);

        return response()->json([
            'message' => 'successMsg.successAssignPermissionRole',
            'role' => $role,  // Devuelve el rol actualizado con los permisos asignados
            'permissions' => $role->permissions, // Los permisos asignados al rol
        ], 200);
    }
   
    public function revokePermissionFromRole(Request $request) :JsonResponse //quita permisos de un rol
    {
        $validated = $request->validate([
            'role_id' => 'required|exists:roles,id', // Validar que 'role_id' sea válido
            'permissions' => 'required|array', // Validar que 'permissions' sea un arreglo
            'permissions.*' => 'exists:permissions,id', // Validar que cada permiso exista
        ]);

        $role = Role::find($validated['role_id']);
        $role->revokePermissionTo($validated['permissions']);

        return response()->json([
            'message' => 'successMsg.successRevokePermissionRole',
            'role' => $role,  // Devuelve el rol actualizado con los permisos revocados
            'permissions' => $role->permissions, // Los permisos restantes del rol
        ], 200);
    }
}

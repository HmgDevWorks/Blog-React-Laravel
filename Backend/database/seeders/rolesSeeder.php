<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class rolesSeeder extends Seeder
{
    public function run(): void
    {
        // Crear permisos con el guard 'api'
        $permissions = [
            'create_post',
            'delete_post',
            'update_post',
            'publish_post',
            'view_post',
            'create_user',
            'delete_user',
            'update_user',
            'view_user',
        ];

        foreach ($permissions as $permission) {
            Permission::create([
                'name' => $permission,
                'guard_name' => 'api' // Especifica que el guard es 'api'
            ]);
        }

        // Crear roles
        $adminRole = Role::create(['name' => 'admin']);
        $editorRole = Role::create(['name' => 'editor']);
        $readerRole = Role::create(['name' => 'reader']);

        // Asignar permisos a los roles
        $adminRole->givePermissionTo(Permission::all());
        $editorRole->givePermissionTo(['create_post', 'update_post', 'publish_post', 'view_post']);
        $readerRole->givePermissionTo(['view_post']);

        foreach ($adminRole->permissions as $permission) {
            $adminRole->permissions()->updateExistingPivot($permission->id, ['assing_date' => now()]);
        }
    }
}
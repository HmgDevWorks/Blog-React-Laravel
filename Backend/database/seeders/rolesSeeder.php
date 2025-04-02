<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class rolesSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [ //array de permisos, no hace falta crear seeder de permisos
            'create_post',
            'delete_post',
            'update_post',
            'publish_post',
            'view_post',
            'create_user',
            'delete_user',
            'update_user',
            'view_user',
            'banned_user',
        ];

        foreach ($permissions as $permission) { //se meten con un bucle
            Permission::create([
                'name' => $permission,
                'guard_name' => 'api' // Especifica que el guard es 'api', porque utilizamos rutas apiiii
            ]);
        }

        // Crear roles
        $adminRole = Role::create(['name' => 'admin']);
        $editorRole = Role::create(['name' => 'editor']);
        $readerRole = Role::create(['name' => 'reader']);
        $bannerRole = Role::create(['name' => 'banned']);

        // Asignar permisos a los roles
        $adminRole->givePermissionTo(['create_post','delete_post','update_post','publish_post','view_post','create_user','delete_user','update_user','view_user']);
        $editorRole->givePermissionTo(['create_post', 'update_post', 'publish_post', 'view_post']);
        $readerRole->givePermissionTo(['view_post']);
        $bannerRole->givePermissionTo(['banned_user']);

    }
}
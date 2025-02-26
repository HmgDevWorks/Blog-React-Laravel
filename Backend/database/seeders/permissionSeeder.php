<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class permissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'create post']);
        Permission::create(['name' => 'delete post']);
        Permission::create(['name' => 'update post']);
        Permission::create(['name' => 'publish post']);
        Permission::create(['name' => 'view post']);
        Permission::create(['name' => 'create user']);
        Permission::create(['name' => 'delete user']);        
        Permission::create(['name' => 'update user']);
        Permission::create(['name' => 'view user']);
    }
}

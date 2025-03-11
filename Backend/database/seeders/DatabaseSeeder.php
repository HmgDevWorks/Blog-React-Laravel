<?php

namespace Database\Seeders;

use App\Models\Categories;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(rolesSeeder::class);
       // $this->call(permissionSeeder::class);
        $this->call(userSeeder::class);
        $this->call(categoriesSeeder::class);
        $this->call(postSeeder::class);

    }
}

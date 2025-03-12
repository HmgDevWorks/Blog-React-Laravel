<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class userSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name_user' => 'Pepe',
            'email_user' => 'pepe@gmail.com',
            'password_user' => bcrypt('12345678'),
            'name_lastName' => 'Botas',
            'bio' => 'bifidus con fibra'
        ])->assignRole('admin');

        User::create([
            'name_user' => 'Manolo el del bombo',
            'email_user' => 'manolo@gmail.com',
            'password_user' => bcrypt('123456'),
            // 'name_lastName' => 'Botas',
            'bio' => 'viva el bombo'
        ])->assignRole('admin');
    }
}

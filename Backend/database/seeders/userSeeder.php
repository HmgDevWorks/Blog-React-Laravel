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
            'name_user' => 'PepeAdmin',
            'email_user' => 'pepeadmin@gmail.com',
            'email_verified_at' => now(), 
            'password_user' => bcrypt('12345678'),
            'name_lastName' => 'Botas',
            'bio' => 'bifidus con fibra'
        ])->assignRole('admin');

        User::create([
            'name_user' => 'Manolo el admin',
            'email_user' => 'manoloadmin@gmail.com',
            'email_verified_at' => now(), 
            'password_user' => bcrypt('123456'),
            'name_lastName' => 'Botas admin',
            'bio' => 'viva el bombo'
        ])->assignRole('admin');
        // User::create([
        //     'name_user' => 'Perchitas el del bombo',
        //     'email_user' => 'perchitas@gmail.com',
        //     'password_user' => bcrypt('1234567'),
        //     // 'name_lastName' => 'Botas',
        //     'bio' => 'viva el bombo'
        // ])->assignRole('reader');
        // User::create([
        //     'name_user' => 'baneado el del bombo',
        //     'email_user' => 'banned@gmail.com',
        //     'password_user' => bcrypt('1234567'),
        //     // 'name_lastName' => 'Botas',
        //     'bio' => 'viva el bombo'
        // ])->assignRole('banned');
    }
}

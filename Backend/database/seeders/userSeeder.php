<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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
            'password_user' => '123456',
            'name_lastName' => 'Botas',
            'bio' => 'bifidus con fibra'
        ])->assignRole(['admin']);
    }
}

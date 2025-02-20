<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;

class posts extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Post::create(['title' => 'deportes', 'description' => 'Categoría de deportes']);
    }
}

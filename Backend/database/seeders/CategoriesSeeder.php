<?php

namespace Database\Seeders;

use App\Models\Categories;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categories::create(['name' => 'deportes', 'description' => 'Categoría de deportes']);
        Categories::create(['name' => 'tecnología', 'description' => 'Categoría de tecnología']);
        Categories::create(['name' => 'cultura', 'description' => 'Categoría de cultura']);
        Categories::create(['name' => 'salud', 'description' => 'Categoría de salud']);
        Categories::create(['name' => 'educación', 'description' => 'Categoría de educación']);
        Categories::create(['name' => 'viajes', 'description' => 'Categoría de viajes']);
        Categories::create(['name' => 'gastronomía', 'description' => 'Categoría de gastronomía']);
        Categories::create(['name' => 'moda', 'description' => 'Categoría de moda']);
        Categories::create(['name' => 'finanzas', 'description' => 'Categoría de finanzas']);
        Categories::create(['name' => 'ciencia', 'description' => 'Categoría de ciencia']);
        Categories::create(['name' => 'arte', 'description' => 'Categoría de arte']);
        Categories::create(['name' => 'historia', 'description' => 'Categoría de historia']);
        Categories::create(['name' => 'literatura', 'description' => 'Categoría de literatura']);
    }
}

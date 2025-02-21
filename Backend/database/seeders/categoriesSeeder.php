<?php

namespace Database\Seeders;

use App\Models\Categories;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class categoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categories::create([
            'name' => 'Deportes',
            'description' => 'Noticias, análisis y tendencias sobre el mundo deportivo, desde fútbol hasta deportes extremos.'
        ]);

        Categories::create([
            'name' => 'Estética y Belleza',
            'description' => 'Consejos y novedades sobre cuidado personal, tendencias de moda, maquillaje y tratamientos de belleza.'
        ]);        
        Categories::create([
            'name' => 'Ciencia',
            'description' => 'Descubrimientos, investigaciones y avances científicos en diversas áreas como biología, física y tecnología.'
        ]);        
        Categories::create([
            'name' => 'Recetas',
            'description' => 'Ideas y guías para preparar deliciosos platos, desde cocina tradicional hasta opciones saludables y fáciles.'
        ]);        
        Categories::create([
            'name' => 'Salud y Bienestar',
            'description' => 'Artículos sobre hábitos saludables, prevención, nutrición y cuidado físico y mental.'
        ]);        
        Categories::create([
            'name' => 'Tecnología',
            'description' => 'Últimas innovaciones en gadgets, software, inteligencia artificial y tendencias tecnológicas.'
        ]);        
        Categories::create([
            'name' => 'Entretenimiento',
            'description' => 'Todo sobre películas, series, música, videojuegos y eventos culturales.'
        ]);
        Categories::create([
            'name' => 'Viajes',
            'description' => 'Guías, consejos y experiencias para explorar nuevos destinos y disfrutar de aventuras alrededor del mundo.'
        ]);
        Categories::create([
            'name' => 'Economía',
            'description' => 'Análisis de la situación económica global, tendencias del mercado y consejos financieros.'
        ]);
        Categories::create([
            'name' => 'Cultura',
            'description' => 'Reflexiones y artículos sobre arte, literatura, historia, filosofía y tradiciones culturales.'
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class postSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Post::create([
            'id_categories' => '1',
            'user_id' => '1',            
            'title' => 'Botas deportivas: Elige las mejores para ti',
            'content' => 'Las botas deportivas son esenciales para un buen rendimiento. Elige el modelo que mejor se ajuste a tus necesidades y estilo de vida.',
        ]);

        Post::create([
            'id_categories' => '7',
            'user_id' => '1',            
            'title' => 'El arte de la fotografía nocturna',
            'content' => 'La fotografía nocturna puede ser un desafío, pero con los ajustes adecuados y la paciencia, puedes capturar impresionantes vistas nocturnas.',
        ]);

        Post::create([
            'id_categories' => '5',
            'user_id' => '1',            
            'title' => 'Consejos para mejorar tu salud mental',
            'content' => 'La salud mental es fundamental para tu bienestar. Practica la meditación, haz ejercicio y duerme bien para mantener una mente sana.',
        ]);

        Post::create([
            'id_categories' => '1',
            'user_id' => '1',            
            'title' => 'Cómo roba el Real Madrid',
            'content' => 'En cada temporada, el Real Madrid sigue mostrando cómo manipulan los árbitros, consiguiendo decisiones a su favor, y creando polémica en cada partido. Aunque el equipo tiene una historia de éxito, hay quienes critican que muchas veces no ganan de manera justa.',
        ]);

    }
}

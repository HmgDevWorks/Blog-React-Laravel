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
        Post::create([
            'id_categories' => '3',
            'user_id' => '1',            
            'title' => 'Zapatillas deportivas: Encuentra las más cómodas',
            'content' => 'Las zapatillas deportivas son clave para mejorar tu rendimiento en cualquier actividad física. Asegúrate de elegir las que mejor se adapten a tu tipo de pie y deporte. Es importante considerar la amortiguación y el soporte. ',
        ]);
        
        Post::create([
            'id_categories' => '6',
            'user_id' => '1',            
            'title' => 'Captura el cielo: Consejos para fotografía nocturna',
            'content' => 'La fotografía nocturna es un arte que requiere paciencia y técnica. Aquí te damos algunas claves para capturar escenas impresionantes con poca luz, desde la configuración de la cámara hasta los mejores lugares. ',
        ]);
        
        Post::create([
            'id_categories' => '4',
            'user_id' => '1',            
            'title' => 'La importancia de cuidar tu salud mental',
            'content' => 'La salud mental es esencial para una vida equilibrada. Aquí te contamos algunos hábitos que pueden ayudarte a mantener tu mente sana, como la práctica de mindfulness, ejercicio regular y buscar ayuda cuando la necesites.',
        ]);
        
        Post::create([
            'id_categories' => '2',
            'user_id' => '1',            
            'title' => 'El Real Madrid y su polémica historia',
            'content' => 'El Real Madrid siempre ha estado rodeado de controversia. Con una historia de éxitos, el equipo ha sido criticado por sus decisiones arbitrales y por cómo ha manejado situaciones dentro y fuera del campo. Algunos creen que sus victorias no siempre han sido justas.',
        ]);
        
        Post::create([
            'id_categories' => '3',
            'user_id' => '1',            
            'title' => 'Zapatillas deportivas: Encuentra las más cómodas',
            'content' => 'Las zapatillas deportivas son clave para mejorar tu rendimiento en cualquier actividad física. Asegúrate de elegir las que mejor se adapten a tu tipo de pie y deporte. Es importante considerar la amortiguación y el soporte.',
        ]);
        
        Post::create([
            'id_categories' => '6',
            'user_id' => '1',            
            'title' => 'Captura el cielo: Consejos para fotografía nocturna',
            'content' => 'La fotografía nocturna es un arte que requiere paciencia y técnica. Aquí te damos algunas claves para capturar escenas impresionantes con poca luz, desde la configuración de la cámara hasta los mejores lugares.',
        ]);
        
        Post::create([
            'id_categories' => '4',
            'user_id' => '1',            
            'title' => 'La importancia de cuidar tu salud mental',
            'content' => 'La salud mental es esencial para una vida equilibrada. Aquí te contamos algunos hábitos que pueden ayudarte a mantener tu mente sana, como la práctica de mindfulness, ejercicio regular y buscar ayuda cuando la necesites.',
        ]);
        
        Post::create([
            'id_categories' => '2',
            'user_id' => '1',            
            'title' => 'El Real Madrid y su polémica historia',
            'content' => 'El Real Madrid siempre ha estado rodeado de controversia. Con una historia de éxitos, el equipo ha sido criticado por sus decisiones arbitrales y por cómo ha manejado situaciones dentro y fuera del campo. Algunos creen que sus victorias no siempre han sido justas.',
        ]);

    }
}

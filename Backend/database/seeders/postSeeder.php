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
            'status' => 'published'
        ]);

        Post::create([
            'id_categories' => '7',
            'user_id' => '1',
            'title' => 'El arte de la fotografía nocturna',
            'content' => 'La fotografía nocturna puede ser un desafío, pero con los ajustes adecuados y la paciencia, puedes capturar impresionantes vistas nocturnas.',
            'status' => 'published'
        ]);

        Post::create([
            'id_categories' => '5',
            'user_id' => '1',
            'title' => 'Consejos para mejorar tu salud mental',
            'content' => 'La salud mental es fundamental para tu bienestar. Practica la meditación, haz ejercicio y duerme bien para mantener una mente sana.',
            'status' => 'published'
        ]);

        Post::create([
            'id_categories' => '1',
            'user_id' => '1',
            'title' => 'Cómo roba el Real Madrid',
            'content' => 'En cada temporada, el Real Madrid sigue mostrando cómo manipulan los árbitros, consiguiendo decisiones a su favor, y creando polémica en cada partido. Aunque el equipo tiene una historia de éxito, hay quienes critican que muchas veces no ganan de manera justa.',
            'status' => 'published'
        ]);
        Post::create([
            'id_categories' => '3',
            'user_id' => '1',
            'title' => 'Zapatillas deportivas: Encuentra las más cómodas',
            'content' => 'Las zapatillas deportivas son clave para mejorar tu rendimiento en cualquier actividad física. Asegúrate de elegir las que mejor se adapten a tu tipo de pie y deporte. Es importante considerar la amortiguación y el soporte. ',
            'status' => 'published'
        ]);

        Post::create([
            'id_categories' => '6',
            'user_id' => '1',
            'title' => 'Captura el cielo: Consejos para fotografía nocturna',
            'content' => 'La fotografía nocturna es un arte que requiere paciencia y técnica. Aquí te damos algunas claves para capturar escenas impresionantes con poca luz, desde la configuración de la cámara hasta los mejores lugares. ',
            'status' => 'published'
        ]);

        Post::create([
            'id_categories' => '4',
            'user_id' => '1',
            'title' => 'La importancia de cuidar tu salud mental',
            'content' => 'La salud mental es esencial para una vida equilibrada. Aquí te contamos algunos hábitos que pueden ayudarte a mantener tu mente sana, como la práctica de mindfulness, ejercicio regular y buscar ayuda cuando la necesites.',
            'status' => 'published'
        ]);

        Post::create([
            'id_categories' => '2',
            'user_id' => '1',
            'title' => 'El Real Madrid y su polémica historia',
            'content' => 'El Real Madrid siempre ha estado rodeado de controversia. Con una historia de éxitos, el equipo ha sido criticado por sus decisiones arbitrales y por cómo ha manejado situaciones dentro y fuera del campo. Algunos creen que sus victorias no siempre han sido justas.',
            'status' => 'published'
        ]);

        Post::create([
            'id_categories' => '3',
            'user_id' => '1',
            'title' => 'Zapatillas deportivas: Encuentra las más cómodas',
            'content' => 'Las zapatillas deportivas son clave para mejorar tu rendimiento en cualquier actividad física. Asegúrate de elegir las que mejor se adapten a tu tipo de pie y deporte. Es importante considerar la amortiguación y el soporte.',
            'status' => 'published'
        ]);

        Post::create([
            'id_categories' => '6',
            'user_id' => '1',
            'title' => 'Captura el cielo: Consejos para fotografía nocturna',
            'content' => 'La fotografía nocturna es un arte que requiere paciencia y técnica. Aquí te damos algunas claves para capturar escenas impresionantes con poca luz, desde la configuración de la cámara hasta los mejores lugares.',
            'status' => 'published'
        ]);

        Post::create([
            'id_categories' => '4',
            'user_id' => '1',
            'title' => 'La importancia de cuidar tu salud mental',
            'content' => 'La salud mental es esencial para una vida equilibrada. Aquí te contamos algunos hábitos que pueden ayudarte a mantener tu mente sana, como la práctica de mindfulness, ejercicio regular y buscar ayuda cuando la necesites.',
            'status' => 'published'
        ]);

        Post::create([
            'id_categories' => '2',
            'user_id' => '1',
            'title' => 'El Real Madrid y su polémica historia',
            'content' => 'El Real Madrid siempre ha estado rodeado de controversia. Con una historia de éxitos, el equipo ha sido criticado por sus decisiones arbitrales y por cómo ha manejado situaciones dentro y fuera del campo. Algunos creen que sus victorias no siempre han sido justas.',

            'status' => 'published'
        ]);

        Post::create([
            'id_categories' => '2',
            'user_id' => '1',
            'title' => 'La rivalidad entre Barcelona y Real Madrid',
            'content' => 'La rivalidad entre el Barcelona y el Real Madrid es una de las más intensas en el fútbol mundial. La pasión que despierta este enfrentamiento es incomparable, con una historia que ha marcado el rumbo del deporte en España.',

        ]);

        Post::create([
            'id_categories' => '2',
            'user_id' => '1',
            'title' => 'La importancia de la cantera en el fútbol',
            'content' => 'La cantera es esencial para el futuro de muchos equipos de fútbol. Formar jóvenes talentos desde temprana edad permite a los clubes no solo obtener jugadores de calidad, sino también asegurar un legado duradero.',

        ]);

        Post::create([
            'id_categories' => '2',
            'user_id' => '1',
            'title' => 'La revolución táctica de Guardiola',
            'content' => 'La influencia de Pep Guardiola en el fútbol moderno es indiscutible. Su forma de jugar, basada en el control del balón y la presión alta, ha marcado una nueva era en la historia del deporte.',

        ]);

        Post::create([
            'id_categories' => '2',
            'user_id' => '1',
            'title' => 'La influencia de Messi en el Barcelona',
            'content' => 'La llegada de Lionel Messi al Barcelona transformó al club de una manera única. Con su magia en el campo, logró consolidarse como el mejor jugador de la historia del club, llevando al equipo a éxitos internacionales.',

        ]);

        Post::create([
            'id_categories' => '2',
            'user_id' => '1',
            'title' => 'La importancia de la psicología en el deporte',
            'content' => 'La psicología juega un papel fundamental en el rendimiento de los atletas. Desde manejar la presión hasta superar las adversidades, la mente es una herramienta crucial para lograr el éxito en el deporte.',
        ]);

        Post::create([
            'id_categories' => '2',
            'user_id' => '1',
            'title' => 'La evolución de los estadios modernos',
            'content' => 'Los estadios de fútbol han pasado de ser simples lugares de encuentro a impresionantes colosos arquitectónicos. Con mejoras en la infraestructura, comodidad y tecnología, se busca ofrecer la mejor experiencia al espectador.',
        ]);

        Post::create([
            'id_categories' => '2',
            'user_id' => '1',
            'title' => 'La historia de la Copa del Mundo',
            'content' => 'La Copa del Mundo es el torneo de fútbol más prestigioso a nivel internacional. Cada edición ha dejado momentos inolvidables, con selecciones de todo el mundo luchando por la gloria mundial.',
        ]);

        Post::create([
            'id_categories' => '2',
            'user_id' => '1',
            'title' => 'La recuperación física de los futbolistas',
            'content' => 'La recuperación es esencial para los futbolistas, especialmente después de lesiones o partidos intensos. Con el avance de la medicina deportiva, los jugadores ahora tienen mejores herramientas para recuperarse más rápido y con menos riesgos.',
        ]);

        Post::create([
            'id_categories' => '2',
            'user_id' => '1',
            'title' => 'La recuperación física de los futbolistas que no toman anabolizantes',
            'content' => 'La recuperación es esencial para los futbolistas, especialmente después de lesiones o partidos intensos. Con el avance de la medicina deportiva, los jugadores ahora tienen mejores herramientas para recuperarse más rápido y con menos riesgos. Este es el mejor post que hemos subido.',
        ]);
        Post::create([
            'id_categories' => '2',
            'user_id' => '1',
            'title' => 'La recuperación física de los futbolistas que no toman anabolizantes',
            'content' => 'La recuperación es esencial para los futbolistas, especialmente después de lesiones o partidos intensos. Con el avance de la medicina deportiva, los jugadores ahora tienen mejores herramientas para recuperarse más rápido y con menos riesgos. Este es el mejor post que hemos subido.',
        ]);
        Post::create([
            'id_categories' => '2',
            'user_id' => '1',
            'title' => 'La recuperación física de los futbolistas que no toman anabolizantes',
            'content' => 'La recuperación es esencial para los futbolistas, especialmente después de lesiones o partidos intensos. Con el avance de la medicina deportiva, los jugadores ahora tienen mejores herramientas para recuperarse más rápido y con menos riesgos. Este es el mejor post que hemos subido.',
        ]);
        Post::create([
            'id_categories' => '2',
            'user_id' => '1',
            'title' => 'La recuperación física de los futbolistas que no toman anabolizantes',
            'content' => 'La recuperación es esencial para los futbolistas, especialmente después de lesiones o partidos intensos. Con el avance de la medicina deportiva, los jugadores ahora tienen mejores herramientas para recuperarse más rápido y con menos riesgos. Este es el mejor post que hemos subido.',
        ]);
        Post::create([
            'id_categories' => '2',
            'user_id' => '1',
            'title' => 'La recuperación física de los futbolistas que no toman anabolizantes',
            'content' => 'La recuperación es esencial para los futbolistas, especialmente después de lesiones o partidos intensos. Con el avance de la medicina deportiva, los jugadores ahora tienen mejores herramientas para recuperarse más rápido y con menos riesgos. Este es el mejor post que hemos subido.',
        ]);
        Post::create([
            'id_categories' => '2',
            'user_id' => '1',
            'title' => 'La recuperación física de los futbolistas que no toman anabolizantes',
            'content' => 'La recuperación es esencial para los futbolistas, especialmente después de lesiones o partidos intensos. Con el avance de la medicina deportiva, los jugadores ahora tienen mejores herramientas para recuperarse más rápido y con menos riesgos. Este es el mejor post que hemos subido.',
        ]);
        Post::create([
            'id_categories' => '2',
            'user_id' => '1',
            'title' => 'La recuperación física de los futbolistas que no toman anabolizantes',
            'content' => 'La recuperación es esencial para los futbolistas, especialmente después de lesiones o partidos intensos. Con el avance de la medicina deportiva, los jugadores ahora tienen mejores herramientas para recuperarse más rápido y con menos riesgos. Este es el mejor post que hemos subido.',
        ]);


    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as FakerFactory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = FakerFactory::create('es_ES');
        $statusProbability = $faker->randomFloat(null, 0, 1);

            if ($statusProbability < 0.6) { // 60% probabilidad
                $status = 'published';
            } elseif ($statusProbability < 0.9) { // 30% probabilidad (0.9 - 0.6)
                $status = 'draft';
            } else { // 10% probabilidad (1.0 - 0.9)
                $status = 'deleted';
            }

        $titles = require database_path('factories\post_titles.php');
        $contents = require database_path('factories\post_content.php');
        
        $id_categories = $faker->numberBetween(1, 10); // coge un id de una categoria y va rellenado de los arrays creados en posttiles y postcontent
        $title = $faker->randomElement($titles[$id_categories]); 
        $content = $contents[$id_categories];
        $contentFormatted = $this->formatContent($content);

        return [
            'id_categories' => $id_categories,
            'user_id' => null, // se asignará después
            'title' => $title,  // entre 50 60 caracs
            'content' => $contentFormatted, 
            'status' => $status,
            'views' => in_array($status, ['published', 'deleted']) ? $faker->numberBetween(0, 200) : 0, // asigna vistas a published y deleted
            'created_at' => $faker->dateTimeBetween('2024-01-01', 'now')->format('Y-m-d H:i:s'), // genera fecha aleatoria desde enero de 2024 hasta la fecha actual
        ];
    }

    private function formatContent($content)
    {
        $editorId = $this->faker->uuid();  // generar un UUID dinámico para el atributo data-editor-id
    
        $contentFormatted = "<body id='yoopta-clipboard' data-editor-id='$editorId'>";    // añade etiquetas HTML básicas como <body> con el atributo data-editor-id
    
        if (strpos($content, '<body') === false) { //si el contenido ya tiene etiquetas HTML, lo dejamos tal cual.
            $contentFormatted .= "<p>" . nl2br(e($content)) . "</p>"; // convertir saltos de línea a <p> y agregarlo al contenido
        } else {
            $contentFormatted .= $content;  // si ya tiene formato, no tocamos nada
        }
    
        $contentFormatted .= "</body>"; // finalizamos la estructura
        return $contentFormatted;
    }
}


// 'title' => $faker->realText(rand(50,65)),  // entre 50 60 caracs para generar texto random en español con algo de sentido y utilizando el php faker
//             'content' => json_encode([
//                 'type' => 'yoopta',
//                 'content' => fake()->paragraph(rand(5, 7), true) . "\n\n" .
//                             fake()->paragraph(rand(5, 7), true) . "\n\n" .
//                             fake()->paragraph(rand(5, 7), true) . "\n\n" .
//                             fake()->paragraph(rand(5, 7), true) . "\n\n" .
//                             fake()->paragraph(rand(5, 7), true) // genera 5 parrafos largos
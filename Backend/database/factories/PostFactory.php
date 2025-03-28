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
        $status = $faker->randomElement(['published', 'draft', 'deleted'], [60, 30, 10]);

        return [
            'id_categories' => $faker->numberBetween(1, 10),
            'user_id' => null, // Se asignará después
            'title' => $faker->realText(rand(50,65)),  // Definir longitud del texto
            'content' => json_encode([
                'type' => 'yoopta',
                'content' => fake()->paragraph(rand(5, 7), true) . "\n\n" .
                            fake()->paragraph(rand(5, 7), true) . "\n\n" .
                            fake()->paragraph(rand(5, 7), true) . "\n\n" .
                            fake()->paragraph(rand(5, 7), true) . "\n\n" .
                            fake()->paragraph(rand(5, 7), true) // Genera 5 párrafos largos
            ]), // Genera solo un párrafo
            'status' => $status,
            'views' => in_array($status, ['published', 'deleted']) ? $faker->numberBetween(0, 200) : 0, // Asigna vistas a published y deleted
            'created_at' => $faker->dateTimeBetween('2024-01-01', 'now')->format('Y-m-d H:i:s'), // Genera fecha aleatoria desde enero de 2024 hasta la fecha actual
        ];
    }
}

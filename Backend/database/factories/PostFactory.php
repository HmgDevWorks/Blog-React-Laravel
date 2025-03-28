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
            'content' => json_encode(['type' => 'yoopta', 'content' => fake()->paragraph(3)]), // Genera solo un párrafo
            'status' => $status,
            'views' => in_array($status, ['published', 'deleted']) ? $faker->numberBetween(0, 200) : 0, // Asigna vistas a published y deleted
        ];
    }
}

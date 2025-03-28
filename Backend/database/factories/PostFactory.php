<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

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
        $status = fake()->randomElement(['published', 'draft', 'deleted'], [60, 30, 10]);

        return [
            'id_categories' => fake()->numberBetween(1, 10),
            'user_id' => null, // Se asignará después
            'title' => fake()->sentence(6),
            'content' => json_encode(['type' => 'yoopta', 'content' => fake()->realText(200)]),
            'status' => $status,
            'views' => in_array($status, ['published', 'deleted']) ? fake()->numberBetween(0, 200) : 0, // Asigna vistas a published y deleted
        ];
    }
}

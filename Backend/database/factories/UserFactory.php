<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name_user' => fake()->name(),
            'email_user' => function (array $attributes) {
                $nameParts = explode(' ', $attributes['name_user']); // Divide el nombre en partes
                $firstName = strtolower($nameParts[0] ?? ''); // Toma el primer nombre
                $lastName = strtolower($nameParts[1] ?? ''); // Toma el primer apellido (si existe)
                return $firstName . $lastName . rand(59, 100) . '@example.com';
            },
            'password_user' => static::$password ??= Hash::make('password'),
            'bio' => $this->faker->realText(rand(20,40)),
            'remember_token' => Str::random(10),
            'email_verified_at' => now(), 
            'img_user' => 'avatars/default.png',
            'created_at' => fake()->dateTimeBetween('2024-01-01', 'now')->format('Y-m-d H:i:s'),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}

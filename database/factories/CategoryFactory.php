<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $colors = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#06B6D4', '#EF4444', '#F97316', '#14B8A6'];

        return [
            'user_id' => User::factory(),
            'name' => $this->faker->word(),
            'color' => $this->faker->randomElement($colors),
            'icon' => null,
        ];
    }
}

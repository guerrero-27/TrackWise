<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Income>
 */
class IncomeFactory extends Factory
{
    public function definition(): array
    {
        $user = User::factory();

        return [
            'user_id' => $user,
            'title' => $this->faker->sentence(3),
            'amount' => $this->faker->randomFloat(2, 100, 5000),
            'income_date' => $this->faker->dateTimeThisYear(),
            'source' => $this->faker->randomElement(['Salary', 'Side Hustle', 'Investment', 'Gift']),
            'description' => $this->faker->optional(0.5)->sentence(),
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::factory();

        return [
            'user_id' => $user,
            'category_id' => Category::factory(['user_id' => $user]),
            'title' => $this->faker->sentence(3),
            'amount' => $this->faker->randomFloat(2, 5, 500),
            'expense_date' => $this->faker->dateTimeThisMonth(),
            'due_date' => $this->faker->optional(0.7)->dateTimeBetween('-1 month', '+1 month'),
            'paid' => $this->faker->boolean(30),
            'description' => $this->faker->optional(0.5)->sentence(),
        ];
    }
}

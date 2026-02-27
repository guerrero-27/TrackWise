<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Expense;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a test user
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);

        // Create default categories
        $categories = [
            ['name' => 'Groceries', 'color' => '#10B981'],
            ['name' => 'Utilities', 'color' => '#F59E0B'],
            ['name' => 'Transportation', 'color' => '#3B82F6'],
            ['name' => 'Entertainment', 'color' => '#EC4899'],
            ['name' => 'Healthcare', 'color' => '#EF4444'],
            ['name' => 'Dining Out', 'color' => '#F97316'],
            ['name' => 'Shopping', 'color' => '#8B5CF6'],
            ['name' => 'Subscriptions', 'color' => '#06B6D4'],
        ];

        $categoryModels = [];
        foreach ($categories as $category) {
            $categoryModels[] = $user->categories()->create($category);
        }

        // Create sample expenses
        $expense_titles = [
            'Weekly groceries',
            'Gas station fill-up',
            'Movie tickets',
            'Restaurant dinner',
            'Electricity bill',
            'Internet bill',
            'Phone bill',
            'Coffee shop',
            'Pharmacy purchase',
            'Netflix subscription',
            'Gym membership',
            'Car maintenance',
            'New shoes',
            'Coffee maker',
            'Office supplies',
            'Parking fee',
            'Haircut',
            'Book purchase',
            'Pizza delivery',
            'Water bill',
        ];

        collect($expense_titles)
            ->each(function ($title, $index) use ($user, $categoryModels) {
                $user->expenses()->create([
                    'title' => $title,
                    'amount' => rand(10, 500) + (rand(0, 99) / 100),
                    'category_id' => $categoryModels[array_rand($categoryModels)]->id,
                    'expense_date' => now()->subDays(rand(0, 30)),
                    'due_date' => rand(0, 1) ? now()->addDays(rand(-5, 7)) : null,
                    'paid' => rand(0, 1) ? true : false,
                    'description' => 'Sample expense for demonstration',
                ]);
            });

        // Create additional random expenses for better data visualization
        for ($i = 0; $i < 30; $i++) {
            $user->expenses()->create([
                'title' => fake()->sentence(3),
                'amount' => rand(5, 1000) + (rand(0, 99) / 100),
                'category_id' => $categoryModels[array_rand($categoryModels)]->id,
                'expense_date' => now()->subMonths(rand(0, 11))->subDays(rand(0, 28)),
                'due_date' => rand(0, 1) ? now()->addDays(rand(-10, 10)) : null,
                'paid' => rand(0, 1) ? true : false,
                'description' => fake()->optional(0.5)->sentence(),
            ]);
        }
    }
}

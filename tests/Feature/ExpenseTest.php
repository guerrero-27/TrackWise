<?php

use App\Models\Expense;
use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
    // create a category belonging to the user
    $this->category = Category::factory(['user_id' => $this->user])->create();
});

it('can create an expense including due date and paid flag', function () {
    $response = $this->post(route('expenses.store'), [
        'title' => 'Test bill',
        'amount' => 123.45,
        'category_id' => $this->category->id,
        'expense_date' => now()->toDateString(),
        'due_date' => now()->addWeek()->toDateString(),
        'paid' => true,
        'description' => 'a test description',
    ]);

    $response->assertRedirect(route('expenses.index'));

    $this->assertDatabaseHas('expenses', [
        'title' => 'Test bill',
        'paid' => true,
        'due_date' => now()->addWeek()->toDateString(),
    ]);
});

it('can update an existing expense and toggle paid status', function () {
    $expense = Expense::factory([
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'paid' => false,
    ])->create();

    $response = $this->patch(route('expenses.update', $expense), [
        'title' => 'Updated title',
        'amount' => 99.99,
        'category_id' => $this->category->id,
        'expense_date' => now()->subDay()->toDateString(),
        'due_date' => now()->addDays(2)->toDateString(),
        'paid' => 1,
    ]);

    $response->assertRedirect(route('expenses.index'));

    $this->assertDatabaseHas('expenses', [
        'id' => $expense->id,
        'title' => 'Updated title',
        'paid' => true,
    ]);
});

it('toggle-paid endpoint flips the boolean', function () {
    $expense = Expense::factory([
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'paid' => false,
    ])->create();

    $response = $this->post(route('expenses.togglePaid', $expense));
    $response->assertRedirect();
    $this->assertTrue($expense->fresh()->paid);

    // hit again
    $this->post(route('expenses.togglePaid', $expense));
    $this->assertFalse($expense->fresh()->paid);
});

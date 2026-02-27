<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ExpenseController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('/api/dashboard-stats', [ExpenseController::class, 'getDashboardStats'])->name('api.dashboard-stats');

    // Expense routes
    Route::resource('expenses', ExpenseController::class);

    // Income routes
    Route::resource('incomes', \App\Http\Controllers\IncomeController::class);

    // ability to toggle paid/unpaid without refreshing all fields
    Route::post('/expenses/{expense}/toggle-paid', [ExpenseController::class, 'togglePaid'])->name('expenses.togglePaid');

    // Category routes
    Route::resource('categories', CategoryController::class)->only(['index', 'store', 'update', 'destroy']);
});

require __DIR__.'/settings.php';

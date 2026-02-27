<?php

namespace App\Policies;

use App\Models\Income;
use App\Models\User;

class IncomePolicy
{
    public function viewAny(User $user): bool
    {
        // any authenticated user can view their own incomes
        return (bool) $user;
    }

    public function view(User $user, Income $income): bool
    {
        return $user->id === $income->user_id;
    }

    public function create(User $user): bool
    {
        return (bool) $user;
    }

    public function update(User $user, Income $income): bool
    {
        return $user->id === $income->user_id;
    }

    public function delete(User $user, Income $income): bool
    {
        return $user->id === $income->user_id;
    }
}

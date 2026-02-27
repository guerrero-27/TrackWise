<?php

namespace App\Services;

use App\Models\User;
use Carbon\Carbon;

class FinanceService
{
    /**
     * Compute dashboard-related finance metrics for a user.
     * Returns keys: totalIncomeThisMonth, totalIncomeThisYear, monthlyData (array),
     * netThisMonth, netThisYear, savingsRateThisMonth, savingsRateThisYear, incomeSources
     */
    public function getDashboardMetrics(User $user, ?Carbon $now = null): array
    {
        $now = $now ?: Carbon::now();
        $currentMonth = $now->copy()->startOfMonth();
        $currentYear = $now->copy()->startOfYear();

        $totalIncomeThisMonth = (float) $user->incomes()
            ->whereDate('income_date', '>=', $currentMonth)
            ->sum('amount');

        $totalIncomeThisYear = (float) $user->incomes()
            ->whereDate('income_date', '>=', $currentYear)
            ->sum('amount');

        // Monthly data for last 12 months (income + expense)
        $monthlyData = [];
        for ($i = 11; $i >= 0; $i--) {
            $month = $now->copy()->subMonths($i);
            $monthKey = $month->format('M Y');

            $expenseAmount = (float) $user->expenses()
                ->whereMonth('expense_date', $month->month)
                ->whereYear('expense_date', $month->year)
                ->sum('amount');

            $incomeAmount = (float) $user->incomes()
                ->whereMonth('income_date', $month->month)
                ->whereYear('income_date', $month->year)
                ->sum('amount');

            $monthlyData[] = [
                'month' => $monthKey,
                'expense' => $expenseAmount,
                'income' => $incomeAmount,
            ];
        }

        $netThisMonth = $totalIncomeThisMonth - (float) $user->expenses()
            ->whereDate('expense_date', '>=', $currentMonth)
            ->sum('amount');

        $netThisYear = $totalIncomeThisYear - (float) $user->expenses()
            ->whereDate('expense_date', '>=', $currentYear)
            ->sum('amount');

        $savingsRateThisMonth = $totalIncomeThisMonth > 0 ? ($netThisMonth / $totalIncomeThisMonth) * 100 : null;
        $savingsRateThisYear = $totalIncomeThisYear > 0 ? ($netThisYear / $totalIncomeThisYear) * 100 : null;

        $incomeSources = $user->incomes()
            ->whereDate('income_date', '>=', $currentMonth)
            ->get()
            ->groupBy('source')
            ->map(function ($incomes, $source) {
                return [
                    'source' => $source ?: 'Other',
                    'amount' => $incomes->sum('amount'),
                ];
            })
            ->values();

        return [
            'totalIncomeThisMonth' => $totalIncomeThisMonth,
            'totalIncomeThisYear' => $totalIncomeThisYear,
            'monthlyData' => $monthlyData,
            'netThisMonth' => $netThisMonth,
            'netThisYear' => $netThisYear,
            'savingsRateThisMonth' => $savingsRateThisMonth !== null ? round($savingsRateThisMonth, 2) : null,
            'savingsRateThisYear' => $savingsRateThisYear !== null ? round($savingsRateThisYear, 2) : null,
            'incomeSources' => $incomeSources,
        ];
    }
}

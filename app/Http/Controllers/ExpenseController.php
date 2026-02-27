<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Services\FinanceService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExpenseController extends Controller
{
    private FinanceService $financeService;

    public function __construct(FinanceService $financeService)
    {
        $this->financeService = $financeService;
    }
    /**
     * Display a listing of the user's expenses.
     */
    public function index(Request $request): Response
    {
        $query = auth()->user()->expenses()->with('category');

        // Filter by date range on expense_date
        if ($request->has('start_date') && $request->start_date) {
            $query->whereDate('expense_date', '>=', $request->start_date);
        }

        if ($request->has('end_date') && $request->end_date) {
            $query->whereDate('expense_date', '<=', $request->end_date);
        }

        // Filter by due date range (new)
        if ($request->has('due_start') && $request->due_start) {
            $query->whereDate('due_date', '>=', $request->due_start);
        }
        if ($request->has('due_end') && $request->due_end) {
            $query->whereDate('due_date', '<=', $request->due_end);
        }

        // Filter by category
        if ($request->has('category_id') && $request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        // Sort
        $sortBy = $request->get('sort_by', 'expense_date');
        $sortOrder = $request->get('sort_order', 'desc');

        if ($sortBy === 'amount') {
            $query->orderBy('amount', $sortOrder);
        } elseif ($sortBy === 'title') {
            $query->orderBy('title', $sortOrder);
        } else {
            $query->orderBy('expense_date', $sortOrder);
        }

        $expenses = $query->paginate(15)->appends($request->query());
        $categories = auth()->user()->categories()->pluck('name', 'id');

        return Inertia::render('Expenses/Index', [
            'expenses' => $expenses,
            'categories' => $categories,
            'filters' => [
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'due_start' => $request->due_start,
                'due_end' => $request->due_end,
                'category_id' => $request->category_id,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
        ]);
    }

    /**
     * Show the form for creating a new expense.
     */
    public function create(): Response
    {
        $categories = auth()->user()->categories()->get();

        return Inertia::render('Expenses/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created expense in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01|max:999999.99',
            'category_id' => 'required|exists:categories,id',
            'expense_date' => 'required|date',
            'description' => 'nullable|string|max:1000',
            // new fields
            'due_date' => 'nullable|date|after_or_equal:expense_date',
            'paid' => 'sometimes|boolean',
        ]);

        // Ensure category belongs to authenticated user
        auth()->user()->categories()->findOrFail($validated['category_id']);

        // default paid to false if not provided
        if (! array_key_exists('paid', $validated)) {
            $validated['paid'] = false;
        }

        auth()->user()->expenses()->create($validated);

        return redirect()->route('expenses.index')->with('success', 'Expense created successfully.');
    }

    /**
     * Show the form for editing the specified expense.
     */
    public function edit(Expense $expense): Response
    {
        $this->authorize('update', $expense);

        $categories = auth()->user()->categories()->get();

        return Inertia::render('Expenses/Edit', [
            'expense' => $expense->load('category'),
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified expense in storage.
     */
    public function update(Request $request, Expense $expense)
    {
        $this->authorize('update', $expense);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01|max:999999.99',
            'category_id' => 'required|exists:categories,id',
            'expense_date' => 'required|date',
            'description' => 'nullable|string|max:1000',
            // support modifying due date / paid status
            'due_date' => 'nullable|date|after_or_equal:expense_date',
            'paid' => 'sometimes|boolean',
        ]);

        // Verify category belongs to user
        auth()->user()->categories()->findOrFail($validated['category_id']);

        $expense->update($validated);

        return redirect()->route('expenses.index')->with('success', 'Expense updated successfully.');
    }

    /**
     * Toggle the paid state for an expense.
     */
    public function togglePaid(Expense $expense)
    {
        $this->authorize('update', $expense);

        $expense->update(['paid' => ! $expense->paid]);

        // when toggling from Inertia pages we simply redirect back so the front
        // end can refresh its data.
        return redirect()->back();
    }

    /**
     * Remove the specified expense from storage.
     */
    public function destroy(Expense $expense)
    {
        $this->authorize('delete', $expense);

        $expense->delete();

        return redirect()->back()->with('success', 'Expense deleted successfully.');
    }

    /**
     * Get dashboard statistics for the authenticated user.
     */
    public function getDashboardStats()
    {
        $now = Carbon::now();
        $currentMonth = $now->copy()->startOfMonth();
        $currentYear = $now->copy()->startOfYear();

        $user = auth()->user();

        // Total expenses this month/year
        $totalThisMonth = (float) $user->expenses()
            ->whereDate('expense_date', '>=', $currentMonth)
            ->sum('amount');

        $totalThisYear = (float) $user->expenses()
            ->whereDate('expense_date', '>=', $currentYear)
            ->sum('amount');

        // Use FinanceService to compute incomes, monthly data, net and savings
        $metrics = $this->financeService->getDashboardMetrics($user, $now);

        $totalIncomeThisMonth = $metrics['totalIncomeThisMonth'];
        $totalIncomeThisYear = $metrics['totalIncomeThisYear'];

        // Category breakdown
        $categoryBreakdown = $user->expenses()
            ->whereDate('expense_date', '>=', $currentMonth)
            ->with('category')
            ->get()
            ->groupBy('category.name')
            ->map(function ($expenses) {
                return [
                    'name' => $expenses[0]->category->name,
                    'amount' => $expenses->sum('amount'),
                    'color' => $expenses[0]->category->color,
                ];
            })
            ->values();

        // Recent transactions (expenses) and recent incomes
        $recentTransactions = $user->expenses()
            ->with('category')
            ->orderBy('expense_date', 'desc')
            ->take(5)
            ->get();

        $recentIncomes = $user->incomes()
            ->orderBy('income_date', 'desc')
            ->take(5)
            ->get();

        // unpaid/overdue summaries
        $unpaidThisMonth = $user->expenses()
            ->where('paid', false)
            ->whereDate('expense_date', '>=', $currentMonth)
            ->sum('amount');

        $overdueTotal = $user->expenses()
            ->where('paid', false)
            ->whereNotNull('due_date')
            ->whereDate('due_date', '<', $now)
            ->sum('amount');

        // monthlyData, net and income sources come from FinanceService
        $monthlyData = $metrics['monthlyData'];
        $netThisMonth = $metrics['netThisMonth'];
        $netThisYear = $metrics['netThisYear'];
        $savingsRateThisMonth = $metrics['savingsRateThisMonth'];
        $savingsRateThisYear = $metrics['savingsRateThisYear'];
        $incomeSources = $metrics['incomeSources'];

        return response()->json([
            'totalThisMonth' => (float) $totalThisMonth,
            'totalIncomeThisMonth' => (float) $totalIncomeThisMonth,
            'netThisMonth' => (float) $netThisMonth,
            'savingsRateThisMonth' => $savingsRateThisMonth !== null ? round($savingsRateThisMonth, 2) : null,
            'totalThisYear' => (float) $totalThisYear,
            'totalIncomeThisYear' => (float) $totalIncomeThisYear,
            'netThisYear' => (float) $netThisYear,
            'savingsRateThisYear' => $savingsRateThisYear !== null ? round($savingsRateThisYear, 2) : null,
            'unpaidThisMonth' => (float) $unpaidThisMonth,
            'overdueTotal' => (float) $overdueTotal,
            'categoryBreakdown' => $categoryBreakdown,
            'recentTransactions' => $recentTransactions,
            'recentIncomes' => $recentIncomes,
            'incomeSources' => $incomeSources,
            'monthlyData' => $monthlyData,
        ]);
    }
}

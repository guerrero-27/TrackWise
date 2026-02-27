<?php

namespace App\Http\Controllers;

use App\Models\Income;
use App\Http\Resources\IncomeResource;
use App\Http\Requests\StoreIncomeRequest;
use App\Http\Requests\UpdateIncomeRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class IncomeController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Income::class, 'income');
    }

    public function index(Request $request): Response
    {
        $query = auth()->user()->incomes();

        if ($request->has('start_date') && $request->start_date) {
            $query->whereDate('income_date', '>=', $request->start_date);
        }
        if ($request->has('end_date') && $request->end_date) {
            $query->whereDate('income_date', '<=', $request->end_date);
        }

        $sortBy = $request->get('sort_by', 'income_date');
        $sortOrder = $request->get('sort_order', 'desc');

        if ($sortBy === 'amount') {
            $query->orderBy('amount', $sortOrder);
        } else {
            $query->orderBy('income_date', $sortOrder);
        }

        $incomes = $query->paginate(15)->appends($request->query());

        if ($request->wantsJson()) {
            return IncomeResource::collection($incomes)->response();
        }

        return Inertia::render('Incomes/Index', [
            'incomes' => $incomes,
            'filters' => [
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Incomes/Create');
    }

    public function store(StoreIncomeRequest $request)
    {
        $validated = $request->validated();

        $income = auth()->user()->incomes()->create($validated);

        if ($request->wantsJson()) {
            return (new IncomeResource($income))->response()->setStatusCode(201);
        }

        return redirect()->route('incomes.index')->with('success', 'Income recorded successfully.');
    }

    public function edit(Request $request, Income $income): Response
    {
        // ownership enforced by authorizeResource, but double-check via user relationship
        auth()->user()->incomes()->findOrFail($income->id);

        if ($request->wantsJson()) {
            return new IncomeResource($income);
        }

        return Inertia::render('Incomes/Edit', [
            'income' => $income,
        ]);
    }

    public function update(UpdateIncomeRequest $request, Income $income)
    {
        // ownership checked in UpdateIncomeRequest and authorizeResource
        auth()->user()->incomes()->findOrFail($income->id);

        $income->update($request->validated());

        if ($request->wantsJson()) {
            return new IncomeResource($income);
        }

        return redirect()->route('incomes.index')->with('success', 'Income updated successfully.');
    }

    public function destroy(Request $request, Income $income)
    {
        // ownership enforced by authorizeResource
        auth()->user()->incomes()->findOrFail($income->id);

        $income->delete();

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Income deleted successfully.'], 200);
        }

        return redirect()->back()->with('success', 'Income deleted successfully.');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the user's categories.
     */
    public function index(): Response
    {
        $categories = auth()->user()->categories()->get();

        return Inertia::render('Categories/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created category in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,NULL,id,user_id,'.auth()->id(),
            'color' => 'nullable|string|regex:/^#(?:[0-9a-fA-F]{3}){1,2}$/',
            'icon' => 'nullable|string|max:50',
        ]);

        $category = auth()->user()->categories()->create($validated);

        return redirect()->back()->with('success', 'Category created successfully.');
    }

    /**
     * Update the specified category in storage.
     */
    public function update(Request $request, Category $category)
    {
        $this->authorize('update', $category);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,'.$category->id.',id,user_id,'.auth()->id(),
            'color' => 'nullable|string|regex:/^#(?:[0-9a-fA-F]{3}){1,2}$/',
            'icon' => 'nullable|string|max:50',
        ]);

        $category->update($validated);

        return redirect()->back()->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified category from storage.
     */
    public function destroy(Category $category)
    {
        $this->authorize('delete', $category);

        // Check if category has expenses
        if ($category->expenses()->exists()) {
            return redirect()->back()->with('error', 'Cannot delete category with existing expenses.');
        }

        $category->delete();

        return redirect()->back()->with('success', 'Category deleted successfully.');
    }
}

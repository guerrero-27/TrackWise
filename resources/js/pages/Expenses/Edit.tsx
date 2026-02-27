import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { ChevronLeft } from 'lucide-react';

interface Props {
    expense: any;
    categories: Array<{
        id: number;
        name: string;
        color: string;
    }>;
}

export default function EditExpense({ expense, categories }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Expenses',
            href: '/expenses',
        },
        {
            title: 'Edit',
            href: '#',
        },
    ];

    const { data, setData, patch, processing, errors } = useForm({
        title: expense.title,
        amount: expense.amount,
        category_id: expense.category_id,
        expense_date: expense.expense_date,
        description: expense.description || '',
        due_date: expense.due_date || '',
        paid: expense.paid || false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/expenses/${expense.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${expense.title}`} />
            <div className="py-6">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 md:px-8">
                    {/* Page Header */}
                    <div className="mb-8">
                        <Link
                            href="/expenses"
                            className="mb-4 inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Back to Expenses
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Edit Expense</h1>
                        <p className="mt-2 text-base text-gray-600 dark:text-gray-400">Update expense details</p>
                    </div>

                    <form onSubmit={handleSubmit} className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow">
                        <div className="space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 dark:bg-gray-700 dark:text-white"
                                    placeholder="e.g., Groceries, Gas, Rent"
                                    maxLength={255}
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>

                            {/* Amount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                                <div className="relative mt-2">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">₱</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 pl-8 dark:bg-gray-700 dark:text-white"
                                        placeholder="0.00"
                                    />
                                </div>
                                {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <select
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
                            </div>

                            {/* Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                <input
                                    type="date"
                                    value={data.expense_date}
                                    onChange={(e) => setData('expense_date', e.target.value)}
                                    className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 dark:bg-gray-700 dark:text-white"
                                />
                                {errors.expense_date && <p className="mt-1 text-sm text-red-600">{errors.expense_date}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 dark:text-white">Description (Optional)</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 dark:bg-gray-700 dark:text-white"
                                    placeholder="Add any additional notes..."
                                    maxLength={1000}
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            {/* Due Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 dark:text-white">Due Date (Optional)</label>
                                <input
                                    type="date"
                                    value={data.due_date}
                                    onChange={(e) => setData('due_date', e.target.value)}
                                    className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 dark:bg-gray-700 dark:text-white"
                                />
                                {errors.due_date && <p className="mt-1 text-sm text-red-600">{errors.due_date}</p>}
                            </div>

                            {/* Paid */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={data.paid}
                                    onChange={(e) => setData('paid', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label className="text-sm text-gray-900 dark:text-white">Mark as paid</label>
                                {errors.paid && <p className="mt-1 text-sm text-red-600">{errors.paid}</p>}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {processing ? 'Updating...' : 'Update Expense'}
                                </button>
                                <Link
                                    href="/expenses"
                                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-center text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

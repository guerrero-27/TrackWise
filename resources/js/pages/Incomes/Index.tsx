import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { router as inertiaRouter } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Income {
    id: number;
    title: string;
    amount: number | string;
    income_date: string;
    source?: string | null;
    description?: string | null;
}

interface IncomesPaginated {
    data: Income[];
    current_page: number;
    last_page: number;
}

interface Props {
    incomes: IncomesPaginated;
    filters: {
        start_date: string | null;
        end_date: string | null;
        sort_by: string;
        sort_order: string;
    };
    [key: string]: any;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Incomes',
        href: '#',
    },
];

export default function IncomesIndex() {
    const props = usePage<Props>().props;
    const { incomes, filters } = props;

    const [filterValues, setFilterValues] = useState({
        start_date: filters.start_date || '',
        end_date: filters.end_date || '',
        sort_by: filters.sort_by || 'income_date',
        sort_order: filters.sort_order || 'desc',
    });

    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: number | null; title: string; isDeleting: boolean }>({
        isOpen: false,
        id: null,
        title: '',
        isDeleting: false,
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilterValues(prev => ({ ...prev, [name]: value }));
    };

    const handleFilter = () => {
        const params = new URLSearchParams();
        if (filterValues.start_date) params.append('start_date', filterValues.start_date);
        if (filterValues.end_date) params.append('end_date', filterValues.end_date);
        params.append('sort_by', filterValues.sort_by);
        params.append('sort_order', filterValues.sort_order);

        window.location.href = `/incomes?${params.toString()}`;
    };

    const handleReset = () => {
        window.location.href = '/incomes';
    };

    const handleDelete = (id: number, title: string) => {
        setDeleteConfirm({ isOpen: true, id, title, isDeleting: false });
    };

    const confirmDelete = () => {
        if (deleteConfirm.id === null) return;
        setDeleteConfirm(prev => ({ ...prev, isDeleting: true }));

        inertiaRouter.delete(`/incomes/${deleteConfirm.id}`, {
            onSuccess: () => {
                setDeleteConfirm({ isOpen: false, id: null, title: '', isDeleting: false });
            },
            onError: () => {
                setDeleteConfirm(prev => ({ ...prev, isDeleting: false }));
            },
        });
    };

    const cancelDelete = () => {
        setDeleteConfirm({ isOpen: false, id: null, title: '', isDeleting: false });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Incomes" />
            <div className="py-6 sm:py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 sm:mb-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Incomes</h1>
                                <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">Record and manage your income sources</p>
                            </div>
                            <Link
                                href="/incomes/create"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white transition-colors"
                            >
                                <Plus className="h-5 w-5" />
                                Add Income
                            </Link>
                        </div>
                    </div>

                    {/* Filter Section */}
                    <div className="mb-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 backdrop-blur p-4 sm:p-6 shadow-sm">
                        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">From</label>
                                <input type="date" name="start_date" value={filterValues.start_date} onChange={handleFilterChange} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 sm:px-4 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">To</label>
                                <input type="date" name="end_date" value={filterValues.end_date} onChange={handleFilterChange} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 sm:px-4 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">Sort By</label>
                                <select name="sort_by" value={filterValues.sort_by} onChange={handleFilterChange} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 sm:px-4 py-2 text-sm text-gray-900 dark:text-white transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">
                                    <option value="income_date">Date</option>
                                    <option value="amount">Amount</option>
                                    <option value="title">Title</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">Order</label>
                                <select name="sort_order" value={filterValues.sort_order} onChange={handleFilterChange} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 sm:px-4 py-2 text-sm text-gray-900 dark:text-white transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">
                                    <option value="desc">Newest</option>
                                    <option value="asc">Oldest</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
                            <button onClick={handleFilter} className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors flex-1 sm:flex-none">Apply</button>
                            <button onClick={handleReset} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white transition-colors flex-1 sm:flex-none">Reset</button>
                        </div>
                    </div>

                    {/* Incomes Table */}
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 backdrop-blur overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                                        <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-900 dark:text-gray-300 uppercase tracking-wider">Title</th>
                                        <th className="hidden sm:table-cell px-6 py-4 text-left text-xs font-semibold text-gray-900 dark:text-gray-300 uppercase tracking-wider">Source</th>
                                        <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-900 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                                        <th className="hidden md:table-cell px-6 py-4 text-left text-xs font-semibold text-gray-900 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                        <th className="hidden lg:table-cell px-6 py-4 text-left text-xs font-semibold text-gray-900 dark:text-gray-300 uppercase tracking-wider">Description</th>
                                        <th className="px-4 sm:px-6 py-4 text-center text-xs font-semibold text-gray-900 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {incomes.data && incomes.data.length > 0 ? (
                                        incomes.data.map((income) => (
                                            <tr key={income.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-4 sm:px-6 py-4">
                                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{income.title}</div>
                                                </td>
                                                <td className="hidden sm:table-cell px-6 py-4">
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">{income.source || '—'}</div>
                                                </td>
                                                <td className="px-4 sm:px-6 py-4">
                                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">₱{parseFloat(String(income.amount)).toFixed(2)}</div>
                                                </td>
                                                <td className="hidden md:table-cell px-6 py-4">
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">{new Date(income.income_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                                </td>
                                                <td className="hidden lg:table-cell px-6 py-4">
                                                    <div className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">{income.description || '—'}</div>
                                                </td>
                                                <td className="px-4 sm:px-6 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Link href={`/incomes/${income.id}/edit`} className="inline-flex items-center justify-center p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" title="Edit">
                                                            <Edit2 className="h-4 w-4" />
                                                        </Link>
                                                        <button onClick={() => handleDelete(income.id, income.title)} className="inline-flex items-center justify-center p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" title="Delete">
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-4 sm:px-6 py-16 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                                        <Plus className="h-6 w-6 text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">No incomes yet</p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Add your first income to track your savings</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {incomes.last_page > 1 && (
                            <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Page <span className="font-semibold text-gray-900 dark:text-white">{incomes.current_page}</span> of <span className="font-semibold text-gray-900 dark:text-white">{incomes.last_page}</span></div>
                                <div className="flex gap-2">
                                    {incomes.current_page > 1 && (
                                        <Link href={`/incomes?${new URLSearchParams({ ...filterValues, page: (incomes.current_page - 1).toString() }).toString()}`} className="inline-flex items-center justify-center p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400">
                                            <ChevronLeft className="h-5 w-5" />
                                        </Link>
                                    )}
                                    {incomes.current_page < incomes.last_page && (
                                        <Link href={`/incomes?${new URLSearchParams({ ...filterValues, page: (incomes.current_page + 1).toString() }).toString()}`} className="inline-flex items-center justify-center p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400">
                                            <ChevronRight className="h-5 w-5" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Delete Confirmation Modal */}
                    {deleteConfirm.isOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-sm w-full animate-in fade-in scale-95 duration-200">
                                <div className="p-6">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 mx-auto mb-4">
                                        <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">Delete Income?</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">Are you sure you want to delete <strong>"{deleteConfirm.title}"</strong>? This action cannot be undone.</p>
                                    <div className="flex gap-3">
                                        <button onClick={cancelDelete} disabled={deleteConfirm.isDeleting} className="flex-1 inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Cancel</button>
                                        <button onClick={confirmDelete} disabled={deleteConfirm.isDeleting} className="flex-1 inline-flex items-center justify-center rounded-lg bg-red-600 hover:bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{deleteConfirm.isDeleting ? 'Deleting...' : 'Delete'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

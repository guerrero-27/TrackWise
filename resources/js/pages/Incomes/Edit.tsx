import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { ChevronLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Incomes', href: '/incomes' },
    { title: 'Edit', href: '#' },
];

export default function EditIncome({ income }: any) {
    const { data, setData, put, processing, errors } = useForm({
        title: income.title || '',
        amount: income.amount || '',
        income_date: income.income_date || new Date().toISOString().split('T')[0],
        source: income.source || '',
        description: income.description || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/incomes/${income.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Income" />
            <div className="py-6">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 md:px-8">
                    <div className="mb-8">
                        <Link href="/incomes" className="mb-4 inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700">
                            <ChevronLeft className="h-4 w-4" /> Back to Incomes
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Edit Income</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                                <input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-transparent text-gray-900 dark:text-white" />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                                <input type="number" step="0.01" value={data.amount} onChange={(e) => setData('amount', e.target.value)} className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-transparent text-gray-900 dark:text-white" />
                                {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                                <input type="date" value={data.income_date} onChange={(e) => setData('income_date', e.target.value)} className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-transparent text-gray-900 dark:text-white" />
                                {errors.income_date && <p className="mt-1 text-sm text-red-600">{errors.income_date}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Source</label>
                                <input type="text" value={data.source} onChange={(e) => setData('source', e.target.value)} className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-transparent text-gray-900 dark:text-white" />
                                {errors.source && <p className="mt-1 text-sm text-red-600">{errors.source}</p>}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="submit" disabled={processing} className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">{processing ? 'Saving...' : 'Save Changes'}</button>
                                <Link href="/incomes" className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-center text-sm font-semibold text-gray-900 dark:text-white bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

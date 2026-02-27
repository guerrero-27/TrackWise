import { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Head, router } from '@inertiajs/react';
import { Plus, PhilippinePeso, Calendar, TrendingUp } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import Inertia from '@/actions/Inertia';
import { useAppearance } from '@/hooks/use-appearance';

interface CategoryBreakdown {
    name: string;
    amount: number;
    color: string;
}

interface Transaction {
    id: number;
    title: string;
    amount: string;
    expense_date: string;
    due_date?: string | null;
    paid?: boolean;
    category: {
        id: number;
        name: string;
        color: string;
    };
}

interface MonthlyData {
    month: string;
    amount?: number;
    expense?: number;
    income?: number;
}

interface DashboardStats {
    totalThisMonth: number;
    totalIncomeThisMonth?: number;
    netThisMonth?: number;
    savingsRateThisMonth?: number | null;
    totalThisYear: number;
    totalIncomeThisYear?: number;
    netThisYear?: number;
    savingsRateThisYear?: number | null;
    unpaidThisMonth?: number;
    overdueTotal?: number;
    categoryBreakdown: CategoryBreakdown[];
    recentTransactions: Transaction[];
    recentIncomes?: any[];
    incomeSources?: any[];
    monthlyData: MonthlyData[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

export default function Dashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    // fetch helper pulled out so other handlers can call it
    const fetchStats = async () => {
        try {
            const response = await fetch('/api/dashboard-stats', {
                headers: {
                    'Accept': 'application/json',
                },
            });
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Failed to fetch dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePaid = (id: number) => {
        router.post(`/expenses/${id}/toggle-paid`, {}, {
            onSuccess: () => {
                // refetch the stats so the UI stays in sync
                fetchStats();
            }
        });
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const COLORS = ['#10B981', '#8B5CF6', '#EC4899', '#F59E0B', '#3B82F6', '#06B6D4'];

    if (loading || !stats) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin">
                        <svg className="h-12 w-12 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Page Header */}
                    <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h1>
                            <p className="mt-2 text-base text-gray-600 dark:text-gray-400">Welcome back! Here's your expense overview.</p>
                        </div>
                        <Link
                            href="/expenses/create"
                            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all transform hover:scale-105 active:scale-95"
                        >
                            <Plus className="h-5 w-5" />
                            Add Expense
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 backdrop-blur p-6 hover:border-emerald-500/50 transition-colors shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
                                    <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
                                        ₱{(stats.totalThisMonth || 0).toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-500/20">
                                    <PhilippinePeso className="h-7 w-7 text-emerald-400"/>
                                </div>
                            </div>
                        </div>

                        {/* unpaid this month */}
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 backdrop-blur p-6 hover:border-yellow-500/50 transition-colors shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Unpaid This Month</p>
                                    <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
                                        ₱{((stats?.unpaidThisMonth || 0) as number).toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-yellow-500/20">
                                    <Calendar className="h-7 w-7 text-yellow-400" />
                                </div>
                            </div>
                        </div>

                        {/* overdue total */}
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 backdrop-blur p-6 hover:border-red-500/50 transition-colors shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue</p>
                                    <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
                                        ₱{((stats?.overdueTotal || 0) as number).toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-red-500/20">
                                    <Calendar className="h-7 w-7 text-red-400" />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 backdrop-blur p-6 hover:border-blue-500/50 transition-colors shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Year</p>
                                    <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
                                        ₱{(stats.totalThisYear || 0).toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-500/20">
                                    <TrendingUp className="h-7 w-7 text-blue-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
                        {/* Bar Chart - Monthly Expenses */}
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 backdrop-blur p-6 shadow-sm">
                            <h2 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">Monthly Expenses</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={stats.monthlyData || []}
                                    margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                                    <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                                    <Tooltip 
                                        formatter={(value: number) => `₱${value.toFixed(2)}`}
                                        contentStyle={{ backgroundColor: 'var(--tooltip-bg, #1F2937)', border: '1px solid var(--tooltip-border, #374151)', borderRadius: '8px' }}
                                        labelStyle={{ color: 'var(--tooltip-text, #F3F4F6)' }}
                                    />
                                    <Bar dataKey="expense" name="Expenses" fill="#F87171" radius={[8, 8, 0, 0]} />
                                    <Bar dataKey="income" name="Income" fill="#10B981" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Pie Chart - Category Breakdown */}
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 backdrop-blur p-6 shadow-sm">
                            <h2 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">Category Breakdown</h2>
                            {stats.categoryBreakdown && stats.categoryBreakdown.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={stats.categoryBreakdown}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }: { name: string; percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="amount"
                                        >
                                            {stats.categoryBreakdown.map((entry: CategoryBreakdown, index: number) => (
                                                <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            formatter={(value: number) => `$${value.toFixed(2)}`}
                                            contentStyle={{ backgroundColor: 'var(--tooltip-bg, #1F2937)', border: '1px solid var(--tooltip-border, #374151)', borderRadius: '8px' }}
                                            labelStyle={{ color: 'var(--tooltip-text, #F3F4F6)' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-75 text-gray-500 dark:text-gray-400">
                                    No expense data available
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Net + Savings Summary */}
                    <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Income This Month</p>
                            <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">₱{((stats.totalIncomeThisMonth || 0) as number).toFixed(2)}</p>
                        </div>

                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Net This Month</p>
                            <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">₱{((stats.netThisMonth || 0) as number).toFixed(2)}</p>
                        </div>

                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Savings Rate</p>
                            <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">{stats.savingsRateThisMonth !== null && stats.savingsRateThisMonth !== undefined ? `${stats.savingsRateThisMonth.toFixed(2)}%` : '—'}</p>
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 backdrop-blur overflow-hidden shadow-sm">
                        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Transactions</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-800/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Title</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Category</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Amount</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Due</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Paid</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                    {stats.recentTransactions && stats.recentTransactions.length > 0 ? (
                                        stats.recentTransactions.map((transaction: Transaction) => (
                                            <tr
                                                key={transaction.id}
                                                className={`hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors ${transaction.paid ? 'opacity-60 line-through' : ''}`}
                                            >
                                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">{transaction.title}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span
                                                        className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white"
                                                        style={{ backgroundColor: transaction.category.color }}
                                                    >
                                                        {transaction.category.name}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-semibold text-emerald-400">
                                                    ₱{parseFloat(transaction.amount).toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                    {new Date(transaction.expense_date).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                    {transaction.due_date ? new Date(transaction.due_date).toLocaleDateString() : '—'}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={!!transaction.paid}
                                                        onChange={() => handleTogglePaid(transaction.id)}
                                                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                                                No transactions yet. Start by adding an expense!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

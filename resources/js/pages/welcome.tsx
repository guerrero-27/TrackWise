import { Head, Link, usePage, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { dashboard, login, register } from '@/routes';
import { Zap, TrendingUp, Filter, Tag, BarChart3, Lock, ArrowRight, CheckCircle } from 'lucide-react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;

    // Redirect authenticated users to dashboard
    useEffect(() => {
        if (auth.user) {
            router.visit(dashboard());
        }
    }, [auth.user]);

    // Don't render if user is authenticated (will redirect)
    if (auth.user) {
        return null;
    }

    return (
        <>
            <Head title="TrackWise - Smart Expense Tracking">
                <meta name="description" content="Take control of your finances with TrackWise. Track expenses, analyze spending patterns, and visualize your financial data with beautiful charts." />
            </Head>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 bg-gray-900/40 backdrop-blur-md rounded-b-2xl border-b border-gray-800 p-4">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-emerald-400 to-blue-500">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight bg-linear-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                                TrackWise
                            </span>
                        </div>

                        {/* Nav Links */}
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
                            <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a>
                        </div>

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-4">
                            <Link
                                href={login()}
                                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                            >
                                Log in
                            </Link>
                            {canRegister && (
                                <Link
                                    href={register()}
                                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                                >
                                    Get Started
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="min-h-screen bg-gray-950 text-white pt-20">
                {/* Gradient Background */}
                <div className="fixed inset-0 z-0">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                </div>

                {/* Hero Section */}
                <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                            Take Control of Your{' '}
                            <span className="bg-linear-to-r from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                                Finances
                            </span>
                        </h1>

                        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                            Track expenses, analyze spending patterns, manage categories, and visualize your financial trends with beautiful, interactive charts.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                href={register()}
                                className="inline-flex items-center justify-center gap-2 px-8 py-3 text-lg font-semibold text-white bg-linear-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-xl transition-all transform hover:scale-105 active:scale-95"
                            >
                                Get Started Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href={login()}
                                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white border-2 border-gray-700 hover:border-gray-600 rounded-xl transition-colors"
                            >
                                Sign In
                            </Link>
                        </div>

                        {/* Hero Image/Preview */}
                        <div className="relative mt-12 rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur p-1">
                            <div className="rounded-xl bg-gray-900 p-6 md:p-8">
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                                        <p className="text-sm text-gray-400 mb-2">This Month</p>
                                        <p className="text-3xl font-bold text-emerald-400">$1,234.56</p>
                                    </div>
                                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                                        <p className="text-sm text-gray-400 mb-2">This Year</p>
                                        <p className="text-3xl font-bold text-blue-400">$15,234.89</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-800/30 rounded-lg h-40 flex items-center justify-center border border-gray-700/50">
                                        <BarChart3 className="w-12 h-12 text-emerald-500/30" />
                                    </div>
                                    <div className="bg-gray-800/30 rounded-lg h-40 flex items-center justify-center border border-gray-700/50">
                                        <TrendingUp className="w-12 h-12 text-blue-500/30" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
                        <p className="text-xl text-gray-400">Get started in three simple steps</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Tag,
                                title: 'Create Categories',
                                description: 'Set up custom expense categories with colors to organize your spending your way.'
                            },
                            {
                                icon: Zap,
                                title: 'Log Expenses',
                                description: 'Quickly add expenses with title, amount, date, and optional notes for context.'
                            },
                            {
                                icon: BarChart3,
                                title: 'Analyze & Visualize',
                                description: 'View beautiful charts and reports that show your spending patterns and trends.'
                            }
                        ].map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={index}
                                    className="group rounded-xl border border-gray-800 bg-gray-900/50 p-8 hover:border-emerald-500/50 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10"
                                >
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-emerald-500/20 to-blue-500/20 mb-6 group-hover:from-emerald-500/30 group-hover:to-blue-500/30 transition-colors">
                                        <Icon className="w-8 h-8 text-emerald-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                                    <div className="mt-6 text-5xl font-bold text-gray-800">{index + 1}</div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
                        <p className="text-xl text-gray-400">Everything you need to manage your expenses</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: Lock,
                                title: 'Secure & Private',
                                description: 'Your financial data is encrypted and private. Only you can see your expenses.'
                            },
                            {
                                icon: BarChart3,
                                title: 'Interactive Charts',
                                description: 'Beautiful bar and pie charts show your spending distribution and trends.'
                            },
                            {
                                icon: Filter,
                                title: 'Advanced Filtering',
                                description: 'Filter by date range, category, and sort by amount or date instantly.'
                            },
                            {
                                icon: Tag,
                                title: 'Category Management',
                                description: 'Create unlimited categories with custom colors for better organization.'
                            },
                            {
                                icon: TrendingUp,
                                title: 'Real-time Dashboard',
                                description: 'See your spending stats updated instantly with monthly and yearly overviews.'
                            },
                            {
                                icon: Zap,
                                title: 'Lightning Fast',
                                description: 'Built with modern technologies for instant load times and smooth interactions.'
                            }
                        ].map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="rounded-xl border border-gray-800 bg-gray-900/50 p-8 hover:border-gray-700 transition-colors group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                                            <Icon className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                            <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Dashboard Preview */}
                <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Smart Dashboard</h2>
                        <p className="text-xl text-gray-400">See all your financial data at a glance</p>
                    </div>

                    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur overflow-hidden">
                        <div className="p-6 md:p-10">
                            {/* Dashboard Header */}
                            <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-800">
                                <div>
                                    <h3 className="text-2xl font-bold">Dashboard</h3>
                                    <p className="text-gray-400 mt-1">Welcome back! Here's your expense overview.</p>
                                </div>
                                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-colors">
                                    + Add Expense
                                </button>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="rounded-lg bg-gray-800/50 border border-gray-700 p-6">
                                    <p className="text-sm text-gray-400 mb-2">This Month</p>
                                    <p className="text-4xl font-bold text-emerald-400">$1,234.56</p>
                                </div>
                                <div className="rounded-lg bg-gray-800/50 border border-gray-700 p-6">
                                    <p className="text-sm text-gray-400 mb-2">This Year</p>
                                    <p className="text-4xl font-bold text-blue-400">$15,234.89</p>
                                </div>
                            </div>

                            {/* Charts Preview */}
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="rounded-lg bg-gray-800/30 border border-gray-700 p-6 flex flex-col items-center justify-center h-64">
                                    <BarChart3 className="w-16 h-16 text-emerald-500/40 mb-4" />
                                    <p className="text-gray-400 text-sm">Monthly Expenses Chart</p>
                                </div>
                                <div className="rounded-lg bg-gray-800/30 border border-gray-700 p-6 flex flex-col items-center justify-center h-64">
                                    <TrendingUp className="w-16 h-16 text-blue-500/40 mb-4" />
                                    <p className="text-gray-400 text-sm">Category Breakdown</p>
                                </div>
                            </div>

                            {/* Recent Transactions */}
                            <div className="rounded-lg bg-gray-800/30 border border-gray-700 overflow-hidden">
                                <div className="p-6 border-b border-gray-700">
                                    <h4 className="font-bold">Recent Transactions</h4>
                                </div>
                                <div className="divide-y divide-gray-700">
                                    {[
                                        { title: 'Grocery Shopping', category: 'Groceries', amount: '$125.50', date: 'Today' },
                                        { title: 'Gas Station', category: 'Transportation', amount: '$45.00', date: 'Yesterday' },
                                        { title: 'Restaurant Dinner', category: 'Dining', amount: '$65.30', date: '2 days ago' }
                                    ].map((tx, idx) => (
                                        <div key={idx} className="p-4 flex items-center justify-between text-sm">
                                            <div>
                                                <p className="font-medium">{tx.title}</p>
                                                <p className="text-gray-400">{tx.category}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-emerald-400">{tx.amount}</p>
                                                <p className="text-gray-400">{tx.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                    <div className="rounded-2xl bg-linear-to-r from-emerald-600/20 via-blue-600/20 to-emerald-600/20 border border-emerald-500/20 p-12 md:p-16 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Start Tracking Smarter Today
                        </h2>
                        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of users who are taking control of their finances with ExpenseFlow.
                        </p>
                        <Link
                            href={register()}
                            className="inline-flex items-center justify-center gap-2 px-10 py-4 text-lg font-semibold text-white bg-linear-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-xl transition-all transform hover:scale-105 active:scale-95"
                        >
                            Create Free Account
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 mt-20 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row items-start justify-around gap-12 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-emerald-400 to-blue-500">
                                    <Zap className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-lg font-bold">TrackWise</span>
                            </div>
                            <p className="text-gray-400">Smart expense tracking for modern life.</p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                                <li><Link href={login()} className="hover:text-white transition-colors">Sign In</Link></li>
                            </ul>
                        </div>
                        {/* <div>
                            <h4 className="font-bold mb-4">Tech Stack</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li>Laravel 12 • React 19</li>
                                <li>Inertia.js • Tailwind CSS</li>
                                <li>MySQL • Recharts</li>
                            </ul>
                        </div> */}
                    </div>
                    
                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
                        <p className="text-center md:text-left">
                            &copy; 2026 TrackWise. All rights reserved.
                        </p>

                        <p className="text-center md:text-right">
                            Built with modern technologies for modern finance • 
                            Design by 
                            <span className="font-semibold text-white ml-1">
                            Kevin
                            </span>
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import type { AuthLayoutProps } from '@/types';
import { home } from '@/routes';
import { Zap } from 'lucide-react';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
            {/* Gradient Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl" />
            </div>

            {/* Main Content - Centered */}
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid gap-12 lg:grid-cols-2 items-center justify-items-center lg:justify-items-auto">
                    {/* Left Side: Branding & Info - Hidden on Mobile */}
                    <div className="hidden lg:flex flex-col justify-center order-1">
                        <Link href={home()} className="inline-flex items-center gap-3 mb-8 w-fit">
                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-emerald-400 to-blue-500">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight bg-linear-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                                TrackWise
                            </span>
                        </Link>

                        <h2 className="text-5xl font-bold leading-tight mb-6 max-w-lg">Take Control of Your Finances</h2>
                        <p className="text-lg text-gray-400 max-w-xl leading-relaxed mb-8">
                            Smart expense tracking made simple. Analyze spending, manage categories, and visualize your financial trends.
                        </p>

                        {/* Preview Card */}
                        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur p-8 max-w-md">
                            <p className="text-sm text-gray-400 font-medium mb-4">Dashboard Preview</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-lg bg-gray-800/50 p-4 border border-gray-700">
                                    <p className="text-xs text-gray-500 mb-2">This Month</p>
                                    <p className="text-2xl font-bold text-emerald-400">$1.2K</p>
                                </div>
                                <div className="rounded-lg bg-gray-800/50 p-4 border border-gray-700">
                                    <p className="text-xs text-gray-500 mb-2">This Year</p>
                                    <p className="text-2xl font-bold text-blue-400">$15.2K</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side / Center: Auth Form */}
                    <div className="w-full max-w-sm order-2 lg:order-2">
                        <div className="mb-6 text-center lg:text-left lg:mb-0">
                            <Link href={home()} className="inline-flex lg:hidden items-center gap-3 mb-6 justify-center w-full">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-emerald-400 to-blue-500">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight bg-linear-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                                TrackWise
                            </span>
                            </Link>
                        </div>

                        <div className="rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
                            <div className="mb-8">
                                <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-center lg:text-left">{title}</h3>
                                <p className="text-gray-400 text-center lg:text-left text-sm sm:text-base">{description}</p>
                            </div>

                            {/* Form Content */}
                            <div className="space-y-6">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

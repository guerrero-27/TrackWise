import * as React from 'react';
import { SidebarInset } from '@/components/ui/sidebar';

type Props = React.ComponentProps<'main'> & {
    variant?: 'header' | 'sidebar';
};

export function AppContent({ variant = 'header', children, ...props }: Props) {
    if (variant === 'sidebar') {
        return (
            <SidebarInset {...props}>
                <div className="relative min-h-screen bg-gray-50 dark:bg-gray-950">
                    {/* Gradient Background */}
                    <div className="fixed inset-0 -z-10 pointer-events-none">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/6 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/6 rounded-full blur-3xl" />
                    </div>
                    {children}
                </div>
            </SidebarInset>
        );
    }

    return (
        <main
            className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl"
            {...props}
        >
            {children}
        </main>
    );
}

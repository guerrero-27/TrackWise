import type { SVGAttributes } from 'react';
import { Zap } from 'lucide-react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-emerald-400 to-blue-500">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
    );
}

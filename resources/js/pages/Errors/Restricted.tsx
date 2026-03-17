import { Head, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Bug, Home, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RestrictedProps {
    status?: number;
    message?: string;
}

export default function Restricted({ status = 403, message = "Hey, you're not supposed to be on this page!" }: RestrictedProps) {
    return (
        <AppLayout>
            <Head title={`Error ${status} - Restricted Area`} />
            
            <div className="w-full flex items-center justify-center min-h-[70vh] px-4 py-12 transition-colors duration-300">
                <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center p-8 md:p-12 relative overflow-hidden transition-colors duration-300">
                    <div className="glitch-decor absolute top-0 left-0 w-full h-1 bg-linear-to-r from-qb-blue via-qb-cyan to-qb-purple"></div>
                    <div className="absolute left-2 top-1/4 w-1 h-16 bg-qb-cyan animate-glitch-fast hidden md:block z-0"></div>
                    <div className="absolute right-2 bottom-1/4 w-1 h-12 bg-qb-purple animate-glitch-slow hidden md:block z-0"></div>
                    <div className="relative mb-10 group z-10">
                        <div className="absolute inset-0 bg-qb-cyan blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 rounded-full"></div>
                        <div className="relative flex items-center justify-center w-28 h-28 rounded-full border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 text-qb-cyan group-hover:border-qb-cyan transition-colors duration-500">
                            <Bug size={60} className="animate-bounce" />
                            <div className="absolute -bottom-3 -right-3 bg-white dark:bg-qb-dark text-qb-purple rounded-full p-2 border-2 border-qb-purple">
                                <ShieldAlert size={28} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mb-10 z-10">
                        <h1 className="text-7xl md:text-9xl font-black text-gray-900 dark:text-white uppercase tracking-tighter glitch-title"
                            style={{ textShadow: '4px 0px 0px #2FF4EE, -4px 0px 0px #D130F2' }}>
                            {status}
                        </h1>
                        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-qb-blue dark:text-qb-cyan mt-3 leading-relaxed">
                            Restricted Area
                        </h2>
                    </div>

                    <p className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-400 max-w-lg mb-12 border-y border-gray-200 dark:border-white/10 py-6 z-10">
                        {message} <br/> 
                        <span className="text-xs opacity-70 mt-3 block">
                            The quantum core is highly unstable in this area. We recommend turning back before a paradox occurs. Base protocol is in effect.
                        </span>
                    </p>

                    <Button 
                        asChild 
                        className="h-16 px-10 rounded-none font-black uppercase tracking-widest text-xs transition-all duration-300 z-10
                                   bg-qb-dark text-white hover:bg-qb-blue shadow-lg
                                   dark:bg-qb-cyan dark:text-qb-dark dark:hover:bg-white dark:hover:shadow-[0_0_20px_rgba(47,244,238,0.6)]"
                    >
                        <Link href="/" className="flex items-center gap-3">
                            <Home size={18} />
                            Return to Base
                        </Link>
                    </Button>
                    
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-600 mt-8 z-10">
                        Quantum Bug Dev Team
                    </span>
                </div>
            </div>
        </AppLayout>
    );
}
import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { Button } from '@/components/ui/button';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn, toUrl } from '@/lib/utils';
import type { NavItem } from '@/types';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { show } from '@/routes/two-factor';
import { edit as editPassword } from '@/routes/user-password';
import { User, KeyRound, ShieldAlert, Monitor } from 'lucide-react';

const sidebarNavItems: NavItem[] = [
    { title: 'Profile', href: edit(), icon: User },
    { title: 'Password', href: editPassword(), icon: KeyRound },
    { title: 'Two-Factor Auth', href: show(), icon: ShieldAlert },
    { title: 'Appearance', href: editAppearance(), icon: Monitor },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
            <div className="mb-10 border-b border-gray-200 dark:border-white/10 pb-6">
                <h1 
                    className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-widest relative inline-block mb-2"
                    style={{ textShadow: 'var(--glitch-shadow)' }}
                >
                    System Settings
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-widest text-xs">
                    Manage your profile and account credentials
                </p>
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-12 gap-y-8">
                <aside className="w-full lg:w-64 shrink-0">
                    <nav className="flex flex-col space-y-2">
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${toUrl(item.href)}-${index}`}
                                variant="ghost"
                                asChild
                                className={cn(
                                    'w-full justify-start rounded-none font-bold uppercase tracking-widest text-xs h-12 border-l-4 transition-all',
                                    isCurrentUrl(item.href)
                                        ? 'bg-qb-cyan/10 border-qb-cyan text-qb-cyan shadow-[inset_4px_0_0_0_rgba(47,244,238,1)]' 
                                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-white/5'
                                )}
                            >
                                <Link href={item.href} className="flex items-center gap-3 px-4">
                                    {item.icon && <item.icon className="h-4 w-4" />}
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <div className="flex-1 w-full">
                    <section className="w-full max-w-3xl bg-white dark:bg-white/[0.03] backdrop-blur-sm p-6 md:p-8 border border-gray-200 dark:border-white/10 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-qb-blue via-qb-cyan to-qb-purple glitch-decor"></div>
                        <div className="space-y-12">
                            {children}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
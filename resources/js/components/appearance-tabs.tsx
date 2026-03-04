import type { LucideIcon } from 'lucide-react';
import { Monitor, Moon, Sun } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import type { Appearance } from '@/hooks/use-appearance';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

export default function AppearanceToggleTab({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <div
            className={cn(
                'inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-white/5 transition-colors',
                className,
            )}
            {...props}
        >
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        'flex items-center rounded-md px-3.5 py-1.5 transition-all duration-300 font-bold uppercase tracking-widest text-[10px]',
                        appearance === value
                            ? value === 'dark'
                                ? 'bg-qb-dark text-qb-cyan shadow-[0_0_10px_rgba(47,244,238,0.2)] border border-qb-cyan/20'
                                : 'bg-white shadow-sm text-black border border-neutral-200'
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white',
                    )}
                >
                    <Icon className={cn(
                        "-ml-1 h-3.5 w-3.5",
                        appearance === value && value === 'dark' ? "text-qb-cyan" : ""
                    )} />
                    <span className="ml-1.5">{label}</span>
                </button>
            ))}
        </div>
    );
}
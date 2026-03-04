import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import type { BreadcrumbItem } from '@/types';
import { edit as editAppearance } from '@/routes/appearance';

// Importamos lo necesario para el toggle
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAppearance } from '@/hooks/use-appearance';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: editAppearance().url,
    },
];

export default function Appearance() {
    // Consumimos el estado y la función de tu hook use-appearance
    const { effectsEnabled, toggleEffects } = useAppearance();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <h1 className="sr-only">Appearance Settings</h1>

            <SettingsLayout>
                <div className="space-y-12">
                    {/* SECCIÓN 1: TEMA (Light / Dark) */}
                    <div className="space-y-6">
                        <Heading
                            variant="small"
                            title="Appearance settings"
                            description="Update your account's appearance settings"
                        />
                        <AppearanceTabs />
                    </div>

                    {/* SECCIÓN 2: EFECTOS VISUALES */}
                    <div className="space-y-6">
                        <Heading
                            variant="small"
                            title="Visual Effects"
                            description="Enable or disable terminal animations and glitch decorations"
                        />
                        
                        <div className="flex items-center justify-between p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 relative overflow-hidden group transition-all">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-qb-cyan glitch-decor" />
                            
                            <div className="space-y-1 pr-4">
                                <Label 
                                    htmlFor="effects-mode" 
                                    className="text-sm font-black uppercase tracking-widest text-gray-800 dark:text-white cursor-pointer"
                                >
                                    Animations & Glitch
                                </Label>
                            </div>
                            
                            <Switch 
                                id="effects-mode"
                                checked={effectsEnabled} 
                                onCheckedChange={toggleEffects}
                                className="data-[state=checked]:bg-qb-cyan"
                            />
                        </div>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
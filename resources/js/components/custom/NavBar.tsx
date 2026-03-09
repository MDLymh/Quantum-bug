import React, { useState, useRef, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { LogOut, Menu, X, Sun, Moon, Monitor, Zap, ZapOff, User, KeyRound, ShieldAlert, ClipboardList } from 'lucide-react';
import { useAppearance, Appearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

// Importamos tus rutas de configuración tal como en SettingsLayout
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editProfile } from '@/routes/profile';
import { show as showTwoFactor } from '@/routes/two-factor';
import { edit as editPassword } from '@/routes/user-password';

interface NavLink {
    name: string;
    link: string;
}

interface UserData {
    name: string;
}

interface NavbarProps {
    links: NavLink[];
    authLinks: NavLink[];
    logoutRoute: string;
    user: UserData | null;
}

const Navbar: React.FC<NavbarProps> = ({ links, authLinks, logoutRoute, user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { appearance, updateAppearance, effectsEnabled, toggleEffects } = useAppearance();

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(logoutRoute);
    };

    // Cerrar el dropdown del usuario si se hace clic fuera de él o si se presiona Esc
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEsc);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const themeOptions: { value: Appearance; icon: any; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    const userMenuLinks = [
        { title: 'Profile', link: editProfile(), icon: User },
        { title: 'Password', link: editPassword(), icon: KeyRound },
        { title: 'Two-Factor Auth', link: showTwoFactor(), icon: ShieldAlert },
        { title: 'Appearance', link: editAppearance(), icon: Monitor },
        { title: 'Report Tracking', link: '/reports', icon: ClipboardList }, 
    ];

    return (
        <nav className="sticky top-0 z-[100] w-full h-14 flex items-center shadow-lg border-b border-white/10 bg-qb-blue transition-none mb-4">
            <div className="w-full px-4 flex justify-between items-center h-full">
                
                {/* --- SECCIÓN IZQUIERDA --- */}
                <div className="flex items-center h-full">
                    <Link href="/" className="mr-6 group hover:scale-105 transition-transform duration-300 flex items-center gap-2">
                        <div className="w-9 h-9 relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-transparent rounded-full shadow-[-2px_0_0_#D130F2,2px_0_0_#2FF4EE] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <svg viewBox="0 0 5796.8 5674.2" className="w-full h-full stroke-qb-dark group-hover:stroke-white transition-colors duration-300 fill-none" strokeWidth="264.4" strokeLinecap="round" strokeMiterlimit="10" xmlns="http://www.w3.org/2000/svg">
                                {/* SVG paths omitidos por brevedad, usa tu SVG exacto aquí si lo copias parcial */}
                                <g>
                                    <path d="M2661,5125.9c-185.1-125.6-324.5-360.7-415.2-531.6c-230.7-435-351.5-900.4-348-1392.9 c0.4-62.7,2.7-125.4,6.7-188"/>
                                    <path d="M3953.9,3065.2c28.2,488-88.5,952.2-292.3,1394.8c-101.1,219.5-252.1,514.5-474.2,663"/>
                                    <path d="M922.4,1268.8c315.7-204.8,905.7-184.5,1578.4,39.5"/>
                                    <path d="M1897.7,3345.5C1135.3,2796.1,660.2,2148.8,681.9,1688.1"/>
                                    <path d="M4903.3,4150.4c-316.9,186.8-884.1,165.1-1530.2-45.9"/>
                                    <path d="M3950.8,2058.7C4698.5,2597.3,5170,3230.1,5168,3688.9"/>
                                    <path d="M5167.9,1705.7c8.9,458.8-462.4,1095.5-1213.3,1637.4"/>
                                    <path d="M3348.2,1308.2c662-220.5,1243.9-243.7,1563.2-49.2"/>
                                    <path d="M681.3,3696.7c-7.6-459.5,465.2-1096.5,1217.3-1638.2"/>
                                    <path d="M2466.9,4107.4c-647.9,210-1215.4,229.1-1529.2,38"/>
                                    <g><g><path d="M3160.1,1183.1h-446c-137.8,0-250.5-112.7-250.5-250.5l0,0c0-137.8,112.7-250.5,250.5-250.5h446 c137.8,0,250.5,112.7,250.5,250.5l0,0C3410.6,1070.4,3297.8,1183.1,3160.1,1183.1z"/><path d="M2568.4,728.4c-85.6-73.1-171.2-146.2-256.8-219.3v-322"/><path d="M3288.8,717.8c40.2-34.4,80.5-68.7,120.7-103.1c42.8-36.6,85.6-73.1,128.4-109.7c0-107.3,0-214.6,0-322"/></g><g><path d="M2924.7,4214.9L2924.7,4214.9c-566.8,0-1026.1-459.4-1026.1-1026.1v-945.6 c0-566.8,459.4-1026.1,1026.1-1026.1l0,0c566.8,0,1026.1,459.4,1026.1,1026.1v945.6C3950.9,3755.4,3491.5,4214.9,2924.7,4214.9z"/><circle cx="2924.7" cy="2715.8" r="467.8"/></g></g><circle cx="5131.8" cy="1428" r="277.7"/><path d="M4897.2,4154c-55.1-50.7-89.6-123.5-89.6-204.3c0-153.4,124.3-277.7,277.7-277.7c28.9,0,56.8,4.4,83.1,12.6"/><path d="M5168.4,3684.6c112.8,35.3,194.6,140.6,194.6,265.1c0,153.4-124.3,277.7-277.7,277.7 c-72.6,0-138.6-27.8-188.1-73.4"/><circle cx="2924.7" cy="5213.4" r="277.7"/><path d="M939.4,4146.3c-50.9,64.4-129.7,105.8-218.1,105.8c-153.4,0-277.7-124.3-277.7-277.7 c0-153.4,124.3-277.7,277.7-277.7S999,3821,999,3974.4C999,4039.3,976.7,4099.1,939.4,4146.3"/><circle cx="687.2" cy="1410.4" r="277.7"/>
                                </g>
                            </svg>
                        </div>
                        <span className="hidden lg:block text-qb-dark font-black tracking-tighter text-sm uppercase group-hover:text-white transition-colors">
                            Quantum Bug
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center h-full">
                        {links.map((item, idx) => (
                            <div key={idx} className="flex items-center h-full">
                                <Link href={item.link} className="px-4 text-[11px] font-black uppercase tracking-widest text-qb-dark hover:text-white transition-colors">
                                    {item.name}
                                </Link>
                                {idx < links.length - 1 && (
                                    <div className="h-6 w-px bg-qb-dark/30"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- SECCIÓN DERECHA --- */}
                <div className="flex items-center gap-3 h-full">
                    
                    {/* Botones de Tema y Glitch */}
                    <div className="hidden sm:flex items-center bg-qb-dark/10 rounded-full p-1 border border-qb-dark/10 mr-1">
                        {themeOptions.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => updateAppearance(opt.value)}
                                className={cn(
                                    "p-1.5 rounded-full transition-all",
                                    appearance === opt.value ? "bg-qb-dark text-white shadow-sm" : "text-qb-dark/60 hover:text-qb-dark"
                                )}
                                title={opt.label}
                            >
                                <opt.icon size={13} strokeWidth={2.5} />
                            </button>
                        ))}
                        <div className="w-px h-3.5 bg-qb-dark/20 mx-1"></div>
                        <button
                            onClick={toggleEffects}
                            className={cn(
                                "p-1.5 rounded-full transition-all",
                                effectsEnabled ? "text-qb-purple" : "text-qb-dark/40"
                            )}
                            title={effectsEnabled ? "Desactivar Glitch" : "Activar Glitch"}
                        >
                            {effectsEnabled ? <Zap size={13} fill="currentColor" strokeWidth={2.5} /> : <ZapOff size={13} strokeWidth={2.5} />}
                        </button>
                    </div>

                    {/* --- MENÚ DE USUARIO DESPLEGABLE --- */}
                    <div className="hidden md:flex items-center h-full ml-1">
                        {user ? (
                            <div className="relative flex items-center h-full" ref={dropdownRef}>
                                {/* TRIGGER: SOLO EL AVATAR */}
                                <button 
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className={cn(
                                        "flex items-center justify-center w-9 h-9 rounded-full font-black text-sm transition-all duration-300 shadow-md border-2",
                                        isUserMenuOpen 
                                            ? "bg-qb-purple text-white border-white/30 scale-105" 
                                            : "bg-qb-dark text-white border-transparent hover:scale-105 hover:bg-qb-purple/90 hover:border-white/20"
                                    )}
                                    title={user.name}
                                    aria-expanded={isUserMenuOpen}
                                    aria-haspopup="true"
                                >
                                    {user.name.charAt(0).toUpperCase()}
                                </button>

                                {/* DROPDOWN MENU CON ANIMACIÓN FLUIDA */}
                                <div className={cn(
                                    "absolute top-14 right-0 w-60 bg-white dark:bg-[#1a1a1e] border border-gray-200 dark:border-white/10 shadow-2xl rounded-none flex flex-col py-2 z-[200]",
                                    // La clave de la animación: origin en la esquina superior derecha y un ease personalizado
                                    "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform origin-top-right",
                                    isUserMenuOpen 
                                        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" 
                                        : "opacity-0 -translate-y-5 scale-90 pointer-events-none"
                                )}>
                                    
                                    <div className="px-5 py-4 border-b border-gray-100 dark:border-white/10 mb-1 bg-gray-50/50 dark:bg-white/5">
                                        <span className="block text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white truncate">
                                            {user.name}
                                        </span>
                                    </div>

                                    {userMenuLinks.map((item, idx) => (
                                        <Link 
                                            key={idx} 
                                            href={item.link} 
                                            onClick={() => setIsUserMenuOpen(false)}
                                            className="flex items-center gap-3.5 px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-qb-blue dark:hover:text-qb-cyan hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-300 group"
                                        >
                                            <item.icon size={15} strokeWidth={2.5} className="text-gray-400 dark:text-gray-500 group-hover:text-qb-blue dark:group-hover:text-qb-cyan" />
                                            {item.title}
                                        </Link>
                                    ))}

                                    <div className="h-px bg-gray-100 dark:bg-white/10 my-2 mx-2"></div>

                                    <button 
                                        onClick={(e) => { setIsUserMenuOpen(false); handleLogout(e); }} 
                                        className="flex items-center gap-3.5 px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors duration-300 text-left w-full group"
                                    >
                                        <LogOut size={15} strokeWidth={2.5} className="group-hover:text-red-600" />
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                {authLinks.map((item, idx) => (
                                    <Link key={idx} href={item.link} className={cn(
                                        "text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded transition",
                                        idx === 1 ? 'bg-qb-dark text-white hover:bg-qb-purple' : 'text-qb-dark hover:bg-qb-dark/10'
                                    )}>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-qb-dark p-2">
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* --- MENÚ MÓVIL --- */}
            {isOpen && (
                <div className="absolute top-14 left-0 w-full bg-qb-blue border-b border-qb-dark/20 md:hidden flex flex-col p-4 animate-in slide-in-from-top-2 shadow-xl z-[150]">
                    <div className="flex items-center justify-around bg-qb-dark/10 rounded-lg p-3 mb-4">
                        <div className="flex gap-4">
                            {themeOptions.map((opt) => (
                                <button key={opt.value} onClick={() => updateAppearance(opt.value)} className={cn("flex flex-col items-center gap-1", appearance === opt.value ? "text-qb-dark" : "text-qb-dark/40")}>
                                    <opt.icon size={18} />
                                    <span className="text-[8px] font-bold uppercase">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                        <div className="w-px h-8 bg-qb-dark/20"></div>
                        <button onClick={toggleEffects} className={cn("flex flex-col items-center gap-1", effectsEnabled ? "text-qb-purple" : "text-qb-dark/40")}>
                            {effectsEnabled ? <Zap size={18} fill="currentColor" /> : <ZapOff size={18} />}
                            <span className="text-[8px] font-bold uppercase">Glitch</span>
                        </button>
                    </div>

                    {links.map((item, idx) => (
                        <Link key={idx} href={item.link} className="py-3 text-xs font-black uppercase tracking-widest text-qb-dark border-b border-qb-dark/10">
                            {item.name}
                        </Link>
                    ))}

                    {user && (
                        <div className="mt-4 pt-4 border-t border-qb-dark/20 flex flex-col gap-1">
                            <div className="flex items-center gap-3 px-4 py-2 mb-2 bg-qb-dark/5 rounded">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-qb-dark text-white font-black text-sm">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-qb-dark truncate">{user.name}</span>
                            </div>

                            {userMenuLinks.map((item, idx) => (
                                <Link 
                                    key={idx} 
                                    href={item.link} 
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 py-3 px-4 text-xs font-black uppercase tracking-widest text-qb-dark hover:bg-qb-dark/10 rounded transition-colors"
                                >
                                    <item.icon size={16} strokeWidth={2.5} />
                                    {item.title}
                                </Link>
                            ))}

                            <button onClick={(e) => { setIsOpen(false); handleLogout(e); }} className="flex items-center gap-3 py-3 px-4 mt-2 text-xs font-black uppercase tracking-widest text-red-600 text-left hover:bg-red-50 rounded border-t border-qb-dark/10">
                                <LogOut size={16} strokeWidth={2.5} /> 
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
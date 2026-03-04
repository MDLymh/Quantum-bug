import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { LogOut, User, Menu, X, Search } from 'lucide-react';

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

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(logoutRoute);
    };

    return (
        <nav className="sticky top-0 z-[100] w-full bg-qb-blue h-14 flex items-center shadow-lg border-b border-white/10">
            <div className="w-full px-4 flex justify-between items-center h-full">
                
                {/* Logo e Items de Navegación */}
                <div className="flex items-center h-full">
                    {/* Reemplaza este div con tu SVG real */}
                    <Link href="/" className="mr-6 hover:scale-105 transition-transform">
                        <div className="w-8 h-8 bg-qb-dark rounded-full flex items-center justify-center">
                             <span className="text-[10px] text-qb-cyan font-bold">QB</span>
                        </div>
                    </Link>

                    {/* Links con divisores verticales (Estilo Minimalista) */}
                    <div className="hidden md:flex items-center h-full">
                        {links.map((item, idx) => (
                            <div key={idx} className="flex items-center h-full">
                                <Link 
                                    href={item.link} 
                                    className="px-4 text-[11px] font-black uppercase tracking-widest text-qb-dark hover:text-white transition-colors"
                                >
                                    {item.name}
                                </Link>
                                {/* Divisor Vertical */}
                                {idx < links.length && (
                                    <div className="h-6 w-[1px] bg-white/40"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Buscador y Auth */}
                <div className="flex items-center gap-4 h-full">
                    {/* Barra de búsqueda minimalista (como en tu imagen) */}
                    <div className="hidden sm:flex items-center bg-qb-dark/20 rounded px-3 py-1 border border-white/10">
                        <input 
                            type="text" 
                            className="bg-transparent border-none focus:ring-0 text-xs text-qb-dark placeholder-qb-dark/50 w-32"
                            placeholder="Buscar..."
                        />
                        <Search size={14} className="text-qb-dark" />
                    </div>

                    {/* Usuario / Login */}
                    <div className="flex items-center h-full">
                        {user ? (
                            <div className="flex items-center gap-3 bg-qb-dark/10 px-3 py-1 rounded-full border border-white/20">
                                <span className="text-[10px] font-bold text-qb-dark uppercase">{user.name}</span>
                                <button onClick={handleLogout} className="text-qb-dark hover:text-red-600 transition">
                                    <LogOut size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                {authLinks.map((item, idx) => (
                                    <Link 
                                        key={idx} 
                                        href={item.link}
                                        className={`text-[11px] font-black uppercase tracking-tighter px-3 py-1 rounded transition ${
                                            idx === 1 ? 'bg-qb-dark text-qb-cyan' : 'text-qb-dark hover:bg-white/20'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Botón Mobile */}
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-qb-dark">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Menú Mobile Desplegable */}
            {isOpen && (
                <div className="absolute top-14 left-0 w-full bg-qb-blue border-b border-qb-dark/20 md:hidden flex flex-col p-4 animate-in fade-in slide-in-from-top-2">
                    {links.map((item, idx) => (
                        <Link key={idx} href={item.link} className="py-2 text-xs font-bold uppercase text-qb-dark border-b border-qb-dark/5">
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
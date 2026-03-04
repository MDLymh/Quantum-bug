import Navbar from '@/components/custom/NavBar';
import MainContainer from '@/components/custom/MainContainer';
import AppLayoutTemplate from '@/layouts/app/app-nav-bar-layout';
import { blogs, faq, home, login, logout, products, register, support } from '@/routes';
import type { AppLayoutProps } from '@/types';
import { usePage } from '@inertiajs/react';

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { auth } = usePage().props;

    const links = [
        { name: 'Inicio', link: home.url() },
        { name: 'Productos', link: products.url() },
        { name: 'Soporte', link: support.url() },
        { name: 'Blogs', link: blogs.url() },
        { name: 'FAQ', link: faq.url() }
    ];

    const authLinks = [
        { name: "Iniciar Sesión", link: login.url() },
        { name: "Registrarse", link: register.url() }
    ];

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <div className="flex flex-col min-h-screen">
                {/* Navbar superior */}
                <header className="sticky top-0 z-50 bg-qb-dark/90 backdrop-blur-sm">
                    <Navbar 
                        links={links} 
                        authLinks={authLinks} 
                        logoutRoute={logout.url()} 
                        user={auth.user} 
                        logoName="QuantumBug Studio"
                    />
                </header>

                {/* Contenido principal con efectos de marca */}
                <main className="grow bg-qb-dark">
                    <MainContainer>
                        {children}
                    </MainContainer>
                </main>

                {/* Footer estilo Quantum Bug */}
                <footer className="bg-qb-cyan py-8 flex flex-col items-center gap-4">
                    <div className="flex gap-6 text-qb-dark font-bold uppercase tracking-widest text-sm">
                        <a href="#" className="hover:opacity-70 transition">Inicio</a>
                        <a href="#" className="hover:opacity-70 transition">Productos</a>
                        <a href="#" className="hover:opacity-70 transition">Soporte</a>
                        <a href="#" className="hover:opacity-70 transition">FAQ</a>
                        <a href="#" className="hover:opacity-70 transition">Blogs</a>
                    </div>
                    
                    <div className="border-t border-qb-dark/20 w-full max-w-4xl my-2"></div>
                    
                    <p className="text-qb-dark/80 text-xs font-medium">
                        © 2026 Copyright: BigQuantumStudios.com
                    </p>
                </footer>
            </div>
        </AppLayoutTemplate>
    );
}
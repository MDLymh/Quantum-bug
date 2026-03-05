import Navbar from '@/components/custom/NavBar';
import MainContainer from '@/components/custom/MainContainer';
import Footer from '@/components/custom/Footer';
import AppLayoutTemplate from '@/layouts/app/app-nav-bar-layout';
import { blogs, faq, home, login, logout, register} from '@/routes';
import products from '@/routes/products';
import support from '@/routes/support';
import type { AppLayoutProps } from '@/types';
import { usePage } from '@inertiajs/react';

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { auth } = usePage().props;

    const links = [
        { name: 'Home', link: home.url() },
        { name: 'Products', link: products.index.url() },
        { name: 'Support', link: support.index.url() },
        { name: 'Blogs', link: blogs.url() },
        { name: 'FAQ', link: faq.url() }
    ];

    const authLinks = [
        { name: "Login", link: login.url() },
        { name: "Register", link: register.url() }
    ];

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <div className="flex flex-col min-h-screen transition-colors duration-500 bg-white dark:bg-qb-dark text-gray-900 dark:text-white">
                
                {/* Header con prioridad visual */}
                <header className="sticky top-0 z-[100] w-full bg-white/80 dark:bg-qb-dark/95 backdrop-blur-md border-b border-gray-300 dark:border-white/10 transition-colors duration-500">
                    <Navbar 
                        links={links} 
                        authLinks={authLinks} 
                        logoutRoute={logout.url()} 
                        user={auth.user} 
                    />
                </header>

                {/* Main que ocupa el espacio restante */}
                <main className="flex-1 flex flex-col relative z-10">
                    <MainContainer>
                        {children}
                    </MainContainer>
                </main>

                {/* Footer siempre al final */}
                <footer className="w-full z-10 border-t border-gray-300 dark:border-white/10 transition-colors duration-500">
                    <Footer />
                </footer>
            </div>
        </AppLayoutTemplate>
    );
}
import Navbar from '@/components/custom/NavBar';
import MainContainer from '@/components/custom/MainContainer';
import Footer from '@/components/custom/Footer'; // <-- Importamos el nuevo Footer
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
            {/* El contenedor principal con flex y min-h-screen empuja el footer hacia abajo */}
            <div className="flex flex-col min-h-screen bg-qb-dark">
                
                <header className="sticky top-0 z-50 bg-qb-dark/90 backdrop-blur-sm">
                    <Navbar 
                        links={links} 
                        authLinks={authLinks} 
                        logoutRoute={logout.url()} 
                        user={auth.user} 
                        logoName="QuantumBug Studio"
                    />
                </header>

                <main className="grow flex flex-col bg-qb-dark">
                    <MainContainer>
                        {children}
                    </MainContainer>
                </main>

                <Footer />
                
            </div>
        </AppLayoutTemplate>
    );
}
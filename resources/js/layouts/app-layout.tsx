import Navbar from '@/components/custom/NavBar';
import MainContainer from '@/components/custom/MainContainer';
import Footer from '@/components/custom/Footer';
import AppLayoutTemplate from '@/layouts/app/app-nav-bar-layout';
import { faq, home, login, logout, register} from '@/routes';
import products from '@/routes/products';
import support from '@/routes/support';
import blogs from '@/routes/blogs';
import type { AppLayoutProps } from '@/types';
import { usePage } from '@inertiajs/react';

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const pageProps = usePage().props as any;
    const user = pageProps.auth?.user || null;

    const links = [
        { name: 'Home', link: home.url() },
        { name: 'Products', link: products.index.url() },
        { name: 'Support', link: support.index.url() },
        { name: 'Blogs', link: blogs.index().url },
        //to do: Add FAQ
    ];

    const authLinks = [
        { name: "Login", link: login.url() },
        { name: "Register", link: register.url() }
    ];

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <div className="min-h-screen flex flex-col relative overflow-hidden transition-colors duration-500 bg-white dark:bg-qb-dark text-gray-900 dark:text-white">
                
                <div className="hidden dark:block absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none"></div>
                <div className="block dark:hidden absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none"></div>
                <div className="hidden dark:block absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(47,244,238,0.03)_0%,transparent_60%)] pointer-events-none"></div>

                <header className="sticky top-0 z-100 w-full bg-white/80 dark:bg-qb-dark/95 backdrop-blur-md transition-colors duration-500 border-b border-gray-200 dark:border-white/10">
                    <Navbar 
                        links={links} 
                        authLinks={authLinks} 
                        logoutRoute={logout.url()} 
                        user={user}
                    />
                </header>

                <main className="grow flex flex-col relative z-10">
                    <MainContainer>
                        {children}
                    </MainContainer>
                </main>

                <div className="z-10 relative mt-4">
                    <Footer />
                </div>
            </div>
        </AppLayoutTemplate>
    );
}
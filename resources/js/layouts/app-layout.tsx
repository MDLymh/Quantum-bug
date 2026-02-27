import { index } from '@/actions/Laravel/Fortify/Http/Controllers/RecoveryCodeController';
import Navbar from '@/components/custom/NavBar';
import AppLayoutTemplate from '@/layouts/app/app-nav-bar-layout';
import { blogs, faq, home, login, logout, products, register, support } from '@/routes';
import type { AppLayoutProps } from '@/types';
import { usePage } from '@inertiajs/react';

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
        const { auth } = usePage().props;
        const links = [
            { name: 'Home', link: home.url() },
            { name: 'Products', link: products.url() },
            { name: 'support', link: support.url() },
            //{ name: 'FAQ', link: faq.url() },
            { name: 'Blogs', link: blogs.url() }
        ];
        const authLinks = [
            { name: "Login", link: login.url() },
            { name: "Sign Up", link: register.url() }
        ];
        return (
            <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
                <Navbar links={links} authLinks={authLinks} logoutRoute={logout.url()} user={auth.user} />
                {children}
            </AppLayoutTemplate>
        )
}

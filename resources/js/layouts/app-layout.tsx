import Navbar from '@/components/custom/NavBar';
import AppLayoutTemplate from '@/layouts/app/app-nav-bar-layout';
import { login, logout, register } from '@/routes';
import type { AppLayoutProps } from '@/types';
import { usePage } from '@inertiajs/react';

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
        const { auth } = usePage().props;
        const links = [
            { name: 'Home', link: '/' },
            { name: 'Products', link: '/products' },
            { name: 'support', link: '/support' },
            { name: 'FAQ', link: '/faq' },
            { name: 'Blogs', link: '/blogs' }
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

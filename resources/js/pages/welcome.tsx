import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register, logout} from '@/routes';
import NavBar  from '@/components/custom/NavBar';
import { link } from 'fs';
import AppNavbarLayout from '@/layouts/app/app-nav-bar-layout';
import AppLayout from '@/layouts/app-layout';
export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;
    
    return (
        <AppLayout>
            <></>
        </AppLayout>
    );
}

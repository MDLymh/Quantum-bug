import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    return (
        <AuthLayout
            title="Access"
            description="Authenticate to enter Quantum Bug Studio"
        >
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="user@quantumbug.com"
                                    className="bg-qb-dark/50 border-white/20 text-white placeholder-gray-600 focus-visible:ring-1 focus-visible:ring-qb-cyan focus-visible:border-qb-cyan rounded-none"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                                        Password
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-[10px] uppercase font-bold text-qb-cyan hover:text-white transition-colors"
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className="bg-qb-dark/50 border-white/20 text-white placeholder-gray-600 focus-visible:ring-1 focus-visible:ring-qb-cyan focus-visible:border-qb-cyan rounded-none"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="border-white/30 data-[state=checked]:bg-qb-cyan data-[state=checked]:text-qb-dark rounded-sm"
                                />
                                <Label htmlFor="remember" className="text-xs text-gray-400 font-medium cursor-pointer">
                                    Remember me
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full bg-qb-purple text-white hover:bg-qb-cyan hover:text-qb-dark rounded-none font-black uppercase tracking-widest shadow-[0_0_15px_rgba(209,48,242,0.3)] hover:shadow-[0_0_20px_rgba(47,244,238,0.5)] transition-all duration-300"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner className="mr-2" />}
                                Login
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="text-center text-xs text-gray-400 font-medium mt-2 border-t border-white/10 pt-6">
                                Don't have an account?{' '}
                                <TextLink href={register()} tabIndex={5} className="text-qb-blue font-bold uppercase tracking-widest hover:text-white transition-colors">
                                    Sign up
                                </TextLink>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-black uppercase tracking-widest text-qb-cyan mt-4">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
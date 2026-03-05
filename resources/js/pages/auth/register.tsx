import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <AuthLayout
            title="Register"
            description="Create your Quantum Bug Studio access credential"
        >
            <Head title="Register" />
            
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-5 mt-4"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-gray-300">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        name="name"
                                        placeholder="John"
                                        className="bg-qb-dark/50 border-white/20 text-white placeholder-gray-600 focus-visible:ring-1 focus-visible:ring-qb-cyan focus-visible:border-qb-cyan rounded-none"
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="last_name" className="text-[10px] font-black uppercase tracking-widest text-gray-300">Last Name</Label>
                                    <Input
                                        id="last_name"
                                        type="text"
                                        required
                                        tabIndex={2}
                                        autoComplete="last_name"
                                        name="last_name"
                                        placeholder="Doe"
                                        className="bg-qb-dark/50 border-white/20 text-white placeholder-gray-600 focus-visible:ring-1 focus-visible:ring-qb-cyan focus-visible:border-qb-cyan rounded-none"
                                    />
                                    <InputError message={errors.last_name} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-gray-300">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={3}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="user@quantumbug.com"
                                    className="bg-qb-dark/50 border-white/20 text-white placeholder-gray-600 focus-visible:ring-1 focus-visible:ring-qb-cyan focus-visible:border-qb-cyan rounded-none"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="flex gap-4">
                                <div className="flex flex-col gap-2 w-1/3">
                                    <Label htmlFor="country_code" className="text-[10px] font-black uppercase tracking-widest text-gray-300">Code</Label>
                                    <Input
                                        id="country_code"
                                        type="text"
                                        tabIndex={4}
                                        autoComplete="country_code"
                                        name="country_code"
                                        placeholder="+52"
                                        className="bg-qb-dark/50 border-white/20 text-white placeholder-gray-600 focus-visible:ring-1 focus-visible:ring-qb-cyan focus-visible:border-qb-cyan rounded-none text-center"
                                    />
                                    <InputError message={errors.country_code} />
                                </div>
                                <div className="flex flex-col gap-2 flex-grow">
                                    <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-gray-300">Phone</Label>
                                    <Input
                                        id="phone"
                                        type="text"
                                        tabIndex={5}
                                        autoComplete="phone"
                                        name="phone"
                                        placeholder="Phone Number"
                                        className="bg-qb-dark/50 border-white/20 text-white placeholder-gray-600 focus-visible:ring-1 focus-visible:ring-qb-cyan focus-visible:border-qb-cyan rounded-none"
                                    />
                                    <InputError message={errors.phone} />
                                </div>
                            </div>

                            {/* Contraseñas en 2 columnas (Opcional, pero ayuda a ahorrar espacio) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-gray-300">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={6}
                                        autoComplete="new-password"
                                        name="password"
                                        placeholder="••••••••"
                                        className="bg-qb-dark/50 border-white/20 text-white placeholder-gray-600 focus-visible:ring-1 focus-visible:ring-qb-cyan focus-visible:border-qb-cyan rounded-none"
                                    />
                                    <InputError message={errors.password} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation" className="text-[10px] font-black uppercase tracking-widest text-gray-300">Confirm Password</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        tabIndex={7}
                                        autoComplete="new-password"
                                        name="password_confirmation"
                                        placeholder="••••••••"
                                        className="bg-qb-dark/50 border-white/20 text-white placeholder-gray-600 focus-visible:ring-1 focus-visible:ring-qb-cyan focus-visible:border-qb-cyan rounded-none"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full bg-qb-purple text-white hover:bg-qb-cyan hover:text-qb-dark rounded-none font-black uppercase tracking-widest shadow-[0_0_15px_rgba(209,48,242,0.3)] hover:shadow-[0_0_20px_rgba(47,244,238,0.5)] transition-all duration-300"
                                tabIndex={8}
                                data-test="register-user-button"
                                disabled={processing}
                            >
                                {processing && <Spinner className="mr-2" />}
                                Initialize Account
                            </Button>
                        </div>

                        <div className="text-center text-xs text-gray-400 font-medium mt-2 border-t border-white/10 pt-6">
                            Already have an account?{' '}
                            <TextLink href={login()} tabIndex={9} className="text-qb-cyan font-bold uppercase tracking-widest hover:text-white transition-colors">
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
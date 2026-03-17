import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Terminal, Box, ArrowRight, Zap, ShieldAlert, Cpu } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { SimplifiedProduct } from '@/types/product';
import productsRoutes from '@/routes/products';

interface GameProduct extends SimplifiedProduct {
  image_url?: string;
}

export default function Home() {
    const { products } = usePage().props as any as { products: GameProduct[] };

    const displayProducts = products ? products.slice(0, 6) : [];

    return (
        <AppLayout>
            <Head title="Home" />
            <section className="relative w-full min-h-[75vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden border-b border-gray-200 dark:border-white/10">
                

                <div className="relative z-10 flex flex-col items-center">
                    <h1 
                        className="text-6xl md:text-8xl lg:text-9xl font-black text-gray-900 dark:text-white uppercase tracking-tighter relative inline-block mb-6 glitch-title"
                        style={{ textShadow: '4px 0px 0px #2FF4EE, -4px 0px 0px #D130F2' }}
                    >
                        Quantum Bug
                    </h1>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base font-bold uppercase tracking-widest max-w-2xl mb-10 leading-relaxed">
                        Pushing the boundaries of gaming and emulation. <br className="hidden md:block"/>
                        Access our experimental builds, report anomalies, and join the core.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <Button 
                            asChild 
                            size="lg"
                            className="w-full sm:w-auto h-14 px-8 rounded-none font-black uppercase tracking-widest text-xs transition-all duration-300 bg-qb-dark text-white hover:bg-qb-blue shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:bg-qb-cyan dark:text-qb-dark dark:hover:bg-white dark:hover:shadow-[0_0_20px_rgba(47,244,238,0.6)]"
                        >
                            <Link href="/products" className="flex items-center justify-center gap-2">
                                <Cpu size={16} /> Explore Products
                            </Link>
                        </Button>

                        <Button 
                            asChild 
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto h-14 px-8 rounded-none font-black uppercase tracking-widest text-xs transition-all duration-300 border-2 border-gray-300 dark:border-white/20 bg-transparent text-gray-800 dark:text-white hover:border-qb-purple hover:text-qb-purple dark:hover:border-qb-purple dark:hover:text-qb-purple"
                        >
                            <Link href="/reports" className="flex items-center justify-center gap-2">
                                <ShieldAlert size={16} /> Report a problem
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section className="w-full max-w-7xl mx-auto px-4 py-20 relative">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Box className="text-qb-purple" size={20} />
                            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                                Core Products
                            </h2>
                        </div>
                        <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                            The latest stable and experimental products available in our registry.
                        </p>
                    </div>

                    <Link href="/products" className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-qb-dark dark:text-white hover:text-qb-cyan transition-colors">
                        View All Products <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayProducts.length > 0 ? (
                        displayProducts.map((product, index) => {
                            const hasImage = !!product.image_url;

                            return (
                                <Card 
                                    key={String(product.id)} 
                                    className={cn(
                                        "relative flex flex-col h-full overflow-hidden border rounded-none group transition-colors duration-300 shadow-lg",
                                        "border-gray-200 dark:border-white/5 hover:border-qb-blue/50 dark:hover:border-qb-cyan/50",
                                        !hasImage && "bg-white dark:bg-[#2a2a2e]",
                                        hasImage && "bg-transparent",
                                        index === 0 ? "md:col-span-2 lg:col-span-1" : "" 
                                    )}
                                    style={hasImage ? {
                                        backgroundImage: `url(${product.image_url})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    } : undefined}
                                >
                                    <div className="glitch-decor absolute top-0 left-0 w-full h-1 z-20 bg-qb-blue dark:bg-qb-purple scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                                    
                                    {hasImage && (
                                        <div className="absolute inset-0 z-10 backdrop-blur-[3px] transition-all duration-500 bg-white/90 group-hover:bg-white/75 dark:bg-qb-dark/80 dark:group-hover:bg-qb-dark/60"></div>
                                    )}

                                    <div className="relative z-20 flex flex-col h-full">
                                        <CardHeader>
                                            <CardTitle className="text-2xl font-bold uppercase tracking-tight transition-colors text-qb-dark dark:text-qb-blue group-hover:text-qb-blue dark:group-hover:text-qb-cyan">
                                                {product.name}
                                            </CardTitle>
                                            
                                            <Badge 
                                                variant="outline" 
                                                className="w-fit rounded-sm uppercase tracking-widest text-[10px] font-black transition-colors bg-gray-100 text-qb-dark border-gray-300 dark:bg-qb-cyan/10 dark:text-qb-cyan dark:border-qb-cyan/30"
                                            >
                                                {product.category?.name || 'System'}
                                            </Badge>
                                        </CardHeader>
                                        
                                        <CardContent className="grow">
                                            <p className={cn(
                                                "text-sm line-clamp-4 transition-colors",
                                                hasImage ? "text-gray-700 dark:text-gray-200" : "text-gray-600 dark:text-gray-400"
                                            )}>
                                                {product.description}
                                            </p>
                                        </CardContent>
                                        <CardFooter className="justify-between border-t pt-4 mt-auto rounded-none transition-colors border-gray-200 dark:border-white/10">
                                            <span className="text-xs text-gray-500 font-mono font-bold">
                                                {product.last_estable_version ? `v.${product.last_estable_version}` : 'BETA'}
                                            </span>
                                            
                                            <Button 
                                                asChild 
                                                variant="ghost" 
                                                className="p-0 font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-colors rounded-none hover:bg-transparent text-qb-dark dark:text-white hover:text-qb-blue dark:hover:text-qb-cyan"
                                            >
                                                <Link href={productsRoutes.show.url({ product: product.name.replaceAll(" ", "-") })}>
                                                    Access Module <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
                                                </Link>
                                            </Button>
                                        </CardFooter>
                                    </div>
                                </Card>
                            );
                        })
                    ) : (
                        <div className="col-span-full py-12 text-center border border-dashed border-gray-200 dark:border-white/10 text-gray-500 font-bold uppercase tracking-widest text-xs">
                            No systems available in the registry.
                        </div>
                    )}
                </div>

            </section>
        </AppLayout>
    );
}
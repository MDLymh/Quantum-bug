import AppLayout from '@/layouts/app-layout';
import { usePage, Link } from '@inertiajs/react';
import { SimplifiedProduct } from '@/types/product';
import products from '@/routes/products';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GameProduct extends SimplifiedProduct {
  image_url?: string;
}

export default function Index() {
  const { products: productList } = usePage().props as any as { products: GameProduct[] };

  return (
    <AppLayout>
      <div className="flex flex-col gap-8 w-full">
        <div className="mb-4">
          <h1 
            className="text-4xl md:text-6xl font-black text-black dark:text-white uppercase tracking-widest relative inline-block"
            style={{ textShadow: '3px 0px 0px #2FF4EE, -3px 0px 0px #D130F2' }}
          >
            Products
          </h1>
          <p className="dark:text-gray-500 text-gray-800 mt-2 text-sm font-medium italic">
            Explore our latest titles and emulators.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products && productList.map((product) => {
            const hasImage = !!product.image_url;

            return (
              <Card 
                key={String(product.id)} 
                className={cn(
                  "relative flex flex-col h-full overflow-hidden border rounded-none group transition-colors duration-300 shadow-lg",
                  "border-gray-200 dark:border-white/5 hover:border-qb-blue/50 dark:hover:border-qb-cyan/50",
                  !hasImage && "bg-white dark:bg-[#2a2a2e]",
                  hasImage && "bg-transparent" 
                )}
                style={hasImage ? {
                  backgroundImage: `url(${product.image_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                } : undefined}
              >
                <div className="glitch-decor absolute top-0 left-0 w-full h-1 z-20 bg-qb-blue dark:bg-qb-purple scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                
                {hasImage && (
                  <div className="absolute inset-0 z-10 backdrop-blur-[3px] transition-all duration-500
                                  bg-white/90 group-hover:bg-white/75 
                                  dark:bg-qb-dark/80 dark:group-hover:bg-qb-dark/60">
                  </div>
                )}

                <div className="relative z-20 flex flex-col h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold uppercase tracking-tight transition-colors
                                          text-qb-dark dark:text-qb-blue">
                      {product.name}
                    </CardTitle>
                    
                    <Badge 
                      variant="outline" 
                      className="w-fit rounded-sm uppercase tracking-widest text-[10px] font-black transition-colors
                                bg-gray-100 text-qb-dark border-gray-300 
                                dark:bg-qb-cyan/10 dark:text-qb-cyan dark:border-qb-cyan/30"
                    >
                      {product.category.name}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="grow">
                    <p className={cn(
                      "text-sm line-clamp-4 transition-colors",
                      hasImage 
                          ? "text-gray-700 dark:text-gray-200" 
                          : "text-gray-600 dark:text-gray-400"
                    )}>
                      {product.description}
                    </p>
                  </CardContent>
                
                  {/* Footer y botón */}
                  <CardFooter className="justify-between border-t pt-4 mt-auto rounded-none transition-colors
                                        border-gray-200 dark:border-white/10">
                    <span className="text-xs text-gray-500 font-mono">
                      v.{product.last_estable_version}
                    </span>
                    
                    <Button 
                      asChild 
                      variant="ghost" 
                      className="p-0 font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-colors rounded-none hover:bg-transparent
                                text-qb-dark dark:text-white hover:text-qb-blue dark:hover:text-qb-cyan"
                    >
                      <Link href={products.show.url({ product: product.name.replaceAll(" ", "-") })}>
                        See More 
                        <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
                      </Link>
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
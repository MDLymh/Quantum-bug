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
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-widest relative inline-block"
            style={{ textShadow: '3px 0px 0px #2FF4EE, -3px 0px 0px #D130F2' }}
          >
            Products
          </h1>
          <p className="text-gray-400 mt-2 text-sm font-medium italic">
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
                  "relative flex flex-col h-full overflow-hidden border-white/5 rounded-none group hover:border-qb-cyan/50 transition-colors duration-300 shadow-lg",
                  !hasImage && "bg-[#2a2a2e]",
                  hasImage && "bg-transparent text-white" 
                )}
                style={hasImage ? {
                  backgroundImage: `url(${product.image_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                } : undefined}
              >
                <div className="absolute top-0 left-0 w-full h-1 z-20 bg-qb-purple scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                
                {hasImage && (
                  <div className="absolute inset-0 z-10 bg-qb-dark/80 backdrop-blur-[3px] group-hover:bg-qb-dark/60 transition-all duration-500"></div>
                )}

                <div className="relative z-20 flex flex-col h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-qb-blue uppercase tracking-tight">
                      {product.name}
                    </CardTitle>
                    <Badge 
                      variant="outline" 
                      className="w-fit bg-qb-cyan/10 text-qb-cyan border-qb-cyan/30 rounded-sm uppercase tracking-widest text-[10px] font-black"
                    >
                      {product.category.name}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="grow">
                    <p className={cn(
                      "text-sm line-clamp-4",
                      hasImage ? "text-gray-200" : "text-gray-400"
                    )}>
                      {product.description}
                    </p>
                  </CardContent>
                  
                  <CardFooter className="justify-between border-t border-white/10 pt-4 mt-auto rounded-none">
                    <span className="text-xs text-gray-500 font-mono">
                      v.{product.last_estable_version}
                    </span>
                    
                    <Button 
                      asChild 
                      variant="ghost" 
                      className="text-white hover:text-qb-cyan hover:bg-transparent p-0 font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-colors rounded-none"
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
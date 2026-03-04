import AppLayout from '@/layouts/app-layout';
import { blogs } from '@/routes';
import reports from '@/routes/reports';
import { SimplifiedProduct } from '@/types/product';
import { usePage, Link } from '@inertiajs/react';

// shadcn/ui components
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bug, Wrench, AlertTriangle, Gamepad2 } from 'lucide-react';

export default function Index() {
  const { products } = usePage().props as any as { products: SimplifiedProduct[] };

  return (
    <AppLayout>
      <div className="flex flex-col gap-8 w-full">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-6">
          <div>
            <h1 
              className="text-4xl md:text-6xl font-black text-white uppercase tracking-widest relative inline-block"
              style={{ textShadow: '3px 0px 0px #2FF4EE, -3px 0px 0px #D130F2' }}
            >
              Support
            </h1>
            <p className="text-gray-400 mt-4 text-sm font-medium italic">
              Check for updates, known errors, or report a new bug.
            </p>
          </div>
          
          <Button 
            asChild 
            className="bg-qb-purple text-white hover:bg-qb-cyan hover:text-qb-dark rounded-none font-black uppercase tracking-widest px-6 py-6 shadow-[0_0_15px_rgba(209,48,242,0.3)] hover:shadow-[0_0_20px_rgba(47,244,238,0.5)] transition-all duration-300 group"
          >
            <Link href={reports.index().url}>
              <AlertTriangle className="w-5 h-5 mr-2 group-hover:animate-pulse" /> 
              Create Report
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {products && products.map((product) => (
            <Card 
              key={String(product.id)} 
              className="bg-[#2a2a2e] border border-white/5 rounded-none group hover:border-white/20 transition-colors duration-300 shadow-lg relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 left-0 w-full h-1 z-20 bg-qb-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>

              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-qb-dark/50 border border-white/10 rounded">
                    <Gamepad2 className="w-5 h-5 text-qb-cyan" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white uppercase tracking-tight">
                    {product.name}
                  </CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="flex flex-col gap-3 mt-auto">
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full justify-start bg-transparent border-white/10 text-gray-300 hover:text-qb-cyan hover:border-qb-cyan hover:bg-qb-cyan/10 rounded-none uppercase tracking-widest text-xs font-bold transition-all"
                >
                  <Link href={blogs.url({ query: { tags: [product.name, "updates"] } })}>
                    <Wrench className="w-4 h-4 mr-3 text-qb-cyan" /> 
                    Updates
                  </Link>
                </Button>

                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full justify-start bg-transparent border-white/10 text-gray-300 hover:text-qb-purple hover:border-qb-purple hover:bg-qb-purple/10 rounded-none uppercase tracking-widest text-xs font-bold transition-all"
                >
                  <Link href={blogs.url({ query: { tags: [product.name, "bugs"] } })}>
                    <Bug className="w-4 h-4 mr-3 text-qb-purple" /> 
                    Known Errors
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </AppLayout>
  );
}
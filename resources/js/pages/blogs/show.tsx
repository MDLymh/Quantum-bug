import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import blogs from '@/routes/blogs';



export default function Show() {
    const {blog,htmlContent} = usePage().props;
  return (
    <AppLayout>
        <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                
                {/* Usamos la clase 'prose' de Tailwind Typography (si lo tienes instalado) 
                  para darle estilos automáticos a los h1, p, ul, etc. 
                */}
                <div 
                    className="prose prose-lg dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: htmlContent }} 
                />
                
            </div>
    </AppLayout>
  );
}
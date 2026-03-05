import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import blogs from '@/routes/blogs';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export default function Index() {
    const {blogs:blogList} = usePage().props;
    console.log(blogList.data[0]);
  return (
    <AppLayout>
      <div className="flex flex-col gap-8 w-full py-6">
        
        <div className="mb-6">
          <h1 
            className="text-4xl md:text-6xl font-black text-black dark:text-white uppercase tracking-widest relative inline-block"
            style={{ textShadow: '3px 0px 0px #2FF4EE, -3px 0px 0px #D130F2' }}
          >
            Blogs
          </h1>
          <p className="dark:text-gray-500 text-gray-800 mt-4 text-sm font-medium italic">
            Latest news, patch notes, and behind-the-scenes from our developers and artists.
          </p>
        </div>

        <div className="max-w-4xl mx-auto py-8">
                <h1 className="text-2xl font-bold mb-6">Reportes</h1>

                {/* 1. Mostramos los datos */}
                <div className="flex flex-col gap-4 mb-8">
                    {blogList.data.map((blog: any) => (
                        <a href={blogs.show(blog.file_name).url} key={blog.id} className="p-4 border rounded shadow-sm">
                            <p className="font-semibold">{blog.title}</p>
                            <p className="text-sm text-gray-500">{blog.publisher}</p>
                        </a>
                    ))}
                </div>

                {/* 2. Dibujamos los controles de Paginación */}
                <div className="flex flex-wrap gap-2">
                    {blogList.links.map((link: PaginationLink, index: number) => (
                        link.url ? (
                            <Link
                                key={index}
                                href={link.url}
                                // dangerouslySetInnerHTML se usa aquí porque Laravel envía 
                                // las flechas de Anterior/Siguiente como entidades HTML (&laquo; &raquo;)
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-4 py-2 border rounded ${
                                    link.active ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'
                                }`}
                            />
                        ) : (
                            // Si link.url es null (ej: el botón "Anterior" en la página 1)
                            <span
                                key={index}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className="px-4 py-2 border rounded text-gray-400 bg-gray-50 cursor-not-allowed"
                            />
                        )
                    ))}
                </div>
            </div>

      </div>
    </AppLayout>
  );
}
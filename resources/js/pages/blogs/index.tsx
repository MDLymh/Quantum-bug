import { Head, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import blogs from '@/routes/blogs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar, User as UserIcon } from 'lucide-react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Blog {
    id: number;
    title: string;
    file_name: string;
    publisher: string;
    created_at?: string;
    // Si tuvieras una imagen o descripción corta, irían aquí.
    description?: string; 
    image_url?: string;
}

export default function Index() {
    const { blogs: blogList } = usePage().props as unknown as { 
        blogs: { data: Blog[], links: PaginationLink[] } 
    };

    return (
        <AppLayout>
            <Head title="Latest News & Devlogs" />
            
            <div className="w-full max-w-7xl mx-auto pt-8 pb-20 px-4 md:px-0 transition-colors duration-300">
                
                <div className="relative mb-12 border-b border-gray-200 dark:border-white/10 pb-8 pt-4">
                    <div className="glitch-decor absolute top-0 left-0 w-full h-1 bg-linear-to-r from-qb-blue via-qb-cyan to-qb-purple"></div>
                    
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter glitch-title mt-4">
                        Blogs
                    </h1>
                    <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-4 max-w-2xl leading-relaxed">
                        Latest news, patch notes, and behind-the-scenes from our developers and artists.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {blogList.data.map((blog) => (
                        <Card 
                            key={blog.id} 
                            className="bg-white dark:bg-[#1a1a1e] border border-gray-200 dark:border-white/5 rounded-none group hover:border-qb-blue dark:hover:border-qb-cyan transition-all duration-500 shadow-lg hover:shadow-xl relative flex flex-col h-full"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 z-20 bg-qb-blue dark:bg-qb-purple scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            
                            <div className="absolute left-0 top-6 bottom-6 w-1 bg-gray-100 dark:bg-white/5 group-hover:bg-qb-cyan transition-colors duration-500"></div>

                            <CardHeader className="pl-8 pb-2">
                                <CardTitle className="text-xl md:text-2xl font-bold text-qb-dark dark:text-white uppercase tracking-tight group-hover:text-qb-blue dark:group-hover:text-qb-cyan transition-colors line-clamp-2">
                                    {blog.title}
                                </CardTitle>
                            </CardHeader>
                            
                            <CardContent className="pl-8 grow flex flex-col gap-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                                    {blog.description || "Read the full transmission to learn more about this update..."}
                                </p>
                                
                                <div className="flex flex-wrap items-center gap-4 mt-auto pt-4 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-500">
                                    <div className="flex items-center gap-1.5">
                                        <UserIcon size={12} className="text-qb-blue dark:text-qb-purple" />
                                        <span>{blog.publisher}</span>
                                    </div>
                                    {blog.created_at && (
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={12} className="text-gray-400" />
                                            <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                            
                            <CardFooter className="pl-8 pt-4 pb-6 mt-auto border-t border-gray-100 dark:border-white/5">
                                <Button 
                                    asChild 
                                    variant="ghost" 
                                    className="p-0 font-bold text-xs uppercase tracking-widest flex items-center gap-2 rounded-none hover:bg-transparent text-qb-dark dark:text-white group-hover:text-qb-blue dark:group-hover:text-qb-cyan"
                                >
                                    <Link href={blogs.show(blog.file_name).url}>
                                        Read Transmission 
                                        <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {blogList.links.length > 3 && (
                    <div className="flex justify-center items-center gap-2 mt-8 pt-8 border-t border-gray-200 dark:border-white/10">
                        {blogList.links.map((link, index) => (
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={cn(
                                        "min-w-[40px] h-10 flex items-center justify-center px-4 font-black uppercase tracking-widest text-xs rounded-none transition-all duration-300 border",
                                        link.active 
                                            ? "bg-qb-dark dark:bg-qb-cyan text-white dark:text-qb-dark border-qb-dark dark:border-qb-cyan" 
                                            : "bg-white dark:bg-[#1a1a1e] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-qb-blue dark:hover:border-qb-cyan hover:text-qb-blue dark:hover:text-qb-cyan"
                                    )}
                                />
                            ) : (
                                <span
                                    key={index}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className="min-w-[40px] h-10 flex items-center justify-center px-4 font-black uppercase tracking-widest text-xs border border-gray-200 dark:border-white/5 text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-white/5 cursor-not-allowed"
                                />
                            )
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
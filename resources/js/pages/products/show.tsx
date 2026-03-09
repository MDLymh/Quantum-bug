import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { ExtendedProduct } from '@/types/product';
import { cn } from '@/lib/utils';
import { Box, Tag, FileText, GitCommit, ExternalLink, CheckCircle2, FlaskConical, Calendar, ArrowRight } from 'lucide-react';

export default function Show() {
    const { productInfo } = usePage().props as any as { productInfo: ExtendedProduct };

    return (
        <AppLayout>
            <div className="w-full max-w-6xl mx-auto pt-6 pb-20 px-4 md:px-0 transition-colors duration-300">
                
                <div className="relative mb-8 border-b border-gray-200 dark:border-white/10 pb-6 pt-4">
                    <div className="glitch-decor absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-qb-blue via-qb-cyan to-qb-purple"></div>
                    <div className="flex items-center gap-3 mb-3 mt-2">
                        <Box className="text-qb-cyan" size={18} />
                        <span className="text-xs font-black uppercase tracking-widest text-qb-cyan">
                            System Registry
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter glitch-title">
                        {productInfo.name}
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                                <FileText size={14}/> Product Overview
                            </h2>
                            <div className="p-6 md:p-8 bg-white dark:bg-[#1a1a1e] border border-gray-200 dark:border-white/5 text-sm text-gray-800 dark:text-gray-300 leading-relaxed whitespace-pre-wrap shadow-sm">
                                {productInfo.description}
                            </div>
                        </section>

                        <section className="mt-4">
                            <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-6 flex items-center gap-2 border-b border-gray-200 dark:border-white/10 pb-3">
                                <GitCommit size={14}/> Version History
                            </h2>
                            
                            <div className="pl-4 md:pl-6 border-l-2 border-gray-200 dark:border-white/10 space-y-8">
                                {productInfo.versions.length > 0 ? (
                                    productInfo.versions.map((v, index) => (
                                        <div key={String(v.id)} className="relative">
                                            <div className={cn(
                                                "absolute -left-[21px] md:-left-[29px] top-1 w-4 h-4 rounded-full border-4 border-white dark:border-[#1a1a1e]",
                                                v.is_stable ? "bg-green-500" : "bg-qb-purple"
                                            )}></div>

                                            <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-qb-cyan/50 transition-colors">
                                                
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-lg font-black text-gray-900 dark:text-white tracking-wide">
                                                            {v.version}
                                                        </span>
                                                        
                                                        {v.is_stable ? (
                                                            <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-green-500/10 text-green-500 border border-green-500/20">
                                                                <CheckCircle2 size={10} /> Stable
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-qb-purple/10 text-qb-purple border border-qb-purple/20">
                                                                <FlaskConical size={10} /> Beta
                                                            </span>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                                                        <Calendar size={12} />
                                                        <span>{v.created_at}</span>
                                                    </div>
                                                </div>

                                                <a 
                                                    href={v.change_log_url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-qb-dark dark:text-white hover:text-qb-blue dark:hover:text-qb-cyan transition-colors"
                                                >
                                                    View Changelog <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </a>
                                                
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-xs text-gray-500 uppercase tracking-widest pl-4">No versions registered yet.</div>
                                )}
                            </div>
                        </section>

                    </div>

                    <aside className="w-full">
                        <div className="bg-white dark:bg-[#1a1a1e] border border-gray-200 dark:border-white/5 p-6 flex flex-col gap-6 relative shadow-sm sticky top-24">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-qb-cyan to-qb-blue"></div>

                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2">
                                    <Tag size={12} /> Category
                                </p>
                                <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-white/10 text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide border border-gray-200 dark:border-white/10 mt-1">
                                    {productInfo.category.name}
                                </span>
                            </div>

                            <div className="h-px w-full bg-gray-100 dark:bg-white/5"></div>

                            <div className="flex flex-col gap-5">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2">
                                        <ArrowRight size={12} className="text-qb-cyan" /> Current Build
                                    </p>
                                    <p className="text-xl font-black text-qb-cyan tracking-wide">
                                        {productInfo.current_version || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2">
                                        <CheckCircle2 size={12} className="text-green-500" /> Latest Stable
                                    </p>
                                    <p className="text-lg font-black text-green-500 tracking-wide">
                                        {productInfo.last_stable_version || 'N/A'}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </aside>

                </div>
            </div>
        </AppLayout>
    );
}
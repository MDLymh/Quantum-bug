import AppLayout from '@/layouts/app-layout';
import reports from '@/routes/reports';
import { ExtendedReport } from '@/types/report';
import { usePage, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Terminal, Calendar, User, Tag, Box, AlertCircle, Clock, CheckCircle2, CircleDashed, MessageSquare, Send, ImageIcon, FileText } from 'lucide-react';

export default function Show() {
    const { report } = usePage().props as unknown as { report: ExtendedReport };
    
    const { data, setData, post, processing, errors, reset } = useForm({
        content: '',
        ticket_id: report.ticket
    });

    const submitComment = (e: React.FormEvent) => {
        e.preventDefault();
        post(reports.comment().url, {
            preserveScroll: true, 
            onSuccess: () => {
                reset('content');
            }
        });
    };

    // Reutilizamos la lógica visual de los estados
    const getStatusConfig = (status: string) => {
        const normalized = status.toLowerCase();
        switch (normalized) {
            case 'open':
            case 'abierto':
                return { classes: "bg-qb-cyan/10 text-qb-cyan border-qb-cyan/30", icon: <AlertCircle size={16} /> };
            case 'in progress':
            case 'en progreso':
                return { classes: "bg-qb-purple/10 text-qb-purple border-qb-purple/30", icon: <Clock size={16} /> };
            case 'resolved':
            case 'resuelto':
            case 'closed':
                return { classes: "bg-green-500/10 text-green-500 border-green-500/30", icon: <CheckCircle2 size={16} /> };
            default:
                return { classes: "bg-gray-500/10 text-gray-400 border-gray-500/30", icon: <CircleDashed size={16} /> };
        }
    };

    const statusConfig = getStatusConfig(report.status);
    const baseInputClasses = "flex w-full rounded-none border border-gray-300 dark:border-white/10 bg-transparent dark:bg-[#1a1a1e] px-4 py-3 text-sm text-gray-900 dark:text-white ring-offset-background placeholder:text-gray-400 dark:placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-qb-cyan focus-visible:border-qb-cyan disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-300";

    return (
        <AppLayout>
            <div className="w-full max-w-6xl mx-auto pt-6 pb-20 px-4 md:px-0 transition-colors duration-300">
                
                {/* --- HEADER --- */}
                <div className="relative mb-8 border-b border-gray-200 dark:border-white/10 pb-6 pt-4">
                    <div className="glitch-decor absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-qb-blue via-qb-cyan to-qb-purple"></div>
                    <div className="flex items-center gap-3 mb-3 mt-2">
                        <Terminal className="text-qb-cyan" size={18} />
                        <span className="text-xs font-black uppercase tracking-widest text-qb-cyan">
                            Foil ID: {report.ticket}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter glitch-title">
                        {report.title}
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* --- COLUMNA PRINCIPAL (Izquierda) --- */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        
                        {/* Descripción */}
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                                <FileText size={14}/> Transmission Log
                            </h2>
                            <div className="p-6 md:p-8 bg-white dark:bg-[#1a1a1e] border border-gray-200 dark:border-white/5 text-sm text-gray-800 dark:text-gray-300 leading-relaxed whitespace-pre-wrap shadow-sm">
                                {report.description}
                            </div>
                        </section>

                        {/* Imágenes (Si existen) */}
                        {report.images && report.images.length > 0 && (
                            <section>
                                <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                                    <ImageIcon size={14}/> Attached Evidence
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {report.images.map(e => (
                                        <a href={e.link} target="_blank" rel="noreferrer" key={e.name} className="block group overflow-hidden border border-gray-200 dark:border-white/10 relative bg-gray-50 dark:bg-black">
                                            <div className="absolute inset-0 bg-qb-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                                                <span className="text-white font-bold text-xs uppercase tracking-widest drop-shadow-md">View Full</span>
                                            </div>
                                            <img className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" alt={e.name} src={e.link}/>
                                        </a>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Comentarios */}
                        <section className="mt-4">
                            <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2 border-b border-gray-200 dark:border-white/10 pb-3">
                                <MessageSquare size={14}/> Communications ({report.comments.length})
                            </h2>
                            
                            {/* Lista de Comentarios */}
                            <div className="flex flex-col gap-4 mb-8">
                                {report.comments.length > 0 ? (
                                    report.comments.map(e => (
                                        <div key={String(e.id)} className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-white/5 border-l-2 border-qb-purple">
                                            <div className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 pb-2 mb-1">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-qb-dark text-white flex items-center justify-center text-[10px] font-bold">
                                                        {e.user.charAt(0).toUpperCase()}
                                                    </div>
                                                    <p className="font-bold text-xs uppercase tracking-widest text-gray-900 dark:text-white">{e.user}</p>
                                                </div>
                                                <p className="text-[10px] uppercase tracking-widest text-gray-500">{e.time}</p>
                                            </div>
                                            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{e.content}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-6 text-center text-xs uppercase tracking-widest text-gray-500 border border-dashed border-gray-300 dark:border-white/10">
                                        No communications logged yet.
                                    </div>
                                )}
                            </div>

                            {/* Formulario de Nuevo Comentario */}
                            <form onSubmit={submitComment} className="flex flex-col gap-3">
                                <textarea 
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder="Add a new transmission to this log..."
                                    className={cn(baseInputClasses, "min-h-[100px] resize-y")}
                                    disabled={processing}
                                />
                                {errors.content && (
                                    <span className="text-red-500 text-xs font-bold uppercase tracking-widest">{errors.content}</span>
                                )}
                                <Button 
                                    type="submit" 
                                    disabled={processing || !data.content.trim()}
                                    className="self-end h-12 px-8 rounded-none font-black uppercase tracking-widest text-xs transition-all duration-300 bg-qb-cyan text-qb-dark hover:bg-white hover:shadow-[0_0_15px_rgba(47,244,238,0.5)] disabled:opacity-50"
                                >
                                    {processing ? 'Transmitting...' : (
                                        <span className="flex items-center gap-2">
                                            Send Message <Send size={14} />
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </section>

                    </div>

                    {/* --- COLUMNA LATERAL (Derecha - Metadatos) --- */}
                    <aside className="w-full">
                        <div className="bg-white dark:bg-[#1a1a1e] border border-gray-200 dark:border-white/5 p-6 flex flex-col gap-6 relative shadow-sm sticky top-24">
                            {/* Decoración de la tarjeta */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-qb-cyan to-qb-purple"></div>

                            {/* Status */}
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Current Status</p>
                                <div className={cn("inline-flex items-center gap-2 px-3 py-2 border text-xs font-black uppercase tracking-widest", statusConfig.classes)}>
                                    {statusConfig.icon}
                                    {report.status}
                                </div>
                            </div>

                            <div className="h-px w-full bg-gray-100 dark:bg-white/5"></div>

                            {/* Product */}
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2">
                                    <Box size={12} /> Target Product
                                </p>
                                <p className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                    {report.product}
                                </p>
                            </div>

                            {/* Category */}
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2">
                                    <Tag size={12} /> Category
                                </p>
                                <p className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                    {report.category}
                                </p>
                            </div>

                            <div className="h-px w-full bg-gray-100 dark:bg-white/5"></div>

                            {/* Fechas */}
                            <div className="flex flex-col gap-3">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                        <Calendar size={12} /> Logged On
                                    </p>
                                    <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">{report.created_at}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                        <Clock size={12} /> Last Update
                                    </p>
                                    <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">{report.updated_at}</p>
                                </div>
                            </div>

                        </div>
                    </aside>

                </div>
            </div>
        </AppLayout>
    );
}
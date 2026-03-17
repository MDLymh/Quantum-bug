import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import reports from "@/routes/reports";
import { SimplifiedReport } from "@/types/report";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Terminal, ArrowRight, CircleDashed, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function Index() {
    const { reports: reportList } = usePage().props as unknown as { reports: SimplifiedReport[] };
    const getStatusConfig = (status: string) => {
        const normalized = status.toLowerCase();
        switch (normalized) {
            case 'open':
            case 'abierto':
                return { 
                    classes: "bg-qb-cyan/10 text-qb-cyan border-qb-cyan/30", 
                    icon: <AlertCircle size={14} /> 
                };
            case 'in progress':
            case 'en progreso':
                return { 
                    classes: "bg-qb-purple/10 text-qb-purple border-qb-purple/30", 
                    icon: <Clock size={14} /> 
                };
            case 'resolved':
            case 'resuelto':
            case 'closed':
                return { 
                    classes: "bg-green-500/10 text-green-500 border-green-500/30", 
                    icon: <CheckCircle2 size={14} /> 
                };
            default:
                return { 
                    classes: "bg-gray-500/10 text-gray-400 border-gray-500/30", 
                    icon: <CircleDashed size={14} /> 
                };
        }
    };

    return (
        <AppLayout>
            <Head title="Report Tracking" />
            
            <div className="w-full max-w-5xl mx-auto pt-8 pb-20 px-4 md:px-0 transition-colors duration-300">
                <div className="relative mb-10 border-b border-gray-200 dark:border-white/10 pb-8 pt-4">
                    <div className="glitch-decor absolute top-0 left-0 w-full h-1 bg-linear-to-r from-qb-blue via-qb-cyan to-qb-purple"></div>
                    
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter glitch-title mt-4">
                        Reports
                    </h1>
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-3 max-w-2xl">
                        Monitor the status of your submitted bugs, technical issues, and support.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    {reportList && reportList.length > 0 ? (
                        reportList.map((report) => {
                            const statusConfig = getStatusConfig(report.status);

                            return (
                                <div 
                                    key={report.ticket} 
                                    className="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:p-6 bg-white dark:bg-[#1a1a1e] border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md hover:border-qb-cyan transition-all duration-300"
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-qb-cyan transition-colors duration-300"></div>

                                    <div className="flex items-start md:items-center gap-4">
                                        <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-400 dark:text-gray-500 group-hover:text-qb-cyan group-hover:border-qb-cyan/30 transition-colors">
                                            <Terminal size={18} />
                                        </div>
                                        
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                                ID: {report.ticket}
                                            </span>
                                            <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wide group-hover:text-qb-cyan transition-colors">
                                                {report.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-2 md:mt-0">
                                        
                                        <div className={cn(
                                            "flex items-center gap-2 px-3 py-1.5 border rounded-none text-[10px] font-black uppercase tracking-widest",
                                            statusConfig.classes
                                        )}>
                                            {statusConfig.icon}
                                            {report.status}
                                        </div>

                                        <Button 
                                            asChild 
                                            variant="ghost" 
                                            className="h-10 rounded-none font-bold uppercase tracking-widest text-xs border border-gray-200 dark:border-white/10 hover:bg-qb-dark hover:text-white dark:hover:bg-qb-cyan dark:hover:text-qb-dark dark:hover:border-qb-cyan transition-all duration-300"
                                        >
                                            <Link href={reports.show(report.ticket).url} className="flex items-center gap-2">
                                                Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </Button>

                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                            <Terminal size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-2">No Transmissions Found</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide max-w-md uppercase mb-6">
                                Your log is currently empty. You haven't submitted any bug reports or support tickets yet.
                            </p>
                            <Button asChild className="rounded-none bg-qb-cyan text-qb-dark hover:bg-white font-black uppercase tracking-widest text-xs">
                                <Link href={reports.create().url}>
                                    Create New Report
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>

            </div>
        </AppLayout>
    );
}
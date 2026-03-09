
import AppLayout from "@/layouts/app-layout";
import reports from "@/routes/reports";
import { SimplifiedReport } from "@/types/report";
import { usePage } from "@inertiajs/react";

function Index() {
    const { reports:reportList }  = usePage().props as unknown as {reports:SimplifiedReport[]};
    return (
        <AppLayout>
            <div>My reports</div>
            {
                reportList &&
                reportList.map(e=>(
                    <div key={e.ticket} className="flex gap-2">
                        <p>{e.status}</p>
                        <p>{e.title}</p>
                        <a href={reports.show(e.ticket).url}>Details</a>
                    </div>
                ))
            }
            
        </AppLayout>
    )
}

export default Index
import AppLayout from '@/layouts/app-layout'
import reports from '@/routes/reports';
import { ExtendedReport } from '@/types/report';
import { usePage, useForm } from '@inertiajs/react'

function Show() {
    const { report } = usePage().props as unknown as { report: ExtendedReport }
    console.log(usePage().props.errors);
    const { data, setData, post, processing, errors, reset } = useForm({
        content: '',
        ticket_id: report.ticket
    });

    const submitComment = (e: React.FormEvent) => {
        e.preventDefault();
        
       
        post(reports.comment().url, {
            preserveScroll: true, // Prevents the page from jumping to the top
            onSuccess: () => {
                // If successful, Inertia automatically refreshes "report.comments"
                // We just need to clear the input field
                reset('content');
            }
        });
    };

    return (
        <AppLayout>
            <div>Foil: {report.ticket}</div>
            <div className="mb-8">
                <p>{report.category}</p>
                <p>{report.created_at}</p>
                <p>{report.description}</p>
                <p>{report.product}</p>
                <p>{report.status}</p>
                <p>{report.ticket}</p>
                <p>{report.title}</p>
                <p>{report.updated_at}</p>
                
                <div className='flex gap-2 my-4'>
                    {
                        report.images &&
                            report.images.map(e => (
                                <img className='h-35 object-cover' key={e.name} alt={e.name} src={e.link}/>
                            ))
                    }
                </div>
                
                <h3 className="text-xl font-bold mt-6 mb-4">Comments</h3>
                
                {/* 3. The Comment Form */}
                <form onSubmit={submitComment} className="mb-6 flex flex-col gap-2 max-w-lg">
                    <textarea 
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        placeholder="Write a comment..."
                        className="border border-gray-300 rounded-md p-2 w-full min-h-[80px]"
                        disabled={processing}
                    />
                    
                    {/* Error display */}
                    {errors.content && (
                        <span className="text-red-500 text-sm">{errors.content}</span>
                    )}

                    <button 
                        type="submit" 
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 w-fit"
                    >
                        {processing ? 'Sending...' : 'Post Comment'}
                    </button>
                </form>

                {/* Comments List */}
                <div className="flex flex-col gap-4">
                    {
                        report.comments.map(e => (
                            <div key={String(e.id)} className='flex flex-col gap-1 p-3 rounded'>
                                <div className="flex justify-between">
                                    <p className="font-semibold">{e.user}</p>
                                    <p className="text-sm text-gray-500">{e.time}</p>
                                </div>
                                <p>{e.content}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </AppLayout>
    )
}

export default Show
<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Http\Requests\StoreReportRequest;
use App\Http\Resources\Product\ProductAsOption;
use App\Http\Resources\SimplifiedTicketCommentResource;
use App\Http\Resources\Ticket\ExtendedTicketResource;
use App\Http\Resources\Ticket\SimplifiedTicketResource;
use App\Http\Resources\TicketCategorie\TicketCategorieAsOption;
use App\Models\EvidenceOfTicket;
use App\Models\Product;
use App\Models\Ticket;
use App\Models\TicketCategory;
use App\Models\TicketComment;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ReportsController extends Controller
{
    protected string $defaultFolder = "reports";
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Inertia::share("reports",SimplifiedTicketResource::collection(Ticket::findByUser(auth()->user()->id))->resolve());
        return Inertia::render('reports/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Inertia::share('categories',TicketCategorieAsOption::collection(TicketCategory::all())->resolve());
        Inertia::share('products',ProductAsOption::collection(Product::all())->resolve());
        return Inertia::render('reports/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReportRequest $request,ImageUploadService $imageUploader)
    {
        $user = auth()->user(); 
        $data = $request->validated();
        $data['user_id']= $user->id;
        $data['product_version_id']=  $data['version_id'];
        unset($data['images']);
        unset($data['version_id']);
        $ticket = Ticket::create($data);
        $folder = $this->getPathToEvidenceFolder($user->id,$ticket->id);
        if ($request->hasFile('images')) {
            foreach($imageUploader->processAndSaveImages($request->file('images'), $folder) as $imagePath){
                EvidenceOfTicket::create([
                    "ticket_id"=> $ticket->id,
                    "file_name"=>str_replace($folder."/","",$imagePath)
                ]);
            }

        }
        return redirect()->route('reports.index')->with(['message'=>"The report has been successfully created."]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $ticket = Ticket::find($id);
        if(!$ticket->isOwnedBy(auth()->user()->id)){
            abort(404);
        }
        $ticket->load(['evidence','comments']);
        Inertia::share('report',(new ExtendedTicketResource($ticket))->resolve());
        return Inertia::render('reports/show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function downloadImage($ticket,$file){
        $ticket = Ticket::findOrFail($ticket)?->load('evidence');
        if(!$ticket->isOwnedBy(auth()->user()->id)){
            abort(404);
        }
        $isValidFile = false;
        foreach($ticket->evidence as $evidence){
            
            if($file == $evidence->file_name){
                $isValidFile = true;
                break;
            }
        }
        if(!$isValidFile){
            abort(404);
        }
        
        $filePath = $this->getPathToEvidenceFolder($ticket->user_id,$ticket->id)."/".$file;
        if (!Storage::disk('local')->exists($filePath)) {
            abort(404, 'El archivo no fue encontrado.');
        }
        return Storage::disk('local')->response($filePath);
    }

    private function getPathToEvidenceFolder(int $user_id,int $ticket_id){
        return "{$this->defaultFolder}/{$user_id}/{$ticket_id}";
    }

    public function comment(CommentRequest $request){
        $data = $request->validated();
        $user = auth()->user();
        $ticket = Ticket::find((int)$data['ticket_id']);
        if(!($ticket?->user_id == $user->id)){
            return redirect()->back()->withErrors(['An error has ocurred']);
        }
        $data['user_id']=$user->id;
        $comment = TicketComment::create($data);
        return redirect()->route('reports.show',['report'=>$ticket->id]);
    }
}

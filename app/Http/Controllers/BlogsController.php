<?php

namespace App\Http\Controllers;

use App\Http\Requests\BlogIndexRequest;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(BlogIndexRequest $request)
    {
        $tags = $request->input('tags',[]);
        $blogs = Blog::withAllTag($tags)
                         ->with('tags')
                         ->latest()
                         ->paginate(10);
        $blogs->appends(['tags'=>$tags]);
        Inertia::share('blogs',$blogs);
        return Inertia::render('blogs/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $blog = Blog::findByName($id);
        if(!$blog){
            abort(404);
        }

        //$path = storage_path('app\\private\\blogs\\'.$blog->file_name.'.md');
        $path = storage_path('app\\private\\blogs\\019cbf58-23d5-7306-b86e-033d6cd443ef.md');
        if(!file_exists($path)){
            abort(404);
        }
        $markdownContent = File::get($path);
        $htmlContent = Str::markdown($markdownContent);
        Inertia::share('blog',$blog);
        Inertia::share('htmlContent',$htmlContent);
        return Inertia::render('blogs/show');
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
}

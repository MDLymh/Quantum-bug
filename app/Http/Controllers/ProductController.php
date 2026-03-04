<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Inertia::share('products',Product::all()->load('category'));
        return Inertia::render('products/index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $name)
    {
        Inertia::share('productInfo',Product::getByName(str_replace("-"," ",$name))->load(['category','versions']));
        return Inertia::render('products/show');
    }

}

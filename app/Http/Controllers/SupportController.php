<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupportController extends Controller
{
    public function index() {
        Inertia::share('products',Product::all());
        return Inertia::render('support/index');
    }
}

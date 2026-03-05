<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductVersion\ProductVersionAsOption;
use App\Models\ProductVersion;
use Illuminate\Http\Request;

class ProductVersionController extends Controller
{
    public function index(){
        return ProductVersionAsOption::collection(ProductVersion::all())->resolve();
    }
}

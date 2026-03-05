<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductVersionController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\SupportController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('home', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');
Route::controller(SupportController::class)->group(function(){
    Route::get('support','index')->name('support.index');
});
Route::middleware(['auth','verified'])->group(function(){
    Route::controller(ProductVersionController::class)->group(function(){
        Route::get('product-version','index')->name('productVersion.index');
    });
    Route::controller(ReportsController::class)->group(function(){
        Route::get('/reports/files/{ticket}/{file}','downloadImage')->name('report.files');
        Route::post('/reports/comment','comment')->name('reports.comment');
    });
    Route::resource('reports',ReportsController::class)->except(['edit','update','destroy']);
});
Route::resource('products',ProductController::class)->only(['index','show']);
Route::inertia('faq', 'faq')->name('faq');
Route::inertia('blogs', 'blogs')->name('blogs');


require __DIR__.'/settings.php';

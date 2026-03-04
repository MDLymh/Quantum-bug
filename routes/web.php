<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\SupportController;
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
Route::resource('reports',ReportsController::class);
Route::resource('products',ProductController::class)->only(['index','show']);
Route::inertia('faq', 'faq')->name('faq');
Route::inertia('blogs', 'blogs')->name('blogs');


require __DIR__.'/settings.php';

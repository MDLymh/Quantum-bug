<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('home', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');
Route::inertia('products', 'products')->name('products');
Route::inertia('faq', 'faq')->name('faq');
Route::inertia('blogs', 'blogs')->name('blogs');
Route::inertia('support', 'support')->name('support');


require __DIR__.'/settings.php';

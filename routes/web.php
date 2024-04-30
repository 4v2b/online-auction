<?php

use App\Http\Controllers\BidsController;
use App\Http\Controllers\LotsManagementController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserInfoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/catalog', function (){

});

Route::get('/lots/{id}', function (int $id){

});

Route::get('/{category_id}', function (int $category_id){

});

Route::get('/menu', function (){

});

Route::get('/tracked-lots', function (){

});

Route::middleware('auth')->controller(LotsManagementController::class)->group(function () {
    Route::get('/user-lots', 'index');
    Route::get('/user-lots/{id}', 'show');
    Route::get('/user-lots/{id}/edit', 'edit');
    Route::patch('/user-lots/{id}', 'update');
    Route::delete('/user-lots/{id}', 'destroy');
    Route::get('/user-lots/create', 'create');
    Route::post('/user-lots', 'store');
});

Route::middleware('auth')->controller(BidsController::class)->group(function () {
    Route::get('/bids', 'index');
    Route::get('/bids/{id}', 'show');
    Route::delete('/bids/{id}', 'remove'); 
});

Route::middleware('auth')->controller(UserInfoController::class)->group(function () {
    Route::get('/userinfo', 'index');
    Route::get('/userinfo/edit', 'edit');
    Route::patch('/userinfo', 'update'); 
});


require __DIR__.'/auth.php';

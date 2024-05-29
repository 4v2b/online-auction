<?php

use App\Http\Controllers\BidsController;
use App\Http\Controllers\LotsController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TrackingController;
use App\Http\Controllers\UserInfoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::controller(CatalogController::class)->group(function () {
    Route::get('/', 'getAll')->name('home');
    Route::get('/catalog', 'getAll');
    Route::post('/catalog/search', 'getByKeywords');
    Route::get('/catalog/{lot}', 'show')->name('lot');
    Route::get('/categories/{category}', 'getByCategory');
});

Route::middleware('auth')->controller(TrackingController::class)->group(function () {
    Route::delete('/tracked/{id}', 'destroyTracked');
    Route::get('/tracked', 'getTracked')->name('tracked.all');
    Route::post('/lots/track', 'track');
});

Route::middleware('auth')->controller(LotsController::class)->group(function () {
    Route::get('/lots', 'showAll')->name('lot.all');
    Route::get('/lots/{lot}/edit', 'edit');
    Route::patch('/lots/{lot}', 'update')->name('lot.update');
    Route::delete('/lots/{lot}', 'destroy')->name('lot.destroy');
    Route::get('/lots/create', 'create');
    Route::post('/lots', 'store');
});

Route::middleware('auth')->controller(BidsController::class)->group(function () {
    Route::get('/bids', 'showAll')->name('bids.all');
    Route::post('/bids/create/{lot}', 'create');
    //Route::get('/bids/{id}', 'show');
    Route::delete('/bids/{id}', 'destroy');
});

Route::middleware(['auth'])->controller(UserInfoController::class)->group(function () {

    Route::get('/userinfo', 'edit')->name('userinfo');
    Route::post('/userinfo', 'update');
});

require __DIR__ . '/auth.php';

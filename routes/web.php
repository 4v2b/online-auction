<?php

use App\Http\Controllers\BidsController;
use App\Http\Controllers\LotsController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserInfoController;
use App\Models\Contact;
use App\Models\ContactType;
use App\Models\Lot;
use App\Models\Person;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::controller([CatalogController::class])->group(function () {
        Route::get('/catalog', 'getAll');
    });

Route::get('/lots/{lot}', function (Lot $lot) {
    return Inertia::render('LotPage', [
        'lot' => $lot
    ]);
});

Route::get('/category/{id}', function (int $id) {
});

// Route::get('/menu', function () {
//     return Inertia::render('UserInfo');
// })->name('menu')->middleware(['auth', 'verified']);

Route::get('/wishlist', function () {
    //todo wishlist loading
})->name('wishlist');

Route::delete('/wishlist', function () {
    
})->name('wishlist');

Route::middleware('auth')->controller(LotsController::class)->group(function () {
    Route::get('/user-lots', 'showAll')->name('lot.all');
    Route::get('/lots/{lot}/edit', 'edit')->name('lot.edit');
    Route::put('/user-lots', 'update')->name('lot.update');
    Route::delete('/lots/{lot}', 'destroy')->name('lot.destroy');
    Route::get('/user-lots/create', 'create')->name('lot.create');
    Route::post('/user-lots', 'store');
});

Route::middleware('auth')->controller(BidsController::class)->group(function () {
    Route::get('/bids', 'showAll');
    Route::get('/bids/{id}', 'show');
    Route::delete('/bids/{bid}', 'destroy');
});

Route::middleware(['auth'])->controller(UserInfoController::class)->group(function () {

    Route::get('/userinfo', 'edit')->name('userinfo');
    Route::post('/userinfo', 'update');
});

require __DIR__ . '/auth.php';

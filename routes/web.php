<?php

use App\Http\Controllers\BidsController;
use App\Http\Controllers\LotsController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserInfoController;
use App\Http\Middleware\EnsureBidIsAcceptable;
use App\Models\Contact;
use App\Models\ContactType;
use App\Models\Lot;
use App\Models\Person;
use App\Models\TrackedLot;
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

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::controller(CatalogController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/catalog', 'getAll');
    Route::post('/catalog/search', 'getByKeywords');
    Route::get('/catalog/{lot}', 'show')->name('lot');
    Route::get('/categories/{category}', 'getByCategory');
});



// Route::get('/menu', function () {
//     return Inertia::render('UserInfo');
// })->name('menu')->middleware(['auth', 'verified']);

Route::middleware('auth')->get('/wishlist', function () {

    $lots_ids = TrackedLot::select('lot_id')->where('user_id', Auth::id())->get();
    $lots = [];
    foreach ($lots_ids as $id) {
        $lots[] = Lot::find($id);
    }
    return Inertia::render('TrackedLots', ['lots' => $lots]);
})->name('wishlist');


Route::middleware('auth')->controller(LotsController::class)->group(function () {
    Route::get('/lots', 'showAll')->name('lot.all');
    Route::get('/lots/{lot}/edit', 'edit');
    Route::patch('/lots/{lot}', 'update')->name('lot.update');
    Route::delete('/lots/{lot}', 'destroy')->name('lot.destroy');
    Route::get('/lots/create', 'create');
    Route::post('/lots', 'store');
    Route::post('/lots/{lot}/track', 'track');

});

Route::middleware('auth')->controller(BidsController::class)->group(function () {
    Route::get('/bids', 'showAll');
    Route::post('/bids/create/{lot}', 'create');
    Route::get('/bids/{id}', 'show');
    Route::delete('/bids/{bid}', 'destroy');
});

Route::middleware(['auth'])->controller(UserInfoController::class)->group(function () {

    Route::get('/userinfo', 'edit')->name('userinfo');
    Route::post('/userinfo', 'update');
});

require __DIR__ . '/auth.php';

<?php

use App\Http\Controllers\BidsController;
use App\Http\Controllers\LotsController;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/catalog', function () {
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
    Route::get('/lots/{id}/edit', 'edit')->name('lot.edit');
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

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/userinfo', function () {
        $user_id = Auth::id();

        $person = Person::select('profile_picture', 'name')->where('user_id',$user_id);
        $contacts = Contact::select('value', 'contact_type_id', 'id')->where('person_id', $user_id)->get();
        $contactTypes = ContactType::all();

        return Inertia::render(
            'UserInfo',
            [
                'person' => $person,
                'contacts' => $contacts,
                'contactTypes' => $contactTypes
            ]
        );
    })->name('userinfo');

    Route::post('/userinfo', function (Request $q) {
    });
});

require __DIR__ . '/auth.php';

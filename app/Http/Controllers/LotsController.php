<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLotRequest;
use App\Models\Category;
use App\Models\CategoryLot;
use App\Models\Lot;
use App\Models\Photo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class LotsController extends Controller
{
    function show($lotId)
    {
        $lot = Lot::where($lotId)->get();
        return Inertia::render('UserLots/LotDetails', ['lot' => $lot]);
    }

    function showAll()
    {
        $userId = Auth::id();
        $userLots = Lot::where('user_id', $userId)->get();
                //dd('controller is hit');

        return Inertia::render('UserLots/MyLots', ['lots' => $userLots]);
    }

    function edit($lotId)
    {
        $lot = Lot::where($lotId)->get();
        return Inertia::render('UserLots/EditLot', ['lot' => $lot]);
    }

    function update()
    {
    }

    function destroy(Lot $lot)
    {
        $deleted = $lot->delete();
        //dd($deleted);
        return redirect('/user-lots');
    }

    function create()
    {
        return Inertia::render('UserLots/CreateLot');
    }

    function store(StoreLotRequest $q)
    {
        $validated = $q->validated();

        $lot = Lot::create(
            [
                'title' => $validated['lotName'],
                'description' => $validated['lotDesc'],
                'start_price' => (float) $validated['startBid'],
                'user_id' => Auth::id(),
                'ends_at' => $validated['tradeEndTime']
            ]
        );

        $path = $validated['photos']->store('uploads');
        Photo::create(['path' => $path, 'lot_id' => $lot->id]);

        // foreach ($validated['photos'] as $file) {
        //     $path = $file->store('uploads');
        //     Photo::create(['path' => $path, 'lot_id' => $lot->id]);
        // }

        foreach ($validated['selectedCategories'] as $category) {
            CategoryLot::create(['lot_id' => $lot->id, 'category_id' => $category]);
        }
        return redirect(route('lot.all'));
    }
}

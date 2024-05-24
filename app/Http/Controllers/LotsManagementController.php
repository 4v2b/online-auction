<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CategoryLot;
use App\Models\Lot;
use App\Models\Photo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class LotsManagementController extends Controller
{
    function show($lotId)
    {
        $lot = Lot::where($lotId)->get();
        return Inertia::render('UserLots/LotDetails', ['lot' => $lot]);
    }

    function showAll()
    {
        //dd('controller is hit');
        $userId = Auth::id();
        $userLots = Lot::where('id', $userId)->get();
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

    function destroy(Request $q)
    {
        //Lot::destroy("");
        redirect('/user-lots');
    }

    function create()
    {
        return Inertia::render('UserLots/CreateLot');
    }

    function store(Request $q)
    {
        //todo validation

        $lot = Lot::create(
            [
                'title' => $q->lotName,
                'description' => $q->lotDesc,
                'start_price' => (float) $q->startBid,
                'user_id' => Auth::id(),
                'ends_at' => $q->tradeEndTime
            ]
        );

        foreach ($q->photos as $file) {
            $path = $file->store('uploads');
            Photo::create(['path' => $path, 'lot_id' => $lot->id]);
        }

        foreach ($q->selectedCategories as $category) {
            CategoryLot::create(['lot_id' => $lot->id, 'category_id' => $category]);
        }
        return redirect(route('lot.all'));
    }
}

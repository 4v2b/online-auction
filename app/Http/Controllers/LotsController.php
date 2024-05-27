<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLotRequest;
use App\Http\Requests\UpdateLotRequest;
use App\Models\Category;
use App\Models\CategoryLot;
use App\Models\Lot;
use App\Models\Photo;
use App\Models\TrackedLot;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Model;
use Nette\Utils\Image;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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

    function edit(Lot $lot)
    {
        $photos = Photo::where('lot_id', $lot->id)->get();

        $storedPhotos = [];

        foreach ($photos as $photo) {
            $storedPhotos[] = [
                'id' => $photo->id,
                'url' => Storage::url($photo->path)
            ];
        }

        // dd($storedPhotos);
        return Inertia::render('UserLots/EditLot', ['lot' => $lot, 'storedPhotos' => $storedPhotos]);
    }

    function update(UpdateLotRequest $q, Lot $lot)
    {
        $validated = $q->validated();

        if ($lot->title != $validated['lotName']) {
            $lot->title = $validated['lotName'];
        }

        if ($lot->description != $validated['lotDesc']) {
            $lot->description = $validated['lotDesc'];
        }
        $lot->save();

        if (!empty($validated['deletedStoredPhotos'])) {
            foreach ($validated['deletedStoredPhotos'] as $photoId) {
                $photo = Photo::find($photoId);
                Storage::delete($photo->path);
                $photo->delete();
            }
        }

        foreach ($validated['photos'] as $photo) {
            $path = $photo->store('/uploads' . $q->user()->id, 'public');
            Photo::create(['path' => $path, 'lot_id' => $lot->id]);
        }

        return redirect('/lots');
    }

    function destroy(Lot $lot)
    {
        $deleted = $lot->delete();
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


        foreach ($validated['photos'] as $file) {
            $path = $file->store('uploads/' . $q->user()->id, 'public');
            Photo::create(['path' => $path, 'lot_id' => $lot->id]);
        }

        foreach ($validated['selectedCategories'] as $category) {
            CategoryLot::create(['lot_id' => $lot->id, 'category_id' => $category]);
        }
        return redirect(route('lot.all'));
    }

    function track(Request $q, Lot $lot)
    {
        dd($q);

        $validated = $q->validate([
            'isTracked' => 'required|boolean'
        ]);
        //$isTracked = false;
        if ($validated['isTracked'] == false) {
            //$trackedLot = true;
            TrackedLot::create(['lot_id' => $lot->id, 'user_id' => Auth::id()]);
                dd($validated['isTracked']);

        } else {
            $trackedLot = TrackedLot::where('lot_id', $lot->id)->where('user_id', Auth::id())->first();
            $deleted = $trackedLot->delete();
            
        }


        return response()->json(
            [
                'isTracked' => !$validated['isTracked']
            ]
        );
    }
}

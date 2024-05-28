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
use App\Models\Bid;

class LotsController extends Controller
{
    function show($lotId)
    {
        $lot = Lot::where($lotId)->get();
        return Inertia::render('UserLots/LotDetails', ['lot' => $lot]);
    }

    function getTracked()
    {
        $lots_ids = TrackedLot::select('lot_id')->where('user_id', Auth::id())->get();

        $fullLots = [];

        $lots = Lot::whereIn('id', $lots_ids)->get();
        foreach ($lots as $lot) {
            $path = Photo::where('lot_id', $lot->id)->first()->path;
            $url = Storage::url($path);
            $maxbid = Bid::where('lot_id', $lot->id)->max('value');
            $fullLots[] = [
                'id' => $lot->id,
                'bid' => $maxbid,
                'price' => $lot->start_price,
                'photo' => $url,
                'title' => $lot->title,
                'ends_at' => $lot->ends_at
            ];
        }
        return Inertia::render('TrackedLots', ['lots' => $fullLots]);
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

    function destroyTracked($id)
    {
        $trackedLot = TrackedLot::where('lot_id', $id)->where('user_id', Auth::id())->first();
        $deleted = $trackedLot->delete();
        return redirect()->back();
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

    function track(Request $q)
    {
        $validated = $q->validate([
            'id' => 'required|numeric'
        ]);
        $trackedLot = TrackedLot::where('lot_id', $validated['id'])->where('user_id', Auth::id())->first();
        if (is_null($trackedLot)) {
            TrackedLot::create(['lot_id' => $validated['id'], 'user_id' => Auth::id()]);
        } else {
            $deleted = $trackedLot->delete();
        }
        return redirect()->back();
    }
}

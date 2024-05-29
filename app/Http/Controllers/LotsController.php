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
use Exception;

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
        $lots = Lot::where('user_id', $userId)->get();

        $joinedLots = [];

        foreach ($lots as $lot) {
            $photo = Photo::where('lot_id', $lot->id)->first();
            $url = Storage::url(is_null($photo) ? '' : $photo->path);
            $bids = Bid::where('lot_id', $lot->id)->get();
            $joinedLots[] = [
                'id' => $lot->id,
                'path' => $url,
                'title' => $lot->title,
                'desc' => $lot->description,
                'created_at' => $lot->created_at,
                'ends_at' => $lot->ends_at,
                'bids' => $bids
            ];
        }

        return Inertia::render('UserLots/MyLots', ['lots' => $joinedLots]);
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
        try {
            $deleted = $lot->delete();
        } catch (Exception $ex) {
            Bid::where('lot_id', $lot->id)->delete();
            $deleted = $lot->delete();
        }
        return redirect('/lots');
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
}

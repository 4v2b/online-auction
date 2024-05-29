<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TrackedLot;
use App\Models\Lot;
use App\Models\Photo;
use Illuminate\Support\Facades\Storage;
use App\Models\Bid;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TrackingController
{
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

    function destroyTracked($id)
    {
        $trackedLot = TrackedLot::where('lot_id', $id)->where('user_id', Auth::id())->first();
        $deleted = $trackedLot->delete();
        return redirect()->back();
    }
}

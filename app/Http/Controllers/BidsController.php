<?php

namespace App\Http\Controllers;

use App\Models\Bid;
use Illuminate\Http\Request;
use App\Models\Lot;
use Illuminate\Support\Facades\Auth;

class BidsController extends Controller
{
    function create(Request $q, Lot $lot)
    {


        $validated = $q->validate([
            'bid' => 'required|numeric|min:1|digits_between:0,2'
        ]);

        //dd($q);

        $maxBid = Bid::where('lot_id', $lot->id)->orderBy('set_at', 'desc')->first();

        if (
            (is_null($maxBid) && $lot->start_price <= $validated['bid']) ||
            (
                $maxBid->value < $validated['bid']
                && now()->lessThan($lot->ends_at)
                && $maxBid->user_id != Auth::id()
            )
        ) {
            Bid::create(['lot_id' => $lot->id, 'user_id' => Auth::id(), 'value' => $validated['bid']]);
        }

        return redirect()->back();
    }
}

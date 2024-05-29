<?php

namespace App\Http\Controllers;

use App\Models\Bid;
use Illuminate\Http\Request;
use App\Models\Lot;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BidsController extends Controller
{
    function create(Request $q, Lot $lot)
    {
        $validated = $q->validate([
            'bid' => 'required|numeric|min:1|max:100000'
        ]);

        $maxBid = Bid::where('lot_id', $lot->id)->orderBy('set_at', 'desc')->first();

        $canSetNewBid = is_null($maxBid) && $lot->start_price <= $validated['bid'];
        $canSetHigherBid = !is_null($maxBid) && $maxBid->value < $validated['bid']
            && now()->lessThan($lot->ends_at)
            && $maxBid->user_id != Auth::id();

        if (
            $lot->user_id != Auth::id() &&
            ($canSetNewBid || $canSetHigherBid)
        ) {
            Bid::create(['lot_id' => $lot->id, 'user_id' => Auth::id(), 'value' => $validated['bid']]);
        }

        return redirect()->back();
    }

    function showAll()
    {
        $bids = Bid::where('user_id', Auth::id())->get();
        $joinedBids = [];
        foreach ($bids as $bid) {
            $lot = Lot::find($bid->lot_id);

            $newestBid = Bid::where('lot_id', $lot->id)->orderBy('set_at', 'desc')->first()->set_at; 
            $newestBidSetAt = Carbon::parse($newestBid->set_at);
            $bidSetAt = Carbon::parse($bid->set_at);
            $lotEndsAt = Carbon::parse($lot->ends_at);

            if ($newestBidSetAt->eq($bidSetAt)) {
                $status = -1; // Ставка застаріла
            } elseif ($bidSetAt->gt($lotEndsAt)) {
                $status = 1; // Переможна ставка
            } else {
                $status = 0; // Найвища ставка
            }

            $joinedBids[] = [
                'set_at' => $bid->set_at,
                'value' => $bid->value,
                'lot_ends_at' => $lot->ends_at,
                'lot_id' => $lot->id,
                'status' => $status,
                'contacts' => []
            ];
        }
        return Inertia::render('UserBids', ['bids' => $joinedBids]);
    }

    function destroy(Bid $bid)
    {
        $bid->delete();
        return redirect()->back();
    }
}

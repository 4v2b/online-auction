<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Person;
use App\Models\Contact;
use App\Models\ContactType;
use App\Http\Requests\UpdateUserInfoRequest;
use App\Models\Bid;
use App\Models\Category;
use App\Models\CategoryLot;
use App\Models\Lot;
use App\Models\Photo;
use App\Models\TrackedLot;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Model;

class CatalogController extends Controller
{
    function index()
    {
        return Inertia::render('Home');
    }

    private function retrieveFullLotInfo($lots)
    {
        $combinedLots = [];

        foreach ($lots as $lot) {
            $isTracked = false;

            if (Auth::check()) {
                $isTracked = TrackedLot::where('lot_id', $lot->id)->where('user_id', Auth::id())->exists();
            }
            $photo = Photo::where('lot_id', $lot->id)->first();
            $url = is_null($photo) ? '' : Storage::url($photo->path);
            $currentBid = Bid::where('lot_id', $lot->id)->orderBy('set_at')->first();

            $combinedLots[] = [
                'id' => $lot->id,
                'title' => $lot->title,
                'price' => $lot->start_price,
                'preview' => $url,
                'currentBid' => is_null($currentBid) ? null : $currentBid->value,
                'isTracked' => $isTracked
            ];
            return $combinedLots;
        }
    }


    function getAll()
    {
        $lots = Lot::where('user_id', '!=', Auth::id())->orderBy('created_at', 'desc')->get();
        return Inertia::render(
            'Catalog',
            [
                'lots' => $this->retrieveFullLotInfo($lots),
                'message' => 'Доступні лоти'
            ]
        );
    }

    function getByKeywords(Request $q)
    {
        $validated = $q->validate([
            'searchString' => 'required|string|max:40'
        ]);

        $keywords = explode(' ', trim($validated['searchString']));
        $query = Lot::query();

        foreach ($keywords as $keyword) {
            $query->orWhere('title', 'like', '%' . $keyword . '%');
            $query->orWhere('description', 'like', '%' . $keyword . '%');
        }
        $query->where('user_id', '!=', Auth::id());
        $lots = $query->get();
        $shortenedString = strlen($validated['searchString']) > 10 ? substr($validated['searchString'], 0, 10) . "..." : $validated['searchString'];

        return Inertia::render(
            'Catalog',
            [
                'lots' => $this->retrieveFullLotInfo($lots),
                'message' => "Результати пошуку за запитом \"" . $shortenedString . "\""
            ]
        );
    }

    function getByCategory(Category $category)
    {
        $lot_ids =  CategoryLot::select('lot_id')->where('category_id', $category->id)->get();
        $lots = Lot::where('user_id', '!=', Auth::id())->whereIn('id', $lot_ids)->get();
        return Inertia::render(
            'Catalog',
            [
                'lots' => $this->retrieveFullLotInfo($lots),
                'message' => "Категорія \"" . $category->name . "\""
            ]
        );
    }

    function show(Lot $lot)
    {
        $id = $lot->id;
        $categoriesLots = CategoryLot::where('lot_id', $id)->get();
        $categories = [];

        foreach ($categoriesLots as $catLot) {
            $categories[] = Category::select('name')->where('id', $catLot->category_id)->first();
        }

        $photos = Photo::select('path')->where('lot_id', $id)->get();
        $photosUrls = [];

        foreach ($photos as $photo) {
            $photosUrls[] = Storage::url($photo->path);
        }

        $bids = Bid::where('lot_id', $id)->orderBy('set_at', 'desc')->get();
        $joinedBids = [];

        foreach ($bids as $bid) {

            $user = Person::where('user_id', $bid->user_id)->first();
            $joinedBids[] = [
                'set_at' => $bid->set_at,
                'userName' => $user->name,
                'value' => $bid->value
            ];
        }

        return Inertia::render('Lot', [
            'lot' => $lot,
            'photos' => $photosUrls,
            'bids' => $joinedBids,
            'chosenCategories' => $categories
        ]);
    }
}

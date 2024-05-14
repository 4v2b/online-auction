<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Lot;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class LotsManagementController extends Controller
{
    function show($lotId){
        $lot = Lot::where($lotId)->get();
        return Inertia::render('UserLots/LotDetails', ['lot' => $lot]);
    }

    function showAll() {
        //dd('controller is hit');
        $userId = Auth::id();
        $userLots = Lot::where('id', $userId)->get();
        return Inertia::render('UserLots/MyLots', ['lots' => $userLots]);
    }

    function edit($lotId){
        $lot = Lot::where($lotId)->get();
        return Inertia::render('UserLots/EditLot', ['lot' => $lot]);
    }

    function update(){

    }

    function destroy($lotId){
        Lot::destroy($lotId);
        redirect('/user-lots');
    }

    function create(){
        $categories = Category::all();
        return Inertia::render('UserLots/CreateLot', ['categories'=>$categories]);
    }

    function store(Request $q){
        
    }
}

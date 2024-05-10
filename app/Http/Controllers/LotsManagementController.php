<?php

namespace App\Http\Controllers;

use App\Models\Lot;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class LotsManagementController extends Controller
{
    function show($lotId){
        $lot = Lot::where($lotId);
        Inertia::render('UserLots/LotDetails', ['lot' => $lot]);
    }

    function showAll() {
        $userId = Auth::getUser()->id;
        $userLots = Lot::where('id', $userId);
        Inertia::render('UserLots/MyLots', ['lots' => $userLots]);
    }

    function edit($lotId){
        $lot = Lot::where($lotId);
        Inertia::render('UserLots/EditLot', ['lot' => $lot]);
    }

    function update(){

    }

    function destroy($lotId){
        Lot::destroy($lotId);
        redirect('/user-lots');
    }

    function create(){
        Inertia::render('UserLots/CreateLot');
    }

    function store(Request $q){
        
    }
}

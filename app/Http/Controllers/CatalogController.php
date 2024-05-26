<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Person;
use App\Models\Contact;
use App\Models\ContactType;
use App\Http\Requests\UpdateUserInfoRequest;
use Illuminate\Support\Facades\Storage;

class CatalogController extends Controller
{
    function getAdd (){

        //todo get bids, get, previews, get categories badges

        return Inertia::render('Catalog', ['lots' => [

        ]]);
    }
}

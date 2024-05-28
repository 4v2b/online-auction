<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Person;
use App\Models\Contact;
use App\Models\ContactType;
use Inertia\Inertia;
use App\Http\Requests\UpdateUserInfoRequest;
use Illuminate\Support\Facades\Storage;

class UserInfoController extends Controller
{
    function edit()
    {
        $user_id = Auth::id();

        $person = Person::select('name', 'path_to_avatar')->where('user_id', $user_id)->first();
        $contacts = Contact::select('value', 'contact_type_id', 'id')->where('person_id', $user_id)->get();
        $contactTypes = ContactType::all();

        if (is_null($person->path_to_avatar)) {
            $url = Storage::url('empty_avatar.jpg');
        } else {
            $url = Storage::url($person->path_to_avatar);
        }

        return Inertia::render(
            'UserInfo',
            [
                'name' => $person->name,
                'avatar' =>  $url,
                'contacts' => $contacts,
                'contactTypes' => $contactTypes
            ]
        );
    }

    function update(UpdateUserInfoRequest $q)
    {
        $validated = $q->validated();

        $id = $q->user()->id;

        $person = Person::where('user_id', $id)->first();

        if ($validated['name'] != $person->name) {
            $person->name = $validated['name'];
        }
        if (!is_null($validated['avatar'])) {
            $path = $validated['avatar']->store('avatars/' . $id, 'public');
            Storage::delete($person->path_to_avatar);
            $person->path_to_avatar = $path;
        }

        $person->save();

        Contact::where('person_id', $id)->delete();

        foreach ($validated['contacts'] as $contact) {
            Contact::create(
                [
                    'person_id' => $id,
                    'value' => $contact['value'],
                    'contact_type_id' => $contact['contact_type_id']
                ]
            );
        }

        return redirect('/userinfo');
    }
}

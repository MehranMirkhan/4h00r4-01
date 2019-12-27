<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Utility;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller {
    public function me(Request $request) {
        return $request->user();
    }

    public function index(Request $request) {
        return Utility::richRetrieve($request, User::query());
    }

    public function show(User $user) {
        return $user;
    }

    public function update(Request $request, User $user) {
        $user->update($request->except(['password']));
        return $user;
    }

    public function destroy(User $user) {
        try {
            $user->delete();
            return response()->json(['message' => 'deleted'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'unknown'], $e->getCode());
        }
    }
}

<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Utility;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller {
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

    // --------- User routes
    public function me(Request $request) {
        return $request->user();
    }

    public function updateMe(Request $request) {
        $request->validate([
            'name'  => 'nullable|string',
            'phone' => 'nullable|string',
            'email' => 'nullable|string|email',
        ]);
        $user = $request->user();
        $user->update([
            'name' => isset($request->name) ? $request->name : $user->name,
            'phone' => isset($request->phone) ? $request->phone : $user->phone,
            'email' => isset($request->email) ? $request->email : $user->email
        ]);
        return response()->json(['message' => 'server.user.updated'], 200);
    }
}

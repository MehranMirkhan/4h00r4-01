<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Utility;
use App\Models\User;
use App\Models\UserLevelHint;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        return Utility::richRetrieve($request, User::query());
    }

    public function show(User $user)
    {
        return $user;
    }

    public function update(Request $request, User $user)
    {
        $user->update($request->except(['password']));
        return $user;
    }

    public function destroy(User $user)
    {
        try {
            $user->delete();
            return response()->json(['message' => 'deleted'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'unknown'], $e->getCode());
        }
    }

    // --------- User routes
    public function me(Request $request)
    {
        $user = $request->user();
        $levelHints = UserLevelHint::query()->where('user_id', $user->id)->get();
        $user->levelHints = $levelHints;
        return $user;
    }

    public function updateMe(Request $request)
    {
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

    public function getLeaderBoard()
    {
        $top_daily = User::select('name', 'score_daily')
            ->orderBy('score_daily', 'desc')
            ->take(10)
            ->get();
        $top_weekly = User::select('name', 'score_weekly')
            ->orderBy('score_weekly', 'desc')
            ->take(10)
            ->get();
        return response()->json(['top_daily' => $top_daily, 'top_weekly' => $top_weekly], 200);
    }

    public function adWatched($zoneId, Request $request) {
        $user = $request->user();
        $user->update([
            'coin_1' => $user->coin_1 + 10
        ]);
        return response()->json(['message' => 'server.user.updated'], 200);
    }
}

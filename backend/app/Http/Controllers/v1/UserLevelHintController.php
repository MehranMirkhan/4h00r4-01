<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Utility;
use App\Models\UserLevelHint;
use Illuminate\Http\Request;


class UserLevelHintController extends Controller
{
    public function index(Request $request)
    {
        return Utility::richRetrieve($request, UserLevelHint::query());
    }

    public function store(Request $request)
    {
        $userLevelHint = UserLevelHint::create($request->all());
        return UserLevelHint::query()->where('id', $userLevelHint->id)->firstOrFail();
    }

    public function show(UserLevelHint $userLevelHint)
    {
        return UserLevelHint::query()->where('id', $userLevelHint->id)->firstOrFail();
    }

    public function update(Request $request, UserLevelHint $userLevelHint)
    {
        $userLevelHint->update($request->all());
        return UserLevelHint::query()->where('id', $userLevelHint->id)->firstOrFail();
    }

    public function destroy(UserLevelHint $userLevelHint)
    {
        try {
            $userLevelHint->delete();
            return response()->json(['message' => 'deleted'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Unknown Error'], $e->getCode());
        }
    }

    // ----------------------- User routes
    public function buy($levelId, $hintId, $cost, Request $request)
    {
        $user = $request->user();
        $user->coin_1 -= $cost;
        if ($user->coin_1 >= 0) {
            UserLevelHint::create([
                'user_id' => $user->id,
                'level_id' => $levelId,
                'hint_id' => $hintId,
            ]);
            $user->update();
            return response()->json(['message' => 'created'], 200);
        } else {
            return response()->json(['message' => 'Not enough coin'], 400);
        }
    }
}

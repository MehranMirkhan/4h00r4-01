<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Utility;
use App\Models\UserAchievement;
use Illuminate\Http\Request;


class UserAchievementController extends Controller {
    public function index(Request $request) {
        return Utility::richRetrieve($request, UserAchievement::query());
    }

    public function store(Request $request) {
        $userAchievement = UserAchievement::create($request->all());
        return UserAchievement::query()->where('id', $userAchievement->id)->firstOrFail();
    }

    public function show(UserAchievement $userAchievement) {
        return UserAchievement::query()->where('id', $userAchievement->id)->firstOrFail();
    }

    public function update(Request $request, UserAchievement $userAchievement) {
        $userAchievement->update($request->all());
        return UserAchievement::query()->where('id', $userAchievement->id)->firstOrFail();
    }

    public function destroy(UserAchievement $userAchievement) {
        try {
            $userAchievement->delete();
            return response()->json(['message' => 'deleted'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Unknown Error'], $e->getCode());
        }
    }
}

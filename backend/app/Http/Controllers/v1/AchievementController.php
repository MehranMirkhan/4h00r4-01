<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Utility;
use App\Models\Achievement;
use Illuminate\Http\Request;


class AchievementController extends Controller {
    public function index(Request $request) {
        return Utility::richRetrieve($request, Achievement::query());
    }

    public function store(Request $request) {
        $achievement = Achievement::create($request->all());
        return Achievement::query()->where('id', $achievement->id)->firstOrFail();
    }

    public function show(Achievement $achievement) {
        return Achievement::query()->where('id', $achievement->id)->firstOrFail();
    }

    public function update(Request $request, Achievement $achievement) {
        $achievement->update($request->all());
        return Achievement::query()->where('id', $achievement->id)->firstOrFail();
    }

    public function destroy(Achievement $achievement) {
        try {
            $achievement->delete();
            return response()->json(['message' => 'deleted'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'unknown'], $e->getCode());
        }
    }
}

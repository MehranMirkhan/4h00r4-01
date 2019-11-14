<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Utility;
use App\Models\Solve;
use Illuminate\Http\Request;

class SolveController extends Controller {
    public function index(Request $request) {
        return Utility::richRetrieve($request, Solve::query());
    }

    public function store(Request $request) {
        $solve = Solve::create($request->all());
        return Solve::query()->where('id', $solve->id)->firstOrFail();
    }

    public function show(Solve $solve) {
        return $solve;
    }

    public function update(Request $request, Solve $solve) {
        $solve->update($request->all());
        return Solve::query()->where('id', $solve->id)->firstOrFail();
    }

    public function destroy(Solve $solve) {
        try {
            $solve->delete();
            return response()->json(['message' => 'پاسخ حذف شد'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'خطای نامشخص'], $e->getCode());
        }
    }

    //----------  Sub Routes  ----------
    public function user(Solve $solve) {
        return $solve->user();
    }

    public function question(Solve $solve) {
        return $solve->question();
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Solve;
use Illuminate\Http\Request;

class SolveController extends Controller {
    public function index() {
        return Solve::all();
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
            return response()->json('پاسخ حذف شد', 200);
        } catch (\Exception $e) {
            return response()->json('خطای نامشخص', $e->getCode());
        }
    }
}

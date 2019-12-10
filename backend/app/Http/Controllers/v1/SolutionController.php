<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Utility;
use App\Models\Solution;
use Illuminate\Http\Request;

class SolutionController extends Controller {
    public function index(Request $request) {
        return Utility::richRetrieve($request, Solution::query());
    }

    public function store(Request $request) {
        $solution = Solution::create($request->all());
        return Solution::query()->where('id', $solution->id)->firstOrFail();
    }

    public function show(Solution $solution) {
        return $solution;
    }

    public function update(Request $request, Solution $solution) {
        $solution->update($request->all());
        return Solution::query()->where('id', $solution->id)->firstOrFail();
    }

    public function destroy(Solution $solution) {
        try {
            $solution->delete();
            return response()->json(['message' => 'deleted'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'unknown'], $e->getCode());
        }
    }
}

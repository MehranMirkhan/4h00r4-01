<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Utility;
use App\Models\Hint;
use Illuminate\Http\Request;


class HintController extends Controller {
    public function index(Request $request) {
        return Utility::richRetrieve($request, Hint::query());
    }

    public function store(Request $request) {
        $hint = Hint::create($request->all());
        return Hint::query()->where('id', $hint->id)->firstOrFail();
    }

    public function show(Hint $hint) {
        return Hint::query()->where('id', $hint->id)->firstOrFail();
    }

    public function update(Request $request, Hint $hint) {
        $hint->update($request->all());
        return Hint::query()->where('id', $hint->id)->firstOrFail();
    }

    public function destroy(Hint $hint) {
        try {
            $hint->delete();
            return response()->json(['message' => 'deleted'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'unknown'], $e->getCode());
        }
    }
}

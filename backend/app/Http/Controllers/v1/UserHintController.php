<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Utility;
use App\Models\Hint;
use App\Models\UserHint;
use Illuminate\Http\Request;


class UserHintController extends Controller {
    public function index(Request $request) {
        return Utility::richRetrieve($request, UserHint::query());
    }

    public function store(Request $request) {
        $userHint = UserHint::create($request->all());
        return UserHint::query()->where('id', $userHint->id)->firstOrFail();
    }

    public function show(UserHint $userHint) {
        return UserHint::query()->where('id', $userHint->id)->firstOrFail();
    }

    public function update(Request $request, UserHint $userHint) {
        $userHint->update($request->all());
        return UserHint::query()->where('id', $userHint->id)->firstOrFail();
    }

    public function destroy(UserHint $userHint) {
        try {
            $userHint->delete();
            return response()->json(['message' => 'deleted'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'unknown'], $e->getCode());
        }
    }

    // ----------------------- User routes
    public function buy($id, Request $request) {
        $user = $request->user();
        $hint = Hint::query()->where('id', $id)->firstOrFail();
        $user->coin_1 -= $hint->price;
        if ($user->coin_1 >= 0) {
            UserHint::create([
                'user_id' => $user->id,
                'hint_id' => $id,
            ]);
            $user->update();
            unset($hint['created_at']);
            unset($hint['updated_at']);
            return $hint;
        } else {
            return response()->json(['message' => 'server.hint.notEnoughCoin'], 400);
        }
    }
}

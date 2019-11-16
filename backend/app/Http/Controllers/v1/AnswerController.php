<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Utility;
use App\Models\Answer;
use Illuminate\Http\Request;

class AnswerController extends Controller {
    public function index(Request $request) {
        return Utility::richRetrieve($request, Answer::query());
    }

    public function store(Request $request) {
        $answer = Answer::create($request->all());
        return Answer::query()->where('id', $answer->id)->firstOrFail();
    }

    public function show(Answer $answer) {
        return $answer;
    }

    public function update(Request $request, Answer $answer) {
        $answer->update($request->all());
        return Answer::query()->where('id', $answer->id)->firstOrFail();
    }

    public function destroy(Answer $answer) {
        try {
            $answer->delete();
            return response()->json(['message' => 'پاسخ حذف شد'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'خطای نامشخص'], $e->getCode());
        }
    }

    //----------  Sub Routes  ----------
    public function user(Answer $answer) {
        return $answer->user();
    }

    public function question(Answer $answer) {
        return $answer->question();
    }
}

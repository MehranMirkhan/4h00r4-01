<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Utility;
use App\Models\Question;
use Illuminate\Http\Request;


class QuestionController extends Controller {
    public function index(Request $request) {
        return Utility::richRetrieve($request, Question::query());
    }

    public function store(Request $request) {
        $question = Question::create($request->all());
        return Question::query()->where('id', $question->id)->firstOrFail();
    }

    public function show(Question $question) {
        return $question;
    }

    public function update(Request $request, Question $question) {
        $question->update($request->all());
        return Question::query()->where('id', $question->id)->firstOrFail();
    }

    public function destroy(Question $question) {
        try {
            $question->delete();
            return response()->json(['message' => 'سؤال حذف شد'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'خطای نامشخص'], $e->getCode());
        }
    }

    //----------  Sub Routes  ----------
    public function solutions(Question $question) {
        return $question->solutions();
    }
}

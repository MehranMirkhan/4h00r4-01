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
        // return $question;
        return Question::query()->where('id', $question->id)->firstOrFail();
    }

    public function update(Request $request, Question $question) {
        $question->update($request->all());
        return Question::query()->where('id', $question->id)->firstOrFail();
    }

    public function destroy(Question $question) {
        try {
            $question->delete();
            return response()->json(['message' => 'deleted'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'unknown'], $e->getCode());
        }
    }

    // ----------------------- User routes
    public function getAllForUser(Request $request) {
        $page_size = 10;
        $query = Question::query();
        if (isset($request->time_type))
            $query->where('time_type', $request->time_type);
        if (isset($request['locale']))
            $query->where('locale', $request['locale']);
        return $query->paginate($page_size);
    }
}

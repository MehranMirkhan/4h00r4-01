<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Utility;
use App\Models\Question;
use App\Models\UserHint;
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

    public function getForUser($id, Request $request) {
        $question = Question::query()->where('id', $id)
                            ->with('hints')
                            ->firstOrFail();
        unset($question['solutions']);
        unset($question['created_at']);
        unset($question['updated_at']);
        foreach ($question->hints as $hint) {
            try {
                $user = $request->user();
                UserHint::query()->where([
                    'hint_id' => $hint->id,
                    'user_id' => $user->id,
                ])->firstOrFail();
            } catch (\Exception $e) {
                unset($hint['value']);
            }
            unset($hint['created_at']);
            unset($hint['updated_at']);
        }
        return $question;
    }
}

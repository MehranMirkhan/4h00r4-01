<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Utility;
use App\Models\Question;
use App\Models\Answer;
use App\Models\UserHint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            return response()->json(['message' => 'Unknown Error'], $e->getCode());
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
        $query->orderBy('start_time', 'desc');
        return $query->paginate($page_size);
    }

    public function getForUser($id, Request $request) {
        $user = $request->user();
        $question = Question::query()->where('id', $id)
                            ->with('hints')
                            ->firstOrFail();
        $answers = Answer::query()->where([
            'question_id' => $id,
            'user_id'     => $user->id,
        ])->get();
        $question['tries'] -= count($answers);
        $c = Answer::query()->where([
            'question_id' => $id,
            'user_id'     => $user->id,
            'correct'     => true,
        ])->count();
        if ($c > 0)
            $question['solved'] = true;

        unset($question['solutions']);
        unset($question['created_at']);
        unset($question['updated_at']);

        $user_hints = DB::table('user_hints')
                ->leftJoin('hints', 'user_hints.hint_id', '=', 'hints.id')
                ->where([
                    'question_id' => $question->id,
                    'user_id' => $user->id,
                ])
                ->get();
        $question['bought_hints'] = $user_hints->map(function ($x) { return $x->hint_id; });

        foreach ($question->hints as $hint) {
            try {
                $found = false;
                foreach ($user_hints as $uh) {
                    if ($uh->hint_id === $hint->id) {
                        $found = true;
                        break;
                    }
                }
                if (!$found)
                    unset($hint['value']);
                if ($hint->type === "try") {
                    $try_hint_count = UserHint::query()->where([
                        'hint_id' => $hint->id,
                        'user_id' => $user->id,
                    ])->count();
                    $question['tries'] += $try_hint_count;
                }
            } catch (\Exception $e) {
                unset($hint['value']);
            }
            unset($hint['created_at']);
            unset($hint['updated_at']);
        }
        return $question;
    }
}

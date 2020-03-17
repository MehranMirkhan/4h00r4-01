<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Utility;
use App\Models\Answer;
use App\Models\Hint;
use App\Models\Question;
use App\Models\UserHint;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AnswerController extends Controller {
    public function index(Request $request) {
        return Utility::richRetrieve($request, Answer::query());
    }

    public function store(Request $request) {
        $request['correct'] = false;
        $question = Question::query()->where('id', $request->question_id)->firstOrFail();
        $solutions = json_decode($question->solutions);
        foreach ($solutions as $solution) {
            if ($solution === $request->text) {
                $request['correct'] = true;
                break;
            }
        }
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
            return response()->json(['message' => 'deleted'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Unknown Error'], $e->getCode());
        }
    }

    // ----------------------- User routes
    public function handleAnswer(Request $request) {
        $request->validate([
            'question_id' => 'required',
            'text'        => 'required',
        ]);

        $q_id = $request->question_id;
        $user = $request->user();
        $u_id = $user->id;

        $question = Question::query()->where('id', $q_id)->firstOrFail();

        // Check if the deadline is reached
        if (Carbon::parse($question->end_time)->lt(Carbon::now()))
            return response()->json(['message' => 'Answering time is over'], 403);

        // Check if the user has answered correctly already
        $c = Answer::query()->where([
            'question_id' => $q_id,
            'user_id'     => $u_id,
            'correct'     => true,
        ])->count();
        if ($c > 0)
            return response()->json(['message' => 'You have already answered this question'], 403);

        // Check if the user has reached the number of tries
        $c = Answer::query()->where([
            'question_id' => $q_id,
            'user_id'     => $u_id,
        ])->count();
        try {
            $h = Hint::query()->where(['question_id' => $q_id, 'type' => 'try'])->firstOrFail();
            $try_hint_count = UserHint::query()->where([
                'hint_id' => $h->id,
                'user_id' => $u_id,
                ])->count();
            $c -= $try_hint_count;
        } catch(\Exception $e) {}
        if ($c >= $question->tries)
            return response()->json(['message' => 'Maximum number of tries reached'], 403);

        $answer = [
            'question_id' => $q_id,
            'user_id'     => $u_id,
            'text'        => $request->text,
            'correct'     => false,
        ];
        $solutions = json_decode($question->solutions);
        foreach ($solutions as $solution) {
            if ($solution === $request->text) {
                $answer['correct'] = true;
                break;
            }
        }
        $a = Answer::create($answer);
        if ($answer['correct']) {
            $type = $question->time_type === 'daily' ? 'score_daily' : 'score_weekly';
            $user->update([
                $type => $user[$type] + $question->score
            ]);
        }
        return $a;
    }
}

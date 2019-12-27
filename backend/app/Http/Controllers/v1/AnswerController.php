<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Utility;
use App\Models\Answer;
use App\Models\Question;
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
            return response()->json(['message' => 'unknown'], $e->getCode());
        }
    }
}

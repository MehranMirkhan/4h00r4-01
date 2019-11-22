<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Question;


class ReportController extends Controller {
    public function index() {
        $report = [
            "users" => [
                "count" => User::count(),
            ],
            "questions" => [
                "count" => Question::count(),
            ],
        ];
        return response()->json($report, 200);
    }
}

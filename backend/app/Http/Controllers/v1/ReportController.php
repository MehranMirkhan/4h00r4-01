<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Question;
use Carbon\Carbon;


class ReportController extends Controller {
    public function index() {
        $report = [
            "server" => [
                "timestamp" => Carbon::now(),
            ],
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

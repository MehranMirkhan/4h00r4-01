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
                "count"      => User::count(),
                "top_daily"  => User::query()->orderBy('score_daily', 'desc')->take(10)->get(),
                "top_weekly" => User::query()->orderBy('score_weekly', 'desc')->take(10)->get(),
                "ad_watch"   => User::query()->orderBy('ad_watch', 'desc')->take(10)->get(),
            ],
            "questions" => [
                "count" => Question::count(),
            ],
        ];
        return response()->json($report, 200);
    }
}

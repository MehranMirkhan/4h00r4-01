<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Utility;
use App\Models\News;
use Illuminate\Http\Request;


class NewsController extends Controller {
    public function index(Request $request) {
        return Utility::richRetrieve($request, News::query());
    }

    public function store(Request $request) {
        $news = News::create($request->all());
        return News::query()->where('id', $news->id)->firstOrFail();
    }

    public function show(News $news) {
        return News::query()->where('id', $news->id)->firstOrFail();
    }

    public function update(Request $request, News $news) {
        $news->update($request->all());
        return News::query()->where('id', $news->id)->firstOrFail();
    }

    public function destroy(News $news) {
        try {
            $news->delete();
            return response()->json(['message' => 'deleted'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'unknown'], $e->getCode());
        }
    }

    // ----------------------- User routes
    public function getActiveNews() {
        return News::query()->where('is_active', true)->get();
    }
}

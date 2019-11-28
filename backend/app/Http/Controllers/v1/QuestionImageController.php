<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Utility;
use App\Models\QuestionImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class QuestionImageController extends Controller {
    public function index(Request $request) {
        return Utility::richRetrieve($request, QuestionImage::query());
    }

    public function store(Request $request) {
        $path = 'question_images/' .
                $request->question_id . '/' .
                $request->file('file')->getClientOriginalName();
        Storage::put(
            $path,
            file_get_contents($request->file('file')->getRealPath())
        );
        $questionImage = QuestionImage::create([
            'question_id' => $request->question_id,
            'file' => $path,
        ]);
        $questionImage = QuestionImage::query()->where('id', $questionImage->id)->firstOrFail();
        $questionImage->file = Storage::url($questionImage->file);
        return $questionImage;
    }

    public function show(QuestionImage $questionImage) {
        $questionImage->file = Storage::url($questionImage->file);
        return $questionImage;
    }

    public function destroy(QuestionImage $questionImage) {
        try {
            $questionImage->delete();
            Storage::delete($questionImage->file);
            return response()->json(['message' => 'تصویر حذف شد'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'خطای نامشخص'], $e->getCode());
        }
    }
}

<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller {
    public function store(Request $request) {
        $request->validate([
            'path' => 'required|string',
        ]);
        $file_name = $request->file('file')->getClientOriginalName();
        $ext = explode('.', $file_name);
        $ext = $ext[sizeof($ext) - 1];
        $file_name = hash('md5', $file_name . '-' . Carbon::now()->toIso8601String());
        $file_name = $file_name . '.' . $ext;
        $path = $request->path .
                (substr($request->path, -1) === '/' ? '' : '/') .
                $file_name;
        Storage::put(
            'public/' . $path,
            file_get_contents($request->file('file')->getRealPath())
        );
        return [
            'relative_path' => $path,
            'absolute_path' => asset(Storage::url($path)),
        ];
    }

    public function destroy(Request $request) {
        $request->validate([
            'path' => 'required|string',
        ]);
        try {
            Storage::delete('public/' . $request->path);
            return response()->json(['message' => 'deleted'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'unknown'], $e->getCode());
        }
    }
}

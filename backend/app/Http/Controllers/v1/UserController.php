<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller {
    public function me(Request $request) {
        return $request->user();
    }

    public function index() {
        return User::all();
    }

    public function show(User $user) {
        return $user;
    }

    public function update(Request $request, User $user) {
        $user->update($request->except(['password']));
        return $user;
    }

    public function changePassword(Request $request) {
        $request->validate([
            'old_password' => 'required|string|min:6',
            'new_password' => 'required|string|min:6',
        ]);
        $user = $request->user();
        $attempt = Request::create('/api/login', 'post', [
            'username' => isset($user->phone) ? $user->phone : $user->email,
            'password' => $request->old_password,
        ]);
        $response = app()->handle($attempt);
        if ($response->getStatusCode() != 200)
            return response()->json('رمز عبور قدیمی صحیح نیست', 403);
        $user->update(['password' => Hash::make($request->new_password)]);
        $userTokens = $user->tokens;
        foreach ($userTokens as $token) {
            $token->revoke();
        }
        return response()->json('رمز عبور تغییر کرد', 200);
    }

    public function destroy(User $user) {
        try {
            $user->delete();
            return response()->json('کاربر حذف شد', 200);
        } catch (\Exception $e) {
            return response()->json('خطای نامشخص', $e->getCode());
        }
    }
}

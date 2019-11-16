<?php

namespace App\Http\Controllers\Auth;


use App\Http\Controllers\Controller;
use App\Models\User;
use GuzzleHttp\Exception\BadResponseException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller {
    public function login(Request $request) {
        try {
            $user = (new User)->findForPassport($request->username);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'نام کاربری یا رمز عبور اشتباه است'], 401);
        }
        try {
            $tokenRequest = Request::create('/oauth/token', 'post', [
                'grant_type'    => 'password',
                'client_id'     => config('services.passport.client_id'),
                'client_secret' => config('services.passport.client_secret'),
                'username'      => $request->username,
                'password'      => $request->password,
                'scope'         => $user->role,
            ]);
            $response = app()->handle($tokenRequest);
            return $response;
        } catch (BadResponseException $e) {
            if ($e->getCode() === 400)
                return response()->json(['message' => 'درخواست نامعتبر است. لطفاً نام کاربری و رمز عبور وارد کنید'], $e->getCode());
            else if ($e->getCode() === 401)
                return response()->json(['message' => 'نام کاربری یا رمز عبور اشتباه است'], $e->getCode());
            return response()->json(['message' => 'خطای نامشخص'], $e->getCode());
        }
    }

    public function register(Request $request) {
        $request->validate([
            'name'     => 'string|max:255',
            'email'    => 'string|email|max:255|unique:users',
            'phone'    => 'string|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if (!isset($request->email) && !isset($request->phone))
            return response()->json(['message' => 'نام کاربری وارد نشده است'], 400);

        return User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'phone'    => $request->phone,
            'password' => Hash::make($request->password),
        ]);
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
            return response()->json(['message' => 'رمز عبور قدیمی صحیح نیست'], 403);
        $user->update(['password' => Hash::make($request->new_password)]);
        $userTokens = $user->tokens;
        foreach ($userTokens as $token) {
            $token->revoke();
        }
        return response()->json(['message' => 'رمز عبور تغییر کرد'], 200);
    }
}

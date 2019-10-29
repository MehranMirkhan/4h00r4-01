<?php

namespace App\Http\Controllers\Auth;


use App\Http\Controllers\Controller;
use App\Models\User;
use GuzzleHttp\Exception\BadResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller {
    public function login(Request $request) {
        try {
            $user = (new User)->findForPassport($request->username);
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
                return response()->json('درخواست نامعتبر است. لطفاً نام کاربری و رمز عبور وارد کنید', $e->getCode());
            else if ($e->getCode() === 401)
                return response()->json('نام کاربری یا رمز عبور اشتباه است', $e->getCode());
            return response()->json('خطای نامشخص', $e->getCode());
        }
    }

    public function register(Request $request) {
        $request->validate([
            'name'     => ['string', 'max:255'],
            'email'    => ['string', 'email', 'max:255', 'unique:users'],
            'phone'    => ['string', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6']
        ]);

        if (!isset($request->email) && !isset($request->phone))
            return response()->json('نام کاربری وارد نشده است', 400);

        return User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'phone'    => $request->phone,
            'password' => Hash::make($request->password),
        ]);
    }
}

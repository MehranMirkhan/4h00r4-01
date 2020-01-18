<?php

namespace App\Http\Controllers\Auth;


use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class AuthController extends Controller {
    public function login(Request $request) {
        try {
            $user = (new User)->findForPassport($request->username);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'server.auth.wrongCredentials'], 401);
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
        } catch (\Exception $e) {
            if ($e->getCode() === 400)
                return response()->json(['message' => 'server.auth.badRequest'], $e->getCode());
            else if ($e->getCode() === 401)
                return response()->json(['message' => 'server.auth.wrongCredentials'], $e->getCode());
            return response()->json(['message' => 'unknown'], $e->getCode());
        }
    }

    public function register(Request $request) {
        // $request->validate([
        //     'username' => 'required|string|max:255|unique:users',
        //     'password' => 'required|string|min:6',
        // ]);

        $request->validate([
            'password' => 'required|string|min:6',
        ]);

        // return User::create([
        //     'username' => $request->username,
        //     'password' => Hash::make($request->password),
        // ]);

        $username = hash('md5', 'NewUser-' . Carbon::now()->toIso8601String());
        $password = $request->password;

        User::create([
            'username' => $username,
            'password' => Hash::make($password),
        ]);

        return response()->json([
            'username' => $username,
            'password' => $password,
        ], 201);
    }

    public function changePassword(Request $request) {
        $request->validate([
            'old_password' => 'required|string',
            'new_password' => 'required|string|min:6',
        ]);
        $user = $request->user();
        $attempt = Request::create('/api/login', 'post', [
            'username' => $user->username,
            'password' => $request->old_password,
        ]);
        $response = app()->handle($attempt);
        if ($response->getStatusCode() != 200)
            return response()->json(['message' => 'server.auth.wrongOldPassword'], 403);
        $user->update(['password' => Hash::make($request->new_password)]);
        $userTokens = $user->tokens;
        foreach ($userTokens as $token) {
            $token->revoke();
        }
        return response()->json(['message' => 'server.auth.passwordChanged'], 200);
    }
}

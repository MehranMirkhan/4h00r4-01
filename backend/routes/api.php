<?php

use Illuminate\Support\Facades\Route;


Route::group(['namespace' => 'Auth'], function () {
    Route::post('/login', 'AuthController@login');
    Route::post('/register', 'AuthController@register');
    Route::post('/password', 'AuthController@changePassword');
});

Route::group(['middleware' => ['auth:api', 'scope:admin'], 'prefix' => 'admin'], function () {
    Route::group(['namespace' => 'v1', 'prefix' => 'v1'], function () {
        Route::apiResource('users', 'UserController')->except(['store']);
        Route::apiResource('questions', 'QuestionController');
        Route::apiResource('solutions', 'SolutionController');
        Route::apiResource('answers', 'AnswerController');
        Route::apiResource('solves', 'SolveController');
    });
});

Route::group(['middleware' => 'auth:api'], function () {
    Route::group(['namespace' => 'v1', 'prefix' => 'v1'], function () {
        Route::get('/me', 'UserController@me');
    });
});

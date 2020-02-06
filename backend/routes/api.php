<?php

use Illuminate\Support\Facades\Route;


Route::group(['namespace' => 'Auth'], function () {
    Route::post('/login', 'AuthController@login');
    Route::post('/register', 'AuthController@register');
});

Route::group(['middleware' => ['auth:api', 'scope:admin'], 'prefix' => 'admin'], function () {
    Route::group(['namespace' => 'v1', 'prefix' => 'v1'], function () {
        Route::get('report', 'ReportController@index');
        Route::apiResource('users', 'UserController')->except(['store']);
        Route::apiResource('questions', 'QuestionController');
        Route::apiResource('answers', 'AnswerController');
        Route::apiResource('hints', 'HintController');
        Route::apiResource('user_hints', 'UserHintController');
        Route::apiResource('user_level_hints', 'UserLevelHintController');
        Route::apiResource('achievements', 'AchievementController');
        Route::apiResource('user_achievements', 'UserAchievementController');
        Route::apiResource('news', 'NewsController');
    });
});

Route::group(['middleware' => 'auth:api'], function () {
    Route::group(['namespace' => 'Auth'], function () {
        Route::post('/password', 'AuthController@changePassword');
    });
    Route::post('/files', 'FileController@store');
    Route::delete('/files', 'FileController@destroy');

    Route::group(['namespace' => 'v1', 'prefix' => 'v1'], function () {
        Route::get('/me', 'UserController@me');
        Route::patch('/me', 'UserController@updateMe');
        Route::get('/questions', 'QuestionController@getAllForUser');
        Route::get('/questions/{id}', 'QuestionController@getForUser');
        Route::post('/answers', 'AnswerController@handleAnswer');
        Route::post('/hints/{id}/buy', 'UserHintController@buy');
        Route::post('/level_hints/{levelId}/{hintId}/{cost}/buy', 'UserLevelHintController@buy');
    });
});

Route::get('/active_news', 'NewsController@getActiveNews');

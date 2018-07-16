<?php

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/auth/register', 'CustomAuthController@register');
Route::post('/auth/login', 'CustomAuthController@login');

Route::middleware(['jwt.auth'])->group(function (){
    Route::post('/user', function (Request $request){
        $user = JWTAuth::toUser($request->token);
        return response()->json($user);
    });
    Route::post('/users/unchallenged', 'ChallengeController@unchallenged');
    Route::post('/users/challengers', 'ChallengeController@challengers');
    Route::post('/users/sentchallenges', 'ChallengeController@sentChallenges');
    Route::post('/challenge/{id?}', 'ChallengeController@challenge');
    Route::post('/cancelchallenge/{id?}', 'ChallengeController@cancelChallenge');
    Route::post('/acceptchallenge/{id?}', 'ChallengeController@acceptChallenge');
    Route::post('/declinechallenge/{id?}', 'ChallengeController@declineChallenge');
});





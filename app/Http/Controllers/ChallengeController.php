<?php

namespace App\Http\Controllers;

use App\Challenge;
use App\Events\ChallengeReceived;
use App\Game;
use App\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class ChallengeController extends Controller
{
    public function challenge(Request $request, $id){
        $user = JWTAuth::toUser($request->token);
        $u = User::where('id', $id)->first();
        if($user->hasChallenged($u)){
            return response()->json(['message' => 'Already challenged!']);
        }
        if($user->isChallengedBy($u)){
            return response()->json(['message' => 'This user has already challenged you!']);
        }
        $challenge = new Challenge([
            'from' => $user->id,
            'to' => $id
        ]);

        if($challenge->save()) {
            broadcast(new ChallengeReceived($user, $u))->toOthers();
            return response()->json(['message' => 'Challenge sent!']);
        }
        return response()->json(['error' => 'Something went wrong!'], 500);
    }

    public function cancelChallenge(Request $request, $id){
        $user = JWTAuth::toUser($request->token);
        if($user->hasChallenged($u = User::where('id', $id)->first())){
            $challenge = Challenge::where('from', $user->id)->where('to', $id);
            if($challenge->delete())
                return response()->json(['message' => 'Challenge cancelled!']);
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
        return response()->json(['error' => 'No such challenge!'], 404);
    }

    public function acceptChallenge(Request $request, $id){
        $user = JWTAuth::toUser($request->token);
        $challenge = Challenge::where('from', $id)->where('to', $user->id);
        if($challenge->count() > 0) {
            if($challenge->delete()){
                $game = new Game([
                    'player1' => $id,
                    'player2' => $user->id,
                ]);
                if($game->save()){
                    return response()->json(['message' => 'Challenge accepted!']);
                }
            }

            return response()->json(['error' => 'Something went wrong!'], 500);
        }
        return response()->json(['error' => 'No such challenge!'], 404);
    }

    public function declineChallenge(Request $request, $id){
        $user = JWTAuth::toUser($request->token);
        $challenge = Challenge::where('from', $id)->where('to', $user->id);
        if($challenge->count() > 0) {
            if($challenge->delete()){
                return response()->json(['message' => 'Challenge declined!']);
            }
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
        return response()->json(['error' => 'No such challenge!'], 404);
    }

    public function challengers(Request $request){
        $user = JWTAuth::toUser($request->token);

        $users = $user->receivedChallenges()->get()->map(function ($challenge){
            return User::where('id', $challenge->from)->first();
        });
        return response()->json($users->toArray());
    }

    public function sentChallenges(Request $request){
        $user = JWTAuth::toUser($request->token);

        $users = $user->sentChallenges()->get()->map(function ($challenge){
            return User::where('id', $challenge->to)->first();
        });
        return response()->json($users->toArray());
    }

    public function unchallenged(Request $request){
        $user = JWTAuth::toUser($request->token);

        $users = User::all()->where('id', '!=', $user->id)->reject(function($u) use($user){
            if($user->hasChallenged($u) || $user->isChallengedBy($u) || $user->isPlayingWith($u))
                return true;
            return false;
        });
        return response()->json($users->toArray());
    }
}

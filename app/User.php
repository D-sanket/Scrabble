<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname', 'lastname', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function getJWTIdentifier(){
        return $this->getKey();
    }

    public function getJWTCustomClaims(){
        return [];
    }

    public function receivedChallenges(){
        return $this->hasMany('App\Challenge', 'to', 'id');
    }

    public function sentChallenges(){
        return $this->hasMany('App\Challenge', 'from', 'id');
    }

    public function hasChallenged(User $user){
        return Challenge::where('from', $this->id)->where('to', $user->id)->count() > 0;
    }

    public function isChallengedBy(User $user){
        return Challenge::where('to', $this->id)->where('from', $user->id)->count() > 0;
    }

    public function isPlayingWith(User $user){
        return (Game::where('player1', $this->id)->where('player2', $user->id)->count() > 0) || (Game::where('player2', $this->id)->where('player1', $user->id)->count() > 0);
    }
}

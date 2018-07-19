<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = ['player1', 'player2', 'score1', 'score2', 'bag_id'];
}

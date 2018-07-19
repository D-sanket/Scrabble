<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Challenge extends Model
{
    protected $fillable = ['from', 'to'];

    public function challenger(){
        return $this->belongsTo('App\User', 'id', 'from');
    }

    public function challenged(){
        return $this->belongsTo('App\User', 'id', 'to');
    }
}

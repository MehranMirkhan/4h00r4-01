<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Solve extends Model {
    protected $table = 'solves';

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function question() {
        return $this->belongsTo(Question::class);
    }
}
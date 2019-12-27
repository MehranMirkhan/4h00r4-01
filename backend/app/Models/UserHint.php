<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserHint extends Model {
    protected $table    = 'user_hints';
    protected $fillable = [
        'user_id',
        'hint_id',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function hint() {
        return $this->belongsTo(Hint::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserLevelHint extends Model {
    protected $table    = 'user_level_hints';
    protected $fillable = [
        'user_id',
        'level_id',
        'hint_id',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}

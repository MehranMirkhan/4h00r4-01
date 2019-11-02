<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Solution extends Model {
    protected $table    = 'solutions';
    protected $fillable = [
        'text',
        'question_id',
    ];

    public function question() {
        return $this->belongsTo(Question::class);
    }
}

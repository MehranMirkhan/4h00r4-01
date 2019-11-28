<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model {
    protected $table    = 'questions';
    protected $fillable = [
        'text',
        'time_type',
        'answer_type',
        'start_time',
        'end_time',
        'letters',
        'score',
        'tries',
    ];
    protected $casts    = [
        'start_time' => 'datetime',
        'end_time'   => 'datetime',
    ];

    public function solutions() {
        return $this->hasMany(Solution::class);
    }

    public function images() {
        return $this->hasMany(QuestionImage::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model {
    protected $table    = 'questions';
    protected $fillable = [
        'title',
        'images',
        'start_time',
        'end_time',
        'score',
        'tries',
        'time_type',
        'answer_type',
        'choices',
        'letters',
        'letters_num',
        'solutions',
        'locale',
    ];
    protected $casts    = [
        'start_time' => 'datetime',
        'end_time'   => 'datetime',
    ];

    public function answers() {
        return $this->hasMany(Answer::class);
    }

    public function hints() {
        return $this->hasMany(Hint::class);
    }
}

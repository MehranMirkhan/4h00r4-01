<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestionImage extends Model {
    protected $table    = 'question_images';
    protected $fillable = [
        'question_id',
        'file',
    ];

    public function question() {
        return $this->belongsTo(Question::class);
    }
}

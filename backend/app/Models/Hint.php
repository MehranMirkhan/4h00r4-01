<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hint extends Model {
    protected $table    = 'hints';
    protected $fillable = [
        'question_id',
        'type',
        'value',
        'price',
    ];

    public function question() {
        return $this->belongsTo(Question::class);
    }
}

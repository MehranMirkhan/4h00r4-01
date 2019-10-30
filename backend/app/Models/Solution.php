<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Solution extends Model {
    protected $table    = 'solutions';
    protected $fillable = [
        'text',
    ];
}

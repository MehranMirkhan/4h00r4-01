<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable {
    use HasApiTokens, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'name', 'email', 'phone', 'password', 'role',
        'is_active', 'coin_1', 'coin_2', 'score_daily',
        'score_weekly', 'profile_pic', 'daily_solved_count',
        'weekly_solved_count', 'level',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function findForPassport($username) {
        return $this->where('email', $username)
                    ->orWhere('phone', $username)
                    ->firstOrFail();
    }

    public function solves() {
        return $this->hasMany(Solve::class);
    }
}

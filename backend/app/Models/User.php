<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable {
    use HasApiTokens, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'username', 'name', 'email', 'phone', 'password', 'role',
        'is_active', 'coin_1', 'coin_2', 'score_daily',
        'score_weekly', 'level', 'profile_pic',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'phone_verified_at' => 'datetime',
        'email_verified_at' => 'datetime',
    ];

    public function findForPassport($username) {
        return $this->where('username', $username)
                    ->orWhere('phone', $username)
                    ->orWhere('email', $username)
                    ->firstOrFail();
    }

    public function answers() {
        return $this->hasMany(Answer::class);
    }

    public function hints() {
        return $this->hasMany(UserHint::class);
    }

    public function levelHints() {
        return $this->hasMany(UserLevelHint::class);
    }

    public function achievements() {
        return $this->hasMany(UserAchievement::class);
    }
}

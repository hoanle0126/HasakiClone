<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VerifyCode extends Model
{
    protected $table = 'verify_codes';

    protected $fillable = [
        'verification_code',
        'verification_code_expires_at',
        'email',
    ];
}

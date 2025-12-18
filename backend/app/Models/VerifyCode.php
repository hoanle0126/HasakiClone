<?php

namespace App\Models;

use App\Traits\SyncsToSlaveDatabase;
use Illuminate\Database\Eloquent\Model;

class VerifyCode extends Model
{
    use SyncsToSlaveDatabase;
    protected $table = 'verify_codes';

    protected $fillable = [
        'verification_code',
        'verification_code_expires_at',
        'email',
    ];
}

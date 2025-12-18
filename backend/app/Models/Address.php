<?php

namespace App\Models;

use App\Traits\SyncsToSlaveDatabase;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use SyncsToSlaveDatabase;
    protected $fillable = [
        "name",
        "phone",
        "province",
        "district",
        "ward",
        "street_address",
        "default",
        "user_id"
    ];

    public function User()
    {
        return $this->belongsTo(User::class);
    }
}

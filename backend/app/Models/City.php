<?php

namespace App\Models;

use App\Traits\SyncsToSlaveDatabase;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory, SyncsToSlaveDatabase;

    protected $fillable = [
        "id",
        "name",
        "code_name",
        "division_type",
        "phone_code"
    ];

    public function districts()
    {
        return $this->hasMany(District::class)->with("wards");
    }
}

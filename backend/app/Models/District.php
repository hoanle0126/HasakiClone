<?php

namespace App\Models;

use App\Traits\SyncsToSlaveDatabase;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    use HasFactory, SyncsToSlaveDatabase;

    protected $fillable = [
        "id",
        "name",
        "code_name",
        "division_type",
        "city_id"
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function wards()
    {
        return $this->hasMany(Ward::class);
    }
}

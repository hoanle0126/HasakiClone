<?php

namespace App\Models;

use App\Traits\SyncsToSlaveDatabase;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ward extends Model
{
    use HasFactory, SyncsToSlaveDatabase;

    protected $fillable = [
        "id",
        "name",
        "code_name",
        "division_type",
        "district_id",
    ];

    public function districts()
    {
        return $this->belongsTo(Ward::class);
    }
}

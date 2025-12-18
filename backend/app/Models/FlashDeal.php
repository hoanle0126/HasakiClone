<?php

namespace App\Models;

use App\Traits\SyncsToSlaveDatabase;
use App\Traits\HasBelongsToManyWithSync;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlashDeal extends Model
{
    use HasFactory, SyncsToSlaveDatabase, HasBelongsToManyWithSync;

    protected $fillable = [
        "start_time",
        "end_time"
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}

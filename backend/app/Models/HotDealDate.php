<?php

namespace App\Models;

use App\Traits\SyncsToSlaveDatabase;
use App\Traits\HasBelongsToManyWithSync;
use Illuminate\Database\Eloquent\Model;

class HotDealDate extends Model
{
    use SyncsToSlaveDatabase, HasBelongsToManyWithSync;
    protected $fillable = [
        "hot_deal_id",
        "time"
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class)->withPivot("sales");
    }
}

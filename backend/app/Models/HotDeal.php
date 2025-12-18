<?php

namespace App\Models;

use App\Traits\SyncsToSlaveDatabase;
use Illuminate\Database\Eloquent\Model;

class HotDeal extends Model
{
    use SyncsToSlaveDatabase;
    protected $fillable = [
        "name",
        "banners",
        "url"
    ];

    protected $casts = [
        "banners" => "array"
    ];

    public function dates()
    {
        return $this->hasMany(HotDealDate::class)->with("products");
    }
}

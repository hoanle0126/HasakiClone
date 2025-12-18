<?php

namespace App\Models;

use App\Traits\SyncsToSlaveDatabase;
use App\Traits\HasBelongsToManyWithSync;
use Illuminate\Database\Eloquent\Model;

class DiscountCode extends Model
{
    use SyncsToSlaveDatabase, HasBelongsToManyWithSync;
    protected $fillable = [
        "name",
        "discount",
        "code",
        "applyAll"
    ];
    public function getRouteKeyName()
    {
        return 'code';
    }

    public function Products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function Brands()
    {
        return $this->belongsToMany(Brand::class);
    }
}

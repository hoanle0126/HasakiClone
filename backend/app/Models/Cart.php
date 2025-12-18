<?php

namespace App\Models;

use App\Traits\SyncsToSlaveDatabase;
use App\Traits\HasBelongsToManyWithSync;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use SyncsToSlaveDatabase, HasBelongsToManyWithSync;
    protected $fillable = [
        "user_id"
    ];

    public function Products()
    {
        return $this->belongsToMany(Product::class)->withPivot("quantity")->withTimestamps();
    }

    public function Users()
    {
        return $this->belongsTo(User::class);
    }
}

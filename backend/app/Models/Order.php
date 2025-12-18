<?php

namespace App\Models;

use App\Traits\SyncsToSlaveDatabase;
use App\Traits\HasBelongsToManyWithSync;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use SyncsToSlaveDatabase, HasBelongsToManyWithSync;
    protected $fillable = [
        "user_id",
        "payments",
        "note",
        "voucher_id",
        "discount_code_id",
        "address_id"
    ];

    protected $casts = [
        "payments" => "array"
    ];

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function DiscountCode()
    {
        return $this->belongsTo(DiscountCode::class);
    }

    public function Address()
    {
        return $this->belongsTo(Address::class);
    }

    public function Products()
    {
        // Tự động sync sang slave database nhờ trait HasBelongsToManyWithSync
        return $this->belongsToMany(Product::class)->withPivot("quantity");
    }
}

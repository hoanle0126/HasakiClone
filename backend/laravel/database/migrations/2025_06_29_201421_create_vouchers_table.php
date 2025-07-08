<?php

use App\Models\Brand;
use App\Models\DiscountCode;
use App\Models\Product;
use App\Models\Voucher;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->float("discount");
            $table->timestamps();
        });

        Schema::create('voucher_product', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Voucher::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Product::class)->constrained()->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create('voucher_code_brand', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Voucher::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Brand::class)->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};

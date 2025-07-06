<?php

namespace Database\Seeders;

use App\Models\Categories;
use App\Models\FlashDeal;
use App\Models\Type;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(1000)->create();
        // FlashDeal::factory(1)->create;
    }
}

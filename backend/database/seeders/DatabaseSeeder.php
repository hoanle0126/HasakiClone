<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            SqlFileSeeder::class,
            // Bạn có thể gọi các seeder khác ở đây nếu có
            // Ví dụ: UserSeeder::class,
        ]);
    }
}
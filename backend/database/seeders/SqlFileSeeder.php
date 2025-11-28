<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class SqlFileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $files = [
            'categories.sql',
            'brands.sql',
            'products.sql',
            'cities.sql',
            'districts.sql',
            'wards.sql',
            'hot_deals.sql',
        ];

        $path = database_path('sql/');
        
        // Lấy tên driver database hiện tại (vd: 'mysql', 'sqlite', 'pgsql')
        $driver = DB::connection()->getDriverName();

        // 2. Tắt kiểm tra khóa ngoại (TÙY THEO DRIVER)
        if ($driver === 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        } elseif ($driver === 'sqlite') {
            // Dùng cú pháp của SQLite
            DB::statement('PRAGMA foreign_keys = OFF;');
        } elseif ($driver === 'pgsql') {
            DB::statement("SET session_replication_role = 'replica';");
        }

        // 3. Lặp qua từng file và thực thi
        foreach ($files as $file) {
            $this->command->info("Seeding file: $file");
            $filePath = $path . $file;

            if (!File::exists($filePath)) {
                $this->command->error("File not found: $filePath");
                continue;
            }

            $handle = fopen($filePath, "r");
            if ($handle) {
                $statement = ''; 

                while (($line = fgets($handle)) !== false) {
                    $trimmedLine = trim($line);

                    if ($trimmedLine == '' || strpos($trimmedLine, '--') === 0 || strpos($trimmedLine, '#') === 0) {
                        continue;
                    }

                    $statement .= $line;

                    if (str_ends_with($trimmedLine, ';')) {
                        try {
                            DB::unprepared($statement);
                        } catch (\Illuminate\Database\QueryException $e) {
                            $this->command->error("Error in $file: " . $e->getMessage());
                        }
                        $statement = '';
                    }
                }
                fclose($handle);
            } else {
                $this->command->error("Could not open file: $file");
            }
        }

        // 4. Bật lại kiểm tra khóa ngoại (TÙY THEO DRIVER)
        if ($driver === 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        } elseif ($driver === 'sqlite') {
            // Dùng cú pháp của SQLite
            DB::statement('PRAGMA foreign_keys = ON;');
        } elseif ($driver === 'pgsql') {
            DB::statement("SET session_replication_role = 'origin';");
        }
    }
}
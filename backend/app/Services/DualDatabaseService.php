<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;

class DualDatabaseService
{
    /**
     * Execute a callback on both databases (Master and Slave)
     */
    public static function executeOnBoth(callable $callback)
    {
        $results = [];
        $errors = [];

        // Execute on Master
        try {
            DB::connection('mysql')->beginTransaction();
            $results['master'] = $callback(DB::connection('mysql'));
            DB::connection('mysql')->commit();
        } catch (Exception $e) {
            DB::connection('mysql')->rollBack();
            $errors['master'] = $e->getMessage();
            Log::error('Dual DB: Master error - ' . $e->getMessage());
        }

        // Execute on Slave
        try {
            DB::connection('mysql-slave')->beginTransaction();
            $results['slave'] = $callback(DB::connection('mysql-slave'));
            DB::connection('mysql-slave')->commit();
        } catch (Exception $e) {
            DB::connection('mysql-slave')->rollBack();
            $errors['slave'] = $e->getMessage();
            Log::error('Dual DB: Slave error - ' . $e->getMessage());
        }

        // If master failed, rollback slave too
        if (isset($errors['master']) && !isset($errors['slave'])) {
            try {
                DB::connection('mysql-slave')->rollBack();
            } catch (Exception $e) {
                // Ignore rollback error
            }
            throw new Exception('Master database operation failed: ' . $errors['master']);
        }

        // Log if slave failed but master succeeded
        if (isset($errors['slave']) && !isset($errors['master'])) {
            Log::warning('Dual DB: Slave operation failed but master succeeded - ' . $errors['slave']);
        }

        return $results;
    }

    /**
     * Insert data into both databases
     */
    public static function insert($table, $data)
    {
        return self::executeOnBoth(function ($connection) use ($table, $data) {
            return $connection->table($table)->insert($data);
        });
    }

    /**
     * Insert data and get inserted ID from both databases
     */
    public static function insertGetId($table, $data, $primaryKey = 'id')
    {
        $masterId = null;
        $slaveId = null;

        // Insert into Master first
        try {
            DB::connection('mysql')->beginTransaction();
            $masterId = DB::connection('mysql')->table($table)->insertGetId($data, $primaryKey);
            DB::connection('mysql')->commit();

            // Insert into Slave with same ID
            try {
                DB::connection('mysql-slave')->beginTransaction();
                // If primary key is 'id' and auto increment, we need to set it manually
                if ($primaryKey === 'id' && !isset($data['id'])) {
                    $data['id'] = $masterId;
                    // Temporarily disable auto increment
                    DB::connection('mysql-slave')->statement("SET @old_auto_increment = @@session.auto_increment_increment");
                    DB::connection('mysql-slave')->statement("SET @@session.auto_increment_increment = 1");
                }
                $slaveId = DB::connection('mysql-slave')->table($table)->insertGetId($data, $primaryKey);
                DB::connection('mysql-slave')->commit();
            } catch (Exception $e) {
                DB::connection('mysql-slave')->rollBack();
                throw $e;
            }
        } catch (Exception $e) {
            DB::connection('mysql')->rollBack();
            throw $e;
        }

        return $masterId; // Return master ID
    }

    /**
     * Update data in both databases
     */
    public static function update($table, $data, $where)
    {
        return self::executeOnBoth(function ($connection) use ($table, $data, $where) {
            $query = $connection->table($table);
            foreach ($where as $column => $value) {
                $query->where($column, $value);
            }
            return $query->update($data);
        });
    }

    /**
     * Delete data from both databases
     */
    public static function delete($table, $where)
    {
        return self::executeOnBoth(function ($connection) use ($table, $where) {
            $query = $connection->table($table);
            foreach ($where as $column => $value) {
                $query->where($column, $value);
            }
            return $query->delete();
        });
    }

    /**
     * Execute raw query on both databases
     */
    public static function statement($query, $bindings = [])
    {
        return self::executeOnBoth(function ($connection) use ($query, $bindings) {
            return $connection->statement($query, $bindings);
        });
    }
}


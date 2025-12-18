<?php

namespace App\Observers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DatabaseSyncObserver
{
    /**
     * Sync model to slave database after created
     */
    public function created($model)
    {
        $this->syncToSlave($model, 'insert');
    }

    /**
     * Sync model to slave database after updated
     */
    public function updated($model)
    {
        $this->syncToSlave($model, 'update');
    }

    /**
     * Sync model to slave database after deleted
     */
    public function deleted($model)
    {
        $this->syncToSlave($model, 'delete');
    }

    /**
     * Sync model to slave database
     */
    protected function syncToSlave($model, $operation)
    {
        if (!env('DB_DUAL_WRITE_ENABLED', false)) {
            return;
        }

        try {
            $table = $model->getTable();
            $attributes = $model->getAttributes();

            switch ($operation) {
                case 'insert':
                    DB::connection('mysql-slave')->table($table)->insert($attributes);
                    break;

                case 'update':
                    $primaryKey = $model->getKeyName();
                    DB::connection('mysql-slave')
                        ->table($table)
                        ->where($primaryKey, $model->getKey())
                        ->update($attributes);
                    break;

                case 'delete':
                    $primaryKey = $model->getKeyName();
                    DB::connection('mysql-slave')
                        ->table($table)
                        ->where($primaryKey, $model->getKey())
                        ->delete();
                    break;
            }
        } catch (\Exception $e) {
            // Log error but don't fail the main operation
            Log::error('Failed to sync to slave database: ' . $e->getMessage(), [
                'table' => $model->getTable(),
                'operation' => $operation,
                'model' => get_class($model),
            ]);
        }
    }
}


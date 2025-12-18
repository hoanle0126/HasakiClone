<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

trait SyncsToSlaveDatabase
{
    /**
     * Boot the trait and register model events
     */
    protected static function bootSyncsToSlaveDatabase()
    {
        if (!env('DB_DUAL_WRITE_ENABLED', false)) {
            return;
        }

        static::created(function ($model) {
            static::syncToSlave($model, 'insert');
        });

        static::updated(function ($model) {
            static::syncToSlave($model, 'update');
        });

        static::deleted(function ($model) {
            static::syncToSlave($model, 'delete');
        });
    }

    /**
     * Sync model to slave database
     */
    protected static function syncToSlave($model, $operation)
    {
        if (!env('DB_DUAL_WRITE_ENABLED', false)) {
            return;
        }

        try {
            $table = $model->getTable();
            $attributes = $model->getAttributes();

            switch ($operation) {
                case 'insert':
                    // Get the actual inserted data including timestamps
                    $attributes = array_merge(
                        $attributes,
                        $model->getOriginal() ?: []
                    );
                    
                    // Ensure ID is set if model has it
                    if ($model->getKey()) {
                        $attributes[$model->getKeyName()] = $model->getKey();
                    }

                    DB::connection('mysql-slave')->table($table)->insert($attributes);
                    break;

                case 'update':
                    $primaryKey = $model->getKeyName();
                    $keyValue = $model->getKey();
                    
                    if (!$keyValue) {
                        return;
                    }

                    DB::connection('mysql-slave')
                        ->table($table)
                        ->where($primaryKey, $keyValue)
                        ->update($attributes);
                    break;

                case 'delete':
                    $primaryKey = $model->getKeyName();
                    $keyValue = $model->getKey();
                    
                    if (!$keyValue) {
                        return;
                    }

                    DB::connection('mysql-slave')
                        ->table($table)
                        ->where($primaryKey, $keyValue)
                        ->delete();
                    break;
            }
        } catch (\Exception $e) {
            // Log error but don't fail the main operation
            Log::error('Failed to sync to slave database: ' . $e->getMessage(), [
                'table' => $model->getTable(),
                'operation' => $operation,
                'model' => get_class($model),
                'exception' => $e->getTraceAsString(),
            ]);
        }
    }
}


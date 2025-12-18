<?php

namespace App\Database\Relations;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BelongsToManyWithSync extends BelongsToMany
{
    /**
     * Attach a model to the parent and sync to slave database
     */
    public function attach($id, array $attributes = [], $touch = true)
    {
        $result = parent::attach($id, $attributes, $touch);
        
        // Sync to slave database
        $this->syncPivotToSlave($id, $attributes, 'attach');
        
        return $result;
    }

    /**
     * Detach models from the relationship and sync to slave database
     */
    public function detach($ids = null, $touch = true)
    {
        // Get IDs before detaching (for sync purpose)
        $detachIds = $ids;
        if ($ids === null) {
            // Get all related IDs
            $detachIds = $this->getRelatedIds();
        } elseif (!is_array($ids)) {
            $detachIds = [$ids];
        }

        $result = parent::detach($ids, $touch);
        
        // Sync to slave database
        $this->syncPivotDetachToSlave($detachIds);
        
        return $result;
    }

    /**
     * Sync the intermediate tables with a list of IDs or collection of models and sync to slave
     */
    public function sync($ids, $detaching = true)
    {
        $result = parent::sync($ids, $detaching);
        
        // Sync to slave database
        $this->syncPivotSyncToSlave($ids, $detaching);
        
        return $result;
    }

    /**
     * Sync pivot table to slave database for attach operation
     */
    protected function syncPivotToSlave($id, array $attributes = [], $operation = 'attach')
    {
        if (!env('DB_DUAL_WRITE_ENABLED', false)) {
            return;
        }

        try {
            $foreignKey = $this->getForeignPivotKeyName();
            $relatedKey = $this->getRelatedPivotKeyName();
            $relatedId = is_array($id) ? $id : [$id];
            $parentId = $this->getParentKey();

            $pivotTable = $this->getTable();

            foreach ($relatedId as $rid) {
                $pivotData = array_merge([
                    $foreignKey => $parentId,
                    $relatedKey => $rid,
                ], $attributes);

                // Check if record exists
                $exists = DB::connection('mysql-slave')
                    ->table($pivotTable)
                    ->where($foreignKey, $parentId)
                    ->where($relatedKey, $rid)
                    ->exists();

                if (!$exists) {
                    DB::connection('mysql-slave')->table($pivotTable)->insert($pivotData);
                } else {
                    // Update if exists
                    DB::connection('mysql-slave')
                        ->table($pivotTable)
                        ->where($foreignKey, $parentId)
                        ->where($relatedKey, $rid)
                        ->update($attributes);
                }
            }
        } catch (\Exception $e) {
            Log::error('Failed to sync pivot table to slave (attach): ' . $e->getMessage(), [
                'table' => $this->getTable(),
                'operation' => $operation,
            ]);
        }
    }

    /**
     * Sync pivot table detach to slave database
     */
    protected function syncPivotDetachToSlave($ids)
    {
        if (!env('DB_DUAL_WRITE_ENABLED', false)) {
            return;
        }

        try {
            $foreignKey = $this->getForeignPivotKeyName();
            $relatedKey = $this->getRelatedPivotKeyName();
            $parentId = $this->getParentKey();
            $pivotTable = $this->getTable();

            $query = DB::connection('mysql-slave')
                ->table($pivotTable)
                ->where($foreignKey, $parentId);

            if ($ids !== null) {
                $query->whereIn($relatedKey, (array) $ids);
            }

            $query->delete();
        } catch (\Exception $e) {
            Log::error('Failed to sync pivot table to slave (detach): ' . $e->getMessage(), [
                'table' => $this->getTable(),
            ]);
        }
    }

    /**
     * Sync pivot table sync to slave database
     */
    protected function syncPivotSyncToSlave($ids, $detaching = true)
    {
        if (!env('DB_DUAL_WRITE_ENABLED', false)) {
            return;
        }

        try {
            $foreignKey = $this->getForeignPivotKeyName();
            $relatedKey = $this->getRelatedPivotKeyName();
            $parentId = $this->getParentKey();
            $pivotTable = $this->getTable();

            // Get current IDs in slave
            $currentIds = DB::connection('mysql-slave')
                ->table($pivotTable)
                ->where($foreignKey, $parentId)
                ->pluck($relatedKey)
                ->toArray();

            $ids = $this->parseIds($ids);
            $ids = array_unique($ids);

            // Detach removed IDs
            if ($detaching) {
                $detachIds = array_diff($currentIds, $ids);
                if (!empty($detachIds)) {
                    DB::connection('mysql-slave')
                        ->table($pivotTable)
                        ->where($foreignKey, $parentId)
                        ->whereIn($relatedKey, $detachIds)
                        ->delete();
                }
            }

            // Attach new IDs
            $attachIds = array_diff($ids, $currentIds);
            foreach ($attachIds as $attachId) {
                $pivotData = [
                    $foreignKey => $parentId,
                    $relatedKey => $attachId,
                ];
                DB::connection('mysql-slave')->table($pivotTable)->insert($pivotData);
            }
        } catch (\Exception $e) {
            Log::error('Failed to sync pivot table to slave (sync): ' . $e->getMessage(), [
                'table' => $this->getTable(),
            ]);
        }
    }

    /**
     * Get related IDs
     */
    protected function getRelatedIds()
    {
        return $this->getQuery()->pluck($this->getRelatedPivotKeyName())->toArray();
    }

    /**
     * Parse IDs to array
     */
    protected function parseIds($ids)
    {
        if ($ids instanceof \Illuminate\Support\Collection) {
            $ids = $ids->modelKeys();
        } elseif ($ids instanceof \Illuminate\Database\Eloquent\Model) {
            $ids = [$ids->getKey()];
        } elseif (!is_array($ids)) {
            $ids = [$ids];
        }

        return $ids;
    }
}


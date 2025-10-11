<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update existing roles to new names for NASENI M&E System
        $roleMapping = [
            'admin' => 'system administrator',
            'manager' => 'program director',
            'developer' => 'project coordinator',
            'designer' => 'me officer',
            'qa engineer' => 'data officer',
            'client' => 'stakeholder',
        ];

        foreach ($roleMapping as $oldName => $newName) {
            $role = Role::where('name', $oldName)->first();
            if ($role) {
                $role->update(['name' => $newName]);
            }
        }

        // Create new roles that didn't exist before
        $newRoles = ['finance officer', 'directorate head', 'vendor representative'];
        
        foreach ($newRoles as $roleName) {
            if (!Role::where('name', $roleName)->exists()) {
                Role::create([
                    'name' => $roleName,
                    'guard_name' => 'web',
                ]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reverse the role name changes
        $roleMapping = [
            'system administrator' => 'admin',
            'program director' => 'manager',
            'project coordinator' => 'developer',
            'me officer' => 'designer',
            'data officer' => 'qa engineer',
            'stakeholder' => 'client',
        ];

        foreach ($roleMapping as $newName => $oldName) {
            $role = Role::where('name', $newName)->first();
            if ($role) {
                $role->update(['name' => $oldName]);
            }
        }

        // Remove the new roles that were added
        $rolesToRemove = ['finance officer', 'directorate head', 'vendor representative'];
        
        foreach ($rolesToRemove as $roleName) {
            Role::where('name', $roleName)->delete();
        }
    }
};

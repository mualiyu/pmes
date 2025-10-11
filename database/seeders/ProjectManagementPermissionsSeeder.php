<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class ProjectManagementPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure permissions exist
        $permissions = [
            'view projects',
            'view project',
            'create project',
            'edit project',
            'archive project',
            'restore project',
            'edit project user access',
        ];

        foreach ($permissions as $permissionName) {
            Permission::firstOrCreate(['name' => $permissionName]);
        }

        // Grant permissions to Admin role
        $adminRole = Role::where('name', 'admin')->first();
        if ($adminRole) {
            $adminRole->syncPermissions([
                'view projects',
                'view project',
                'create project',
                'edit project',
                'archive project',
                'restore project',
                'edit project user access',
            ]);

            echo "✅ Admin permissions configured\n";
        }

        // Grant permissions to Manager role
        $managerRole = Role::where('name', 'manager')->first();
        if ($managerRole) {
            $managerRole->syncPermissions([
                'view projects',
                'view project',
                'create project',
                'edit project',
                'archive project',
                'restore project',
            ]);

            echo "✅ Manager permissions configured\n";
        }

        // Grant limited permissions to Developer role
        $devRole = Role::where('name', 'developer')->first();
        if ($devRole) {
            $devRole->givePermissionTo([
                'view projects',
                'view project',
            ]);

            echo "✅ Developer permissions configured\n";
        }

        echo "\n🎉 Project Management permissions seeded successfully!\n";
    }
}

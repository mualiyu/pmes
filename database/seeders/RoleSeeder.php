<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public static $roles = [
        'system administrator',
        'program director',
        'me officer',
        'project coordinator',
        'data officer',
        'finance officer',
        'directorate head',
        'vendor representative',
        'stakeholder',
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (self::$roles as $role) {
            Role::firstOrCreate(
                ['name' => $role],
                ['guard_name' => 'web']
            );
        }
    }
}

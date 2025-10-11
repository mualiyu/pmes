<?php

namespace Database\Seeders;

use App\Models\OwnerCompany;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProductionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            OwnerCompanySeeder::class,
            LabelSeeder::class,
        ]);

        User::create([
            'email' => config('auth.admin.email', 'admin@naseni.gov.ng'),
            'name' => config('auth.admin.name', 'System Administrator'),
            'phone' => '',
            'rate' => 0,
            'job_title' => 'System Administrator',
            'avatar' => null,
            'password' => bcrypt(config('auth.admin.password', 'password')),
            'remember_token' => null,
        ])->assignRole(Role::firstWhere('name', 'system administrator'));

        $this->command->info('✅ Production setup completed!');
        $this->command->newLine();
        $this->command->warn('⚠️  IMPORTANT: Change the default admin credentials immediately!');
        $this->command->info('📧 Default Login:');
        $this->command->info('   Email: ' . config('auth.admin.email', 'admin@naseni.gov.ng'));
        $this->command->info('   Password: ' . config('auth.admin.password', 'password'));
    }
}

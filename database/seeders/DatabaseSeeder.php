<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->command->info('🌱 Seeding essential data...');
        
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            CountrySeeder::class,
            CurrencySeeder::class,
        ]);

        if ($this->command->confirm('Seed demo data? (2 projects with complete features)', true)) {
            $this->command->info('🌱 Creating demo data...');
            
            $this->call([
                OwnerCompanySeeder::class,
                LabelSeeder::class,
                UserSeeder::class,
                DemoDataSeeder::class,
            ]);
            
            $this->command->info('✅ Demo data created successfully!');
            $this->command->newLine();
            $this->command->info('📧 Login Credentials:');
            $this->command->table(
                ['Role', 'Email', 'Password'],
                [
                    ['System Administrator', 'admin@naseni.gov.ng', 'password'],
                    ['Program Director', 'director@naseni.gov.ng', 'password'],
                    ['M&E Officer', 'me@naseni.gov.ng', 'password'],
                    ['Project Coordinator', 'coordinator@naseni.gov.ng', 'password'],
                    ['Data Officer', 'data@naseni.gov.ng', 'password'],
                    ['Finance Officer', 'finance@naseni.gov.ng', 'password'],
                    ['Directorate Head', 'directorate@naseni.gov.ng', 'password'],
                    ['Vendor Rep', 'vendor@naseni.gov.ng', 'password'],
                    ['Stakeholder', 'stakeholder@naseni.gov.ng', 'password'],
                ]
            );
        } else {
            $this->call([ProductionSeeder::class]);
        }
    }
}

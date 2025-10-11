<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create NASENI Internal organization for staff members
        $naseniInternal = \App\Models\ClientCompany::create([
            'name' => 'NASENI Internal Staff',
            'code' => 'NASENI-INT',
            'type' => \App\Enums\ClientCompanyType::GENERAL,
            'email' => 'hr@naseni.gov.ng',
            'phone' => '+234 9 461 5000',
            'address' => 'Plot 1687, Cadastral Zone C06, Off Yakubu Gowon Crescent',
            'city' => 'Abuja',
            'country_id' => 160, // Nigeria
            'currency_id' => 97, // NGN
        ]);

        $users = [
            [
                'name' => 'System Administrator',
                'email' => 'admin@naseni.gov.ng',
                'job_title' => 'System Administrator',
                'role' => 'system administrator',
            ],
            [
                'name' => 'Adewale Ogunleye',
                'email' => 'director@naseni.gov.ng',
                'job_title' => 'Program Director',
                'role' => 'program director',
            ],
            [
                'name' => 'Chioma Nwankwo',
                'email' => 'me@naseni.gov.ng',
                'job_title' => 'M&E Officer',
                'role' => 'me officer',
            ],
            [
                'name' => 'Ibrahim Musa',
                'email' => 'coordinator@naseni.gov.ng',
                'job_title' => 'Project Coordinator',
                'role' => 'project coordinator',
            ],
            [
                'name' => 'Fatima Abdullahi',
                'email' => 'data@naseni.gov.ng',
                'job_title' => 'Data Collection Officer',
                'role' => 'data officer',
            ],
            [
                'name' => 'Oluwaseun Adebayo',
                'email' => 'finance@naseni.gov.ng',
                'job_title' => 'Finance Officer',
                'role' => 'finance officer',
            ],
            [
                'name' => 'Dr. Emeka Okafor',
                'email' => 'directorate@naseni.gov.ng',
                'job_title' => 'Directorate Head',
                'role' => 'directorate head',
            ],
            [
                'name' => 'Blessing Okonkwo',
                'email' => 'vendor@naseni.gov.ng',
                'job_title' => 'Vendor Representative',
                'role' => 'vendor representative',
            ],
            [
                'name' => 'John Stakeholder',
                'email' => 'stakeholder@naseni.gov.ng',
                'job_title' => 'External Stakeholder',
                'role' => 'stakeholder',
            ],
        ];

        foreach ($users as $userData) {
            $role = $userData['role'];
            unset($userData['role']);
            
            User::create(array_merge($userData, [
                'password' => bcrypt('password'),
                'rate' => rand(5000, 15000), // hourly rate in cents
                'client_company_id' => $naseniInternal->id, // Internal NASENI staff
            ]))->assignRole($role);
        }
    }
}

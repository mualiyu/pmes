<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\ClientCompany;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        // Get a valid client company ID (you can also create one here if needed)
        $clientCompanyId = ClientCompany::inRandomOrder()->first()?->id;

        // If no client company exists, create one
        if (!$clientCompanyId) {
            $clientCompanyId = ClientCompany::factory()->create()->id;
        }

        User::factory(5)
            ->create([
                'job_title' => 'Client',
                'client_company_id' => $clientCompanyId,
            ])
            ->each
            ->assignRole('client');
    }
}

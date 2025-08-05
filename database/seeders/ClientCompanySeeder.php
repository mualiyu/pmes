<?php

namespace Database\Seeders;

use App\Models\ClientCompany;
use App\Models\User;
use Illuminate\Database\Seeder;

class ClientCompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all users with the 'client' role
        User::role('client')
            ->get()
            ->each(function (User $client) {
                // Create a new ClientCompany
                $company = ClientCompany::factory()->create();

                // Assign the company to the client via foreign key
                $client->client_company_id = $company->id;
                $client->save();
            });
    }
}

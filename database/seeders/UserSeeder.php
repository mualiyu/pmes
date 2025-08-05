<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\ClientCompany;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    private array $jobTitleToRole = [
        'Frontend Developer' => 'developer',
        'Backend Developer' => 'developer',
        'Fullstack Developer' => 'developer',
        'QA Engineer' => 'qa engineer',
        'Designer' => 'designer',
        'Client' => 'client',
        'Manager' => 'manager',
        'Owner' => 'admin',
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 🔧 Ensure we have at least one client company to associate users with
        $clientCompany = ClientCompany::first() ?? ClientCompany::factory()->create();

        // 🧑‍💻 Create one user for each role (except client)
        $rolesExceptClient = collect(RoleSeeder::$roles)
            ->filter(fn ($i) => $i !== 'client')
            ->toArray();

        foreach ($rolesExceptClient as $role) {
            User::factory()
                ->create([
                    'email' => "$role@mail.com",
                    'job_title' => $this->getJobTitle($role),
                    'client_company_id' => $clientCompany->id, // ✅ Important!
                ])
                ->assignRole($role);
        }

        // 👥 Create 20 more users and assign them roles based on job title
        User::factory(20)
            ->create(['client_company_id' => $clientCompany->id]) // ✅ Set company for each
            ->each(fn (User $user) => $user->assignRole($this->jobTitleToRole[$user->job_title]));
    }

    private function getJobTitle(string $role): string
    {
        foreach ($this->jobTitleToRole as $title => $value) {
            if ($role === $value) {
                return $title;
            }
        }

        return 'Frontend Developer'; // fallback just in case
    }
}

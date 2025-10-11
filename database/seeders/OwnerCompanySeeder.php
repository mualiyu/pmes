<?php

namespace Database\Seeders;

use App\Models\OwnerCompany;
use Illuminate\Database\Seeder;

class OwnerCompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OwnerCompany::create([
            'name' => 'National Agency for Science and Engineering Infrastructure (NASENI)',
            'logo' => null,
            'address' => 'Plot 1687, Cadastral Zone C06, Off Yakubu Gowon Crescent',
            'postal_code' => '900211',
            'city' => 'Abuja',
            'country_id' => 160, // Nigeria
            'currency_id' => 97, // Nigerian Naira
            'phone' => '+234 9 461 5000',
            'web' => 'https://naseni.gov.ng',
            'tax' => 750, // 7.5% VAT
            'email' => 'info@naseni.gov.ng',
            'iban' => null,
            'swift' => null,
            'business_id' => 'RC-123456',
            'tax_id' => 'TIN-987654',
            'vat' => 'VAT-456789',
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Label;
use Illuminate\Database\Seeder;

class LabelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Label::insert([
            ['name' => 'High Priority', 'color' => '#F03E3E'],
            ['name' => 'Medium Priority', 'color' => '#F76707'],
            ['name' => 'Low Priority', 'color' => '#37B24D'],
            ['name' => 'Requires Approval', 'color' => '#AE3EC9'],
            ['name' => 'Data Collection', 'color' => '#1971C2'],
            ['name' => 'Field Work', 'color' => '#0CA678'],
            ['name' => 'Documentation', 'color' => '#868E96'],
            ['name' => 'Stakeholder Engagement', 'color' => '#E64980'],
            ['name' => 'Technical', 'color' => '#7048E8'],
            ['name' => 'Financial', 'color' => '#F59F00'],
            ['name' => 'Reporting', 'color' => '#20C997'],
            ['name' => 'Training', 'color' => '#15AABF'],
        ]);
    }
}

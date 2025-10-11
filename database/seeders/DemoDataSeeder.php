<?php

namespace Database\Seeders;

use App\Enums\BudgetStatus;
use App\Enums\ClientCompanyType;
use App\Enums\MilestoneStatus;
use App\Enums\PricingType;
use App\Models\Budget;
use App\Models\ClientCompany;
use App\Models\Comment;
use App\Models\Label;
use App\Models\Milestone;
use App\Models\Project;
use App\Models\Task;
use App\Models\TaskGroup;
use App\Models\TimeLog;
use App\Models\User;
use Illuminate\Database\Seeder;

class DemoDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Set authenticated user for observers
        $admin = User::role('system administrator')->first();
        auth()->login($admin);

        $this->command->info('📦 Creating Organizations...');
        [$vendor, $directorate1, $directorate2] = $this->createOrganizations();

        $this->command->info('📋 Creating Projects...');
        $project1 = $this->createProject1($directorate1);
        $project2 = $this->createProject2($directorate2);

        $this->command->info('🎯 Creating Milestones...');
        $this->createMilestones($project1, $project2);

        $this->command->info('💰 Creating Budgets...');
        $this->createBudgets($project1, $project2);

        $this->command->info('📊 Creating Task Groups & Indicators...');
        $this->createTasksAndIndicators($project1, $project2);

        $this->command->info('✅ Demo data created successfully!');
    }

    private function createOrganizations(): array
    {
        // Create Vendors
        $vendor = ClientCompany::create([
            'name' => 'TechVision Solutions Ltd',
            'code' => 'VEN-001',
            'type' => ClientCompanyType::VENDOR,
            'email' => 'contact@techvision.ng',
            'phone' => '+234 803 123 4567',
            'address' => '45 Allen Avenue, Ikeja',
            'city' => 'Lagos',
            'country_id' => 160,
            'currency_id' => 97,
        ]);

        // Create Directorates
        $directorate1 = ClientCompany::create([
            'name' => 'Engineering Infrastructure Development',
            'code' => 'DIR-EID',
            'type' => ClientCompanyType::DIRECTORATE,
            'email' => 'eid@naseni.gov.ng',
            'phone' => '+234 9 461 5001',
            'address' => 'NASENI Headquarters',
            'city' => 'Abuja',
            'country_id' => 160,
            'currency_id' => 97,
        ]);

        $directorate2 = ClientCompany::create([
            'name' => 'Renewable Energy and Power',
            'code' => 'DIR-REP',
            'type' => ClientCompanyType::DIRECTORATE,
            'email' => 'rep@naseni.gov.ng',
            'phone' => '+234 9 461 5002',
            'address' => 'NASENI Headquarters',
            'city' => 'Abuja',
            'country_id' => 160,
            'currency_id' => 97,
        ]);

        return [$vendor, $directorate1, $directorate2];
    }

    private function createProject1($directorate): Project
    {
        $admin = User::role('system administrator')->first();
        $meOfficer = User::role('me officer')->first();
        $coordinator = User::role('project coordinator')->first();

        $project = Project::create([
            'name' => 'National Solar Energy Infrastructure Program',
            'description' => 'A comprehensive initiative to establish solar energy infrastructure across 6 states in Nigeria, aimed at improving rural electrification and reducing carbon emissions.',
            'client_company_id' => $directorate->id,
            'directorate_id' => $directorate->id,
            'default_pricing_type' => PricingType::HOURLY,
            'rate' => 10000, // ₦100/hour
        ]);

        // Give access to team members
        $project->users()->attach([$admin->id, $meOfficer->id, $coordinator->id]);

        return $project;
    }

    private function createProject2($directorate): Project
    {
        $admin = User::role('system administrator')->first();
        $director = User::role('program director')->first();
        $dataOfficer = User::role('data officer')->first();

        $project = Project::create([
            'name' => 'Advanced Manufacturing Technology Initiative',
            'description' => 'Development of local manufacturing capabilities for electronic components and industrial machinery, supporting Nigeria\'s industrialization agenda.',
            'client_company_id' => $directorate->id,
            'directorate_id' => $directorate->id,
            'default_pricing_type' => PricingType::FIXED,
            'rate' => 12000, // ₦120/hour
        ]);

        // Give access to team members
        $project->users()->attach([$admin->id, $director->id, $dataOfficer->id]);

        return $project;
    }

    private function createMilestones($project1, $project2): void
    {
        // Project 1 Milestones
        Milestone::create([
            'project_id' => $project1->id,
            'name' => 'Phase 1: Site Assessment and Planning',
            'description' => 'Complete site surveys and develop detailed implementation plans',
            'status' => MilestoneStatus::COMPLETED,
            'start_date' => now()->subMonths(6),
            'end_date' => now()->subMonths(4),
            'actual_start_date' => now()->subMonths(6),
            'actual_end_date' => now()->subMonths(4),
            'progress' => 100,
            'budget_allocated' => 25000000.00,
            'deliverables' => 'Site assessment reports, Project implementation plan, Environmental impact assessment',
            'order' => 1,
        ]);

        Milestone::create([
            'project_id' => $project1->id,
            'name' => 'Phase 2: Infrastructure Development',
            'description' => 'Construction of solar panel installations and grid connections',
            'status' => MilestoneStatus::IN_PROGRESS,
            'start_date' => now()->subMonths(3),
            'end_date' => now()->addMonths(3),
            'actual_start_date' => now()->subMonths(3),
            'actual_end_date' => null,
            'progress' => 65,
            'budget_allocated' => 150000000.00,
            'deliverables' => 'Solar installations in 3 states, Grid integration, Training materials',
            'order' => 2,
        ]);

        Milestone::create([
            'project_id' => $project1->id,
            'name' => 'Phase 3: Testing and Commissioning',
            'description' => 'System testing, commissioning, and handover',
            'status' => MilestoneStatus::NOT_STARTED,
            'start_date' => now()->addMonths(4),
            'end_date' => now()->addMonths(8),
            'actual_start_date' => null,
            'actual_end_date' => null,
            'progress' => 0,
            'budget_allocated' => 35000000.00,
            'deliverables' => 'Test reports, Commissioning certificates, User manuals',
            'order' => 3,
        ]);

        // Project 2 Milestones
        Milestone::create([
            'project_id' => $project2->id,
            'name' => 'Technology Transfer and Capacity Building',
            'description' => 'Training local engineers and establishing partnerships',
            'status' => MilestoneStatus::COMPLETED,
            'start_date' => now()->subMonths(5),
            'end_date' => now()->subMonths(2),
            'actual_start_date' => now()->subMonths(5),
            'actual_end_date' => now()->subMonths(2),
            'progress' => 100,
            'budget_allocated' => 45000000.00,
            'deliverables' => 'Training curriculum, Certified engineers, Partnership agreements',
            'order' => 1,
        ]);

        Milestone::create([
            'project_id' => $project2->id,
            'name' => 'Manufacturing Facility Setup',
            'description' => 'Establish production facility with modern equipment',
            'status' => MilestoneStatus::IN_PROGRESS,
            'start_date' => now()->subMonths(1),
            'end_date' => now()->addMonths(6),
            'actual_start_date' => now()->subMonths(1),
            'actual_end_date' => null,
            'progress' => 40,
            'budget_allocated' => 280000000.00,
            'deliverables' => 'Operational facility, Equipment installation, Quality control systems',
            'order' => 2,
        ]);
    }

    private function createBudgets($project1, $project2): void
    {
        // Project 1 Budgets
        Budget::create([
            'project_id' => $project1->id,
            'name' => '2025 Solar Infrastructure Budget',
            'description' => 'Annual budget allocation for solar energy program',
            'status' => BudgetStatus::ACTIVE,
            'currency_id' => 97, // NGN
            'total_amount' => 210000000.00,
            'allocated_amount' => 175000000.00,
            'spent_amount' => 98500000.00,
            'remaining_amount' => 111500000.00,
            'fiscal_year_start' => now()->startOfYear(),
            'fiscal_year_end' => now()->endOfYear(),
            'notes' => 'Approved by Federal Executive Council on January 15, 2025',
        ]);

        Budget::create([
            'project_id' => $project1->id,
            'name' => 'Q2 2025 Operational Budget',
            'description' => 'Quarterly operational expenses and maintenance',
            'status' => BudgetStatus::ACTIVE,
            'currency_id' => 97, // NGN
            'total_amount' => 25000000.00,
            'allocated_amount' => 20000000.00,
            'spent_amount' => 8500000.00,
            'remaining_amount' => 16500000.00,
            'fiscal_year_start' => now()->startOfQuarter(),
            'fiscal_year_end' => now()->endOfQuarter(),
            'notes' => 'Operations and maintenance budget for Q2',
        ]);

        // Project 2 Budgets
        Budget::create([
            'project_id' => $project2->id,
            'name' => '2025 Manufacturing Initiative Budget',
            'description' => 'Capital and operational budget for manufacturing project',
            'status' => BudgetStatus::ACTIVE,
            'currency_id' => 97, // NGN
            'total_amount' => 325000000.00,
            'allocated_amount' => 280000000.00,
            'spent_amount' => 112000000.00,
            'remaining_amount' => 213000000.00,
            'fiscal_year_start' => now()->startOfYear(),
            'fiscal_year_end' => now()->endOfYear(),
            'notes' => 'Multi-year budget allocation, Year 1 of 3',
        ]);
    }

    private function createTasksAndIndicators($project1, $project2): void
    {
        // Get users
        $admin = User::role('system administrator')->first();
        $meOfficer = User::role('me officer')->first();
        $coordinator = User::role('project coordinator')->first();
        $dataOfficer = User::role('data officer')->first();

        // Get labels
        $labels = Label::all();

        // Project 1 Task Groups & Tasks
        $this->createProject1Tasks($project1, $admin, $meOfficer, $coordinator, $labels);

        // Project 2 Task Groups & Tasks
        $this->createProject2Tasks($project2, $admin, $coordinator, $dataOfficer, $labels);
    }

    private function createProject1Tasks($project, $admin, $meOfficer, $coordinator, $labels): void
    {
        // Create Task Groups
        $backlog = TaskGroup::create(['project_id' => $project->id, 'name' => 'Backlog', 'order_column' => 1]);
        $inProgress = TaskGroup::create(['project_id' => $project->id, 'name' => 'In Progress', 'order_column' => 2]);
        $review = TaskGroup::create(['project_id' => $project->id, 'name' => 'Under Review', 'order_column' => 3]);
        $completed = TaskGroup::create(['project_id' => $project->id, 'name' => 'Completed', 'order_column' => 4]);

        // Completed Tasks
        $task1 = Task::create([
            'project_id' => $project->id,
            'group_id' => $completed->id,
            'created_by_user_id' => $admin->id,
            'assigned_to_user_id' => $meOfficer->id,
            'name' => 'IND-001: Baseline Data Collection for 6 Target States',
            'number' => 1,
            'description' => 'Collect baseline data on current energy access, demographics, and infrastructure in Kano, Kaduna, Sokoto, Kebbi, Zamfara, and Katsina states.',
            'due_on' => now()->subMonths(3),
            'estimation' => 40.0,
            'pricing_type' => PricingType::HOURLY,
            'billable' => true,
            'hidden_from_clients' => false,
            'assigned_at' => now()->subMonths(4),
            'completed_at' => now()->subMonths(3),
            'order_column' => 1,
        ]);
        $task1->labels()->attach($labels->random(2));
        
        TimeLog::create([
            'task_id' => $task1->id,
            'user_id' => $meOfficer->id,
            'minutes' => 2400, // 40 hours
        ]);

        Comment::create([
            'task_id' => $task1->id,
            'user_id' => $admin->id,
            'content' => 'Excellent work on the baseline assessment! The data quality is outstanding.',
        ]);

        // In Progress Tasks
        $task2 = Task::create([
            'project_id' => $project->id,
            'group_id' => $inProgress->id,
            'created_by_user_id' => $admin->id,
            'assigned_to_user_id' => $coordinator->id,
            'name' => 'IND-002: Procurement of Solar Panel Equipment',
            'number' => 2,
            'description' => 'Coordinate procurement process for 5,000 solar panels meeting international quality standards. Includes vendor evaluation, contract negotiation, and delivery logistics.',
            'due_on' => now()->addWeeks(2),
            'estimation' => 80.0,
            'pricing_type' => PricingType::HOURLY,
            'billable' => true,
            'hidden_from_clients' => false,
            'assigned_at' => now()->subWeeks(3),
            'completed_at' => null,
            'order_column' => 1,
        ]);
        $task2->labels()->attach($labels->random(3));
        $task2->subscribedUsers()->attach([$admin->id, $meOfficer->id]);
        
        TimeLog::create([
            'task_id' => $task2->id,
            'user_id' => $coordinator->id,
            'minutes' => 2880, // 48 hours so far
        ]);

        $task3 = Task::create([
            'project_id' => $project->id,
            'group_id' => $inProgress->id,
            'created_by_user_id' => $meOfficer->id,
            'assigned_to_user_id' => $meOfficer->id,
            'name' => 'IND-003: Community Engagement and Training Program',
            'number' => 3,
            'description' => 'Develop and implement community training programs for solar system maintenance and basic troubleshooting. Target: 200 community members across 6 states.',
            'due_on' => now()->addMonth(),
            'estimation' => 60.0,
            'pricing_type' => PricingType::HOURLY,
            'billable' => true,
            'hidden_from_clients' => false,
            'assigned_at' => now()->subWeeks(1),
            'completed_at' => null,
            'order_column' => 2,
        ]);
        $task3->labels()->attach($labels->random(2));

        // Backlog Tasks
        $task4 = Task::create([
            'project_id' => $project->id,
            'group_id' => $backlog->id,
            'created_by_user_id' => $admin->id,
            'assigned_to_user_id' => $coordinator->id,
            'name' => 'IND-004: Environmental Impact Assessment Report',
            'number' => 4,
            'description' => 'Prepare comprehensive environmental impact assessment for all installation sites. Required before Phase 3 commencement.',
            'due_on' => now()->addMonths(2),
            'estimation' => 45.0,
            'pricing_type' => PricingType::HOURLY,
            'billable' => true,
            'hidden_from_clients' => false,
            'assigned_at' => now(),
            'completed_at' => null,
            'order_column' => 1,
        ]);
        $task4->labels()->attach($labels->random(1));

        $task5 = Task::create([
            'project_id' => $project->id,
            'group_id' => $backlog->id,
            'created_by_user_id' => $meOfficer->id,
            'assigned_to_user_id' => null,
            'name' => 'IND-005: Grid Integration Technical Documentation',
            'number' => 5,
            'description' => 'Develop technical specifications and integration protocols for connecting solar systems to the national grid.',
            'due_on' => now()->addMonths(3),
            'estimation' => 35.0,
            'pricing_type' => PricingType::HOURLY,
            'billable' => true,
            'hidden_from_clients' => false,
            'assigned_at' => null,
            'completed_at' => null,
            'order_column' => 2,
        ]);
    }

    private function createProject2Tasks($project, $admin, $coordinator, $dataOfficer, $labels): void
    {
        // Create Task Groups
        $planning = TaskGroup::create(['project_id' => $project->id, 'name' => 'Planning', 'order_column' => 1]);
        $execution = TaskGroup::create(['project_id' => $project->id, 'name' => 'Execution', 'order_column' => 2]);
        $validation = TaskGroup::create(['project_id' => $project->id, 'name' => 'Validation', 'order_column' => 3]);
        $done = TaskGroup::create(['project_id' => $project->id, 'name' => 'Done', 'order_column' => 4]);

        // Completed
        $task1 = Task::create([
            'project_id' => $project->id,
            'group_id' => $done->id,
            'created_by_user_id' => $admin->id,
            'assigned_to_user_id' => $coordinator->id,
            'name' => 'IND-101: Technology Partner Selection',
            'number' => 101,
            'description' => 'Evaluate and select international technology partners for knowledge transfer in advanced manufacturing processes.',
            'due_on' => now()->subMonths(4),
            'estimation' => 50.0,
            'pricing_type' => PricingType::FIXED,
            'fixed_price' => 5000000, // ₦50,000
            'billable' => true,
            'hidden_from_clients' => false,
            'assigned_at' => now()->subMonths(5),
            'completed_at' => now()->subMonths(4),
            'order_column' => 1,
        ]);
        $task1->labels()->attach($labels->random(2));

        TimeLog::create([
            'task_id' => $task1->id,
            'user_id' => $coordinator->id,
            'minutes' => 3000, // 50 hours
        ]);

        // In Execution
        $task2 = Task::create([
            'project_id' => $project->id,
            'group_id' => $execution->id,
            'created_by_user_id' => $admin->id,
            'assigned_to_user_id' => $dataOfficer->id,
            'name' => 'IND-102: Quality Control System Implementation',
            'number' => 102,
            'description' => 'Establish ISO 9001 compliant quality control systems including testing procedures, documentation protocols, and certification processes.',
            'due_on' => now()->addWeeks(3),
            'estimation' => 70.0,
            'pricing_type' => PricingType::HOURLY,
            'billable' => true,
            'hidden_from_clients' => false,
            'assigned_at' => now()->subWeeks(2),
            'completed_at' => null,
            'order_column' => 1,
        ]);
        $task2->labels()->attach($labels->random(3));
        $task2->subscribedUsers()->attach([$admin->id, $coordinator->id]);

        TimeLog::create([
            'task_id' => $task2->id,
            'user_id' => $dataOfficer->id,
            'minutes' => 2520, // 42 hours
        ]);

        Comment::create([
            'task_id' => $task2->id,
            'user_id' => $coordinator->id,
            'content' => 'Great progress! The ISO documentation is thorough. Let\'s schedule the certification audit for next month.',
        ]);

        // Planning
        $task3 = Task::create([
            'project_id' => $project->id,
            'group_id' => $planning->id,
            'created_by_user_id' => $admin->id,
            'assigned_to_user_id' => $coordinator->id,
            'name' => 'IND-103: Local Supply Chain Development',
            'number' => 103,
            'description' => 'Identify and onboard local suppliers for raw materials and components. Establish quality standards and supply agreements.',
            'due_on' => now()->addMonth(),
            'estimation' => 55.0,
            'pricing_type' => PricingType::HOURLY,
            'billable' => true,
            'hidden_from_clients' => false,
            'assigned_at' => now()->subDays(5),
            'completed_at' => null,
            'order_column' => 1,
        ]);
        $task3->labels()->attach($labels->random(2));

        $task4 = Task::create([
            'project_id' => $project->id,
            'group_id' => $planning->id,
            'created_by_user_id' => $admin->id,
            'assigned_to_user_id' => null,
            'name' => 'IND-104: Product Certification and Standards Compliance',
            'number' => 104,
            'description' => 'Obtain necessary SON (Standards Organisation of Nigeria) certifications for manufactured products.',
            'due_on' => now()->addMonths(4),
            'estimation' => 40.0,
            'pricing_type' => PricingType::HOURLY,
            'billable' => true,
            'hidden_from_clients' => false,
            'assigned_at' => null,
            'completed_at' => null,
            'order_column' => 2,
        ]);
        $task4->labels()->attach($labels->random(1));
    }
}

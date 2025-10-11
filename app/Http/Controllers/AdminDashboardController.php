<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\BudgetStatus;
use App\Enums\MilestoneStatus;
use App\Models\Budget;
use App\Models\ClientCompany;
use App\Models\Comment;
use App\Models\Invoice;
use App\Models\Label;
use App\Models\Milestone;
use App\Models\Project;
use App\Models\Task;
use App\Models\TimeLog;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $user = request()->user();

        if (! $user || $user->isNotAdmin()) {
            abort(403, 'Access denied');
        }

        return Inertia::render('AdminDashboard/Index', [
            'statistics' => $this->getStatistics(),
            'projectsOverview' => $this->getProjectsOverview(),
            'indicatorsAnalytics' => $this->getIndicatorsAnalytics(),
            'userActivityData' => $this->getUserActivityData(),
            'revenueData' => $this->getRevenueData(),
            'timeLogData' => $this->getTimeLogData(),
            'projectStatusDistribution' => $this->getProjectStatusDistribution(),
            'topPerformers' => $this->getTopPerformers(),
            'recentActivities' => $this->getRecentActivities(),
            'organizationsOverview' => $this->getOrganizationsOverview(),
            'milestoneStatistics' => $this->getMilestoneStatistics(),
            'budgetStatistics' => $this->getBudgetStatistics(),
            'vendorDirectorateStats' => $this->getVendorDirectorateStats(),
        ]);
    }

    private function getStatistics(): array
    {
        return [
            'totalProjects' => Project::withArchived()->count(),
            'activeProjects' => Project::count(), // Non-archived projects
            'archivedProjects' => Project::onlyArchived()->count(),
            'totalIndicators' => Task::withArchived()->count(),
            'completedIndicators' => Task::whereNotNull('completed_at')->count(),
            'overdueIndicators' => Task::whereNull('completed_at')
                ->whereDate('due_on', '<', now())
                ->count(),
            'totalUsers' => User::withArchived()->count(),
            'activeUsers' => User::count(), // Non-archived users
            'archivedUsers' => User::onlyArchived()->count(),
            'totalOrganizations' => ClientCompany::count(),
            'totalVendors' => ClientCompany::vendors()->count(),
            'totalDirectorates' => ClientCompany::directorates()->count(),
            'totalInvoices' => Invoice::count(),
            'totalRevenue' => Invoice::where('status', 'paid')->sum('amount_with_tax'),
            'pendingInvoices' => Invoice::where('status', 'pending')->count(),
            'totalTimeLogged' => TimeLog::sum('minutes'),
            'totalMilestones' => Milestone::count(),
            'completedMilestones' => Milestone::where('status', MilestoneStatus::COMPLETED)->count(),
            'overdueMilestones' => Milestone::where('end_date', '<', now())
                ->whereNotIn('status', [MilestoneStatus::COMPLETED, MilestoneStatus::CANCELLED])
                ->count(),
            'totalBudgets' => Budget::count(),
            'activeBudgets' => Budget::where('status', BudgetStatus::ACTIVE)->count(),
            'totalBudgetAmount' => Budget::sum('total_amount'),
            'totalSpentAmount' => Budget::sum('spent_amount'),
            'totalComments' => Comment::count(),
            'totalLabels' => Label::count(),
        ];
    }

    private function getProjectsOverview(): array
    {
        $last12Months = [];
        for ($i = 11; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);

            $last12Months[] = [
                'month' => $date->format('M Y'),
                'created' => Project::withArchived()
                    ->whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->count(),
                'archived' => Project::onlyArchived()
                    ->whereYear('archived_at', $date->year)
                    ->whereMonth('archived_at', $date->month)
                    ->count(),
            ];
        }

        return $last12Months;
    }

    private function getIndicatorsAnalytics(): array
    {
        $last30Days = [];
        for ($i = 29; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $dateKey = $date->format('Y-m-d');

            $last30Days[] = [
                'date' => $date->format('M d'),
                'created' => Task::whereDate('created_at', $dateKey)->count(),
                'completed' => Task::whereDate('completed_at', $dateKey)->count(),
            ];
        }

        return $last30Days;
    }

    private function getUserActivityData(): array
    {
        $roles = DB::table('roles')
            ->leftJoin('model_has_roles', 'roles.id', '=', 'model_has_roles.role_id')
            ->select('roles.name', DB::raw('COUNT(model_has_roles.model_id) as count'))
            ->groupBy('roles.id', 'roles.name')
            ->get()
            ->map(fn ($role) => [
                'role' => ucfirst($role->name),
                'count' => $role->count,
            ])
            ->toArray();

        return $roles;
    }

    private function getRevenueData(): array
    {
        $last12Months = [];
        for ($i = 11; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);

            $revenue = Invoice::where('status', 'paid')
                ->whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->sum('amount_with_tax');

            $invoices = Invoice::whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->count();

            $last12Months[] = [
                'month' => $date->format('M Y'),
                'revenue' => (float) $revenue,
                'invoices' => $invoices,
            ];
        }

        return $last12Months;
    }

    private function getTimeLogData(): array
    {
        $last7Days = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $dateKey = $date->format('Y-m-d');

            $minutes = TimeLog::whereDate('created_at', $dateKey)->sum('minutes');

            $last7Days[] = [
                'date' => $date->format('M d'),
                'hours' => round($minutes / 60, 2),
            ];
        }

        return $last7Days;
    }

    private function getProjectStatusDistribution(): array
    {
        $total = Project::withArchived()->count();
        $active = Project::count();
        $archived = Project::onlyArchived()->count();

        return [
            [
                'name' => 'Active',
                'value' => $active,
                'percentage' => $total > 0 ? round(($active / $total) * 100, 1) : 0,
            ],
            [
                'name' => 'Archived',
                'value' => $archived,
                'percentage' => $total > 0 ? round(($archived / $total) * 100, 1) : 0,
            ],
        ];
    }

    private function getTopPerformers(): array
    {
        return User::withCount(['subscribedToTasks as completed_tasks_count' => function ($query) {
            $query->whereNotNull('completed_at');
        }])
            ->withoutRole('stakeholder')
            ->orderBy('completed_tasks_count', 'desc')
            ->limit(10)
            ->get(['id', 'name', 'avatar', 'job_title'])
            ->map(function ($user) {
                $timeLogged = TimeLog::whereHas('task', function ($query) use ($user) {
                    $query->where('assigned_to_user_id', $user->id);
                })->sum('minutes');

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'avatar' => $user->avatar,
                    'job_title' => $user->job_title,
                    'completed_tasks' => $user->completed_tasks_count,
                    'hours_logged' => round($timeLogged / 60, 2),
                ];
            })
            ->toArray();
    }

    private function getRecentActivities(): array
    {
        // Get recent projects and indicators
        $recentProjects = Project::with('clientCompany:id,name')
            ->latest()
            ->limit(5)
            ->get(['id', 'name', 'client_company_id', 'created_at'])
            ->map(fn ($project) => [
                'type' => 'project',
                'name' => $project->name,
                'organization' => $project->clientCompany?->name,
                'created_at' => $project->created_at->diffForHumans(),
            ]);

        $recentIndicators = Task::with(['project:id,name', 'assignedToUser:id,name'])
            ->latest()
            ->limit(5)
            ->get(['id', 'name', 'project_id', 'assigned_to_user_id', 'created_at'])
            ->map(fn ($task) => [
                'type' => 'indicator',
                'name' => $task->name,
                'project' => $task->project?->name,
                'assigned_to' => $task->assignedToUser?->name,
                'created_at' => $task->created_at->diffForHumans(),
            ]);

        return $recentProjects->concat($recentIndicators)
            ->sortByDesc('created_at')
            ->take(10)
            ->values()
            ->toArray();
    }

    private function getOrganizationsOverview(): array
    {
        return ClientCompany::withCount(['projects', 'clients'])
            ->with('clients:id,name,client_company_id')
            ->get(['id', 'name', 'type'])
            ->map(fn ($company) => [
                'id' => $company->id,
                'name' => $company->name,
                'type' => ucfirst($company->type->value ?? 'general'),
                'projects_count' => $company->projects_count,
                'users_count' => $company->clients_count,
            ])
            ->toArray();
    }

    private function getMilestoneStatistics(): array
    {
        $total = Milestone::count();

        $byStatus = [
            'not_started' => Milestone::where('status', MilestoneStatus::NOT_STARTED)->count(),
            'in_progress' => Milestone::where('status', MilestoneStatus::IN_PROGRESS)->count(),
            'completed' => Milestone::where('status', MilestoneStatus::COMPLETED)->count(),
            'delayed' => Milestone::where('status', MilestoneStatus::DELAYED)->count(),
            'cancelled' => Milestone::where('status', MilestoneStatus::CANCELLED)->count(),
        ];

        $avgProgress = Milestone::avg('progress') ?? 0;
        
        $dueThisMonth = Milestone::whereMonth('end_date', now()->month)
            ->whereYear('end_date', now()->year)
            ->whereNotIn('status', [MilestoneStatus::COMPLETED, MilestoneStatus::CANCELLED])
            ->count();

        $overdue = Milestone::where('end_date', '<', now())
            ->whereNotIn('status', [MilestoneStatus::COMPLETED, MilestoneStatus::CANCELLED])
            ->count();

        // Milestone completion trend (last 6 months)
        $trends = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $trends[] = [
                'month' => $date->format('M'),
                'completed' => Milestone::where('status', MilestoneStatus::COMPLETED)
                    ->whereYear('actual_end_date', $date->year)
                    ->whereMonth('actual_end_date', $date->month)
                    ->count(),
            ];
        }

        return [
            'total' => $total,
            'by_status' => $byStatus,
            'avg_progress' => round((float) $avgProgress, 1),
            'due_this_month' => $dueThisMonth,
            'overdue' => $overdue,
            'completion_rate' => $total > 0 ? round(($byStatus['completed'] / $total) * 100, 1) : 0,
            'trends' => $trends,
        ];
    }

    private function getBudgetStatistics(): array
    {
        $total = Budget::count();

        $byStatus = [
            'draft' => Budget::where('status', BudgetStatus::DRAFT)->count(),
            'approved' => Budget::where('status', BudgetStatus::APPROVED)->count(),
            'active' => Budget::where('status', BudgetStatus::ACTIVE)->count(),
            'exceeded' => Budget::where('status', BudgetStatus::EXCEEDED)->count(),
            'closed' => Budget::where('status', BudgetStatus::CLOSED)->count(),
        ];

        $totalAmount = Budget::sum('total_amount');
        $allocatedAmount = Budget::sum('allocated_amount');
        $spentAmount = Budget::sum('spent_amount');
        $remainingAmount = Budget::sum('remaining_amount');

        $utilizationRate = $totalAmount > 0
            ? round(((float) $spentAmount / (float) $totalAmount) * 100, 1)
            : 0;

        // Top projects by budget
        $topProjectsByBudget = Budget::with('project:id,name')
            ->select('project_id', DB::raw('SUM(total_amount) as total'))
            ->groupBy('project_id')
            ->orderByDesc('total')
            ->limit(5)
            ->get()
            ->map(fn ($budget) => [
                'project' => $budget->project?->name ?? 'Unknown',
                'amount' => (float) $budget->total,
            ])
            ->toArray();

        // Budget allocation trend (last 6 months)
        $trends = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $trends[] = [
                'month' => $date->format('M'),
                'allocated' => (float) Budget::whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->sum('total_amount'),
            ];
        }

        return [
            'total' => $total,
            'by_status' => $byStatus,
            'total_amount' => round((float) $totalAmount, 2),
            'allocated_amount' => round((float) $allocatedAmount, 2),
            'spent_amount' => round((float) $spentAmount, 2),
            'remaining_amount' => round((float) $remainingAmount, 2),
            'utilization_rate' => $utilizationRate,
            'top_projects' => $topProjectsByBudget,
            'trends' => $trends,
        ];
    }

    private function getVendorDirectorateStats(): array
    {
        // Vendors statistics
        $vendors = ClientCompany::vendors()
            ->withCount('projects')
            ->get(['id', 'name'])
            ->map(fn ($vendor) => [
                'id' => $vendor->id,
                'name' => $vendor->name,
                'projects_count' => $vendor->projects_count,
            ])
            ->sortByDesc('projects_count')
            ->values()
            ->take(10)
            ->toArray();

        // Directorates statistics
        $directorates = ClientCompany::directorates()
            ->withCount('projects')
            ->with(['projects' => function ($query) {
                $query->withCount([
                    'milestones',
                    'milestones as completed_milestones' => fn ($q) => $q->where('status', MilestoneStatus::COMPLETED),
                ]);
            }])
            ->get(['id', 'name'])
            ->map(function ($directorate) {
                $totalMilestones = $directorate->projects->sum('milestones_count');
                $completedMilestones = $directorate->projects->sum('completed_milestones');

                return [
                    'id' => $directorate->id,
                    'name' => $directorate->name,
                    'projects_count' => $directorate->projects_count,
                    'total_milestones' => $totalMilestones,
                    'completed_milestones' => $completedMilestones,
                    'milestone_completion_rate' => $totalMilestones > 0
                        ? round(($completedMilestones / $totalMilestones) * 100, 1)
                        : 0,
                ];
            })
            ->sortByDesc('projects_count')
            ->values()
            ->take(10)
            ->toArray();

        return [
            'vendors' => [
                'total' => ClientCompany::vendors()->count(),
                'with_projects' => ClientCompany::vendors()->has('projects')->count(),
                'top_vendors' => $vendors,
            ],
            'directorates' => [
                'total' => ClientCompany::directorates()->count(),
                'with_projects' => ClientCompany::directorates()->has('projects')->count(),
                'top_directorates' => $directorates,
            ],
        ];
    }
}

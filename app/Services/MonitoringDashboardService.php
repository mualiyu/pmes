<?php

declare(strict_types=1);

namespace App\Services;

use App\Enums\BudgetStatus;
use App\Enums\MilestoneStatus;
use App\Models\Budget;
use App\Models\ClientCompany;
use App\Models\Milestone;
use App\Models\Project;
use Illuminate\Support\Facades\DB;

class MonitoringDashboardService
{
    /**
     * Get comprehensive dashboard statistics
     */
    public function getDashboardStats(): array
    {
        return [
            'projects' => $this->getProjectStats(),
            'milestones' => $this->getMilestoneStats(),
            'budgets' => $this->getBudgetStats(),
            'directorates' => $this->getDirectorateStats(),
            'trends' => $this->getTrends(),
        ];
    }

    /**
     * Get project statistics
     */
    public function getProjectStats(): array
    {
        $totalProjects = Project::count();
        $archivedProjects = Project::onlyArchived()->count();
        $activeProjects = $totalProjects - $archivedProjects;

        // Projects with completion metrics
        $projectsWithTasks = Project::has('tasks')->count();

        $completionRates = Project::select('projects.id', 'projects.name')
            ->withCount([
                'tasks as total_tasks',
                'tasks as completed_tasks' => fn ($query) => $query->whereNotNull('completed_at'),
            ])
            ->having('total_tasks', '>', 0)
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'name' => $project->name,
                    'completion_rate' => $project->total_tasks > 0
                        ? round(($project->completed_tasks / $project->total_tasks) * 100, 2)
                        : 0,
                ];
            });

        $avgCompletionRate = $completionRates->avg('completion_rate') ?? 0;

        // Projects by status based on task completion
        $projectsByStatus = [
            'completed' => Project::withCount([
                'tasks as total_tasks',
                'tasks as completed_tasks' => fn ($query) => $query->whereNotNull('completed_at'),
            ])
                ->having('total_tasks', '>', 0)
                ->get()
                ->filter(fn ($p) => $p->completed_tasks == $p->total_tasks && $p->total_tasks > 0)
                ->count(),
            'in_progress' => Project::withCount([
                'tasks as total_tasks',
                'tasks as completed_tasks' => fn ($query) => $query->whereNotNull('completed_at'),
            ])
                ->having('total_tasks', '>', 0)
                ->get()
                ->filter(fn ($p) => $p->completed_tasks > 0 && $p->completed_tasks < $p->total_tasks)
                ->count(),
            'not_started' => Project::withCount('tasks')
                ->having('tasks_count', '=', 0)
                ->count(),
        ];

        return [
            'total' => $totalProjects,
            'active' => $activeProjects,
            'archived' => $archivedProjects,
            'with_tasks' => $projectsWithTasks,
            'avg_completion_rate' => round($avgCompletionRate, 2),
            'by_status' => $projectsByStatus,
            'completion_rates' => $completionRates->take(10),
        ];
    }

    /**
     * Get milestone statistics
     */
    public function getMilestoneStats(): array
    {
        $total = Milestone::count();

        $byStatus = [
            'not_started' => Milestone::where('status', MilestoneStatus::NOT_STARTED)->count(),
            'in_progress' => Milestone::where('status', MilestoneStatus::IN_PROGRESS)->count(),
            'completed' => Milestone::where('status', MilestoneStatus::COMPLETED)->count(),
            'delayed' => Milestone::where('status', MilestoneStatus::DELAYED)->count(),
            'cancelled' => Milestone::where('status', MilestoneStatus::CANCELLED)->count(),
        ];

        $completionRate = $total > 0
            ? round(($byStatus['completed'] / $total) * 100, 2)
            : 0;

        // Average progress
        $avgProgress = Milestone::avg('progress') ?? 0;

        // Milestones due this month
        $dueThisMonth = Milestone::whereMonth('end_date', now()->month)
            ->whereYear('end_date', now()->year)
            ->whereNotIn('status', [MilestoneStatus::COMPLETED, MilestoneStatus::CANCELLED])
            ->count();

        // Overdue milestones
        $overdue = Milestone::where('end_date', '<', now())
            ->whereNotIn('status', [MilestoneStatus::COMPLETED, MilestoneStatus::CANCELLED])
            ->count();

        return [
            'total' => $total,
            'by_status' => $byStatus,
            'completion_rate' => $completionRate,
            'avg_progress' => round($avgProgress, 2),
            'due_this_month' => $dueThisMonth,
            'overdue' => $overdue,
        ];
    }

    /**
     * Get budget statistics
     */
    public function getBudgetStats(): array
    {
        $total = Budget::count();

        $byStatus = [
            'draft' => Budget::where('status', BudgetStatus::DRAFT)->count(),
            'approved' => Budget::where('status', BudgetStatus::APPROVED)->count(),
            'active' => Budget::where('status', BudgetStatus::ACTIVE)->count(),
            'exceeded' => Budget::where('status', BudgetStatus::EXCEEDED)->count(),
            'closed' => Budget::where('status', BudgetStatus::CLOSED)->count(),
        ];

        $totalBudget = Budget::sum('total_amount');
        $totalAllocated = Budget::sum('allocated_amount');
        $totalSpent = Budget::sum('spent_amount');
        $totalRemaining = Budget::sum('remaining_amount');

        $utilizationRate = $totalBudget > 0
            ? round(($totalSpent / $totalBudget) * 100, 2)
            : 0;

        // Top budgets by project
        $topBudgets = Budget::with('project:id,name')
            ->select('project_id', DB::raw('SUM(total_amount) as total_budget'))
            ->groupBy('project_id')
            ->orderByDesc('total_budget')
            ->limit(10)
            ->get()
            ->map(fn ($budget) => [
                'project_name' => $budget->project->name ?? 'Unknown',
                'total_budget' => $budget->total_budget,
            ]);

        return [
            'total' => $total,
            'by_status' => $byStatus,
            'total_budget' => round($totalBudget, 2),
            'total_allocated' => round($totalAllocated, 2),
            'total_spent' => round($totalSpent, 2),
            'total_remaining' => round($totalRemaining, 2),
            'utilization_rate' => $utilizationRate,
            'top_budgets' => $topBudgets,
        ];
    }

    /**
     * Get directorate statistics
     */
    public function getDirectorateStats(): array
    {
        $directorates = ClientCompany::directorates()
            ->withCount('projects')
            ->with(['projects' => function ($query) {
                $query->withCount([
                    'milestones',
                    'milestones as completed_milestones' => fn ($q) => $q->where('status', MilestoneStatus::COMPLETED),
                    'budgets',
                ]);
            }])
            ->get()
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
                        ? round(($completedMilestones / $totalMilestones) * 100, 2)
                        : 0,
                ];
            });

        return [
            'total_directorates' => ClientCompany::directorates()->count(),
            'directorates' => $directorates,
        ];
    }

    /**
     * Get trends data (last 6 months)
     */
    public function getTrends(): array
    {
        $months = collect(range(5, 0))->map(function ($monthsAgo) {
            return now()->subMonths($monthsAgo);
        });

        $projectTrends = $months->map(function ($date) {
            return [
                'month' => $date->format('M Y'),
                'created' => Project::whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->count(),
                'total' => Project::where('created_at', '<=', $date->endOfMonth())
                    ->count(),
            ];
        });

        $milestoneTrends = $months->map(function ($date) {
            return [
                'month' => $date->format('M Y'),
                'completed' => Milestone::where('status', MilestoneStatus::COMPLETED)
                    ->whereYear('actual_end_date', $date->year)
                    ->whereMonth('actual_end_date', $date->month)
                    ->count(),
                'created' => Milestone::whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->count(),
            ];
        });

        $budgetTrends = $months->map(function ($date) {
            return [
                'month' => $date->format('M Y'),
                'allocated' => Budget::whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->sum('total_amount'),
                'spent' => Budget::whereYear('updated_at', $date->year)
                    ->whereMonth('updated_at', $date->month)
                    ->sum('spent_amount'),
            ];
        });

        return [
            'projects' => $projectTrends,
            'milestones' => $milestoneTrends,
            'budgets' => $budgetTrends,
        ];
    }

    /**
     * Get project performance metrics
     */
    public function getProjectPerformanceMetrics(): array
    {
        return Project::select('projects.*')
            ->withCount([
                'tasks as total_tasks',
                'tasks as completed_tasks' => fn ($query) => $query->whereNotNull('completed_at'),
                'tasks as overdue_tasks' => fn ($query) => $query->whereNull('completed_at')
                    ->whereDate('due_on', '<', now()),
                'milestones',
                'milestones as completed_milestones' => fn ($query) => $query->where('status', MilestoneStatus::COMPLETED),
                'budgets',
            ])
            ->with([
                'clientCompany:id,name',
                'directorate:id,name',
            ])
            ->get()
            ->map(function ($project) {
                $taskCompletionRate = $project->total_tasks > 0
                    ? round(($project->completed_tasks / $project->total_tasks) * 100, 2)
                    : 0;

                $milestoneCompletionRate = $project->milestones_count > 0
                    ? round(($project->completed_milestones / $project->milestones_count) * 100, 2)
                    : 0;

                return [
                    'id' => $project->id,
                    'name' => $project->name,
                    'client_company' => $project->clientCompany?->name,
                    'directorate' => $project->directorate?->name,
                    'total_tasks' => $project->total_tasks,
                    'completed_tasks' => $project->completed_tasks,
                    'overdue_tasks' => $project->overdue_tasks,
                    'task_completion_rate' => $taskCompletionRate,
                    'total_milestones' => $project->milestones_count,
                    'completed_milestones' => $project->completed_milestones,
                    'milestone_completion_rate' => $milestoneCompletionRate,
                    'budgets_count' => $project->budgets_count,
                ];
            })
            ->toArray();
    }
}

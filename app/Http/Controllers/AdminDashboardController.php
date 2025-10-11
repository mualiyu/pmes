<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\ClientCompany;
use App\Models\Invoice;
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
            'tasksAnalytics' => $this->getTasksAnalytics(),
            'userActivityData' => $this->getUserActivityData(),
            'revenueData' => $this->getRevenueData(),
            'timeLogData' => $this->getTimeLogData(),
            'projectStatusDistribution' => $this->getProjectStatusDistribution(),
            'topPerformers' => $this->getTopPerformers(),
            'recentActivities' => $this->getRecentActivities(),
            'clientsOverview' => $this->getClientsOverview(),
        ]);
    }

    private function getStatistics(): array
    {
        return [
            'totalProjects' => Project::withArchived()->count(),
            'activeProjects' => Project::count(), // Non-archived projects
            'archivedProjects' => Project::onlyArchived()->count(),
            'totalTasks' => Task::withArchived()->count(),
            'completedTasks' => Task::whereNotNull('completed_at')->count(),
            'overdueTasks' => Task::whereNull('completed_at')
                ->whereDate('due_on', '<', now())
                ->count(),
            'totalUsers' => User::withArchived()->count(),
            'activeUsers' => User::count(), // Non-archived users
            'archivedUsers' => User::onlyArchived()->count(),
            'totalClients' => ClientCompany::count(),
            'totalInvoices' => Invoice::count(),
            'totalRevenue' => Invoice::where('status', 'paid')->sum('amount_with_tax'),
            'pendingInvoices' => Invoice::where('status', 'pending')->count(),
            'totalTimeLogged' => TimeLog::sum('minutes'),
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

    private function getTasksAnalytics(): array
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
            ->withoutRole('client')
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
        // Get recent projects, tasks, and invoices
        $recentProjects = Project::with('clientCompany:id,name')
            ->latest()
            ->limit(5)
            ->get(['id', 'name', 'client_company_id', 'created_at'])
            ->map(fn ($project) => [
                'type' => 'project',
                'name' => $project->name,
                'client' => $project->clientCompany?->name,
                'created_at' => $project->created_at->diffForHumans(),
            ]);

        $recentTasks = Task::with(['project:id,name', 'assignedToUser:id,name'])
            ->latest()
            ->limit(5)
            ->get(['id', 'name', 'project_id', 'assigned_to_user_id', 'created_at'])
            ->map(fn ($task) => [
                'type' => 'task',
                'name' => $task->name,
                'project' => $task->project?->name,
                'assigned_to' => $task->assignedToUser?->name,
                'created_at' => $task->created_at->diffForHumans(),
            ]);

        return $recentProjects->concat($recentTasks)
            ->sortByDesc('created_at')
            ->take(10)
            ->values()
            ->toArray();
    }

    private function getClientsOverview(): array
    {
        return ClientCompany::withCount(['projects', 'clients'])
            ->with('clients:id,name,client_company_id')
            ->get(['id', 'name'])
            ->map(fn ($company) => [
                'id' => $company->id,
                'name' => $company->name,
                'projects_count' => $company->projects_count,
                'clients_count' => $company->clients_count,
            ])
            ->toArray();
    }
}

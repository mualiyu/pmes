<?php

namespace App\Services;

use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Collection;

class PermissionService
{
    public static $permissionsByRole = [
        'system administrator' => [
            // User Management
            'Users' => ['view users', 'view user rate', 'create user', 'edit user', 'archive user', 'restore user'],

            // System Settings
            'Labels' => ['view labels', 'create label', 'edit label', 'archive label', 'restore label'],
            'Roles' => ['view roles', 'create role', 'edit role', 'archive role', 'restore role'],
            'Owner Company' => ['view owner company', 'edit owner company'],

            // Organizations
            'Organizations' => ['view client companies', 'create client company', 'edit client company', 'archive client company', 'restore client company'],
            'Vendors' => ['view vendors', 'create vendor', 'edit vendor', 'archive vendor', 'restore vendor'],
            'Directorates' => ['view directorates', 'create directorate', 'edit directorate', 'archive directorate', 'restore directorate'],
            'Organization Users' => ['view client users', 'create client user', 'edit client user', 'archive client user', 'restore client user'],

            // Project Management
            'Projects' => ['view projects', 'view project', 'create project', 'edit project', 'archive project', 'restore project', 'edit project user access'],
            'Milestones' => ['view milestones', 'create milestone', 'edit milestone', 'archive milestone', 'restore milestone'],
            'Budgets' => ['view budgets', 'create budget', 'edit budget', 'archive budget', 'restore budget'],

            // Indicators (Tasks)
            'Indicator Groups' => ['create task group', 'edit task group', 'archive task group', 'restore task group', 'reorder task group'],
            'Indicators' => [
                'view tasks', 'create task', 'edit task', 'archive task', 'restore task', 'reorder task',
                'complete task', 'add time log', 'delete time log', 'view time logs', 'view comments',
            ],

            // Financial
            'Invoices' => ['view invoices', 'create invoice', 'edit invoice', 'archive invoice', 'restore invoice', 'change invoice status', 'download invoice', 'print invoice'],

            // Reporting & Monitoring
            'Reports' => ['view logged time sum report', 'view daily logged time report'],
            'Dashboards' => ['view admin dashboard', 'view monitoring dashboard'],
            'Activities' => ['view activities'],
        ],

        'program director' => [
            // User Management
            'Users' => ['view users'],

            // Organizations
            'Organizations' => ['view client companies', 'create client company', 'edit client company'],
            'Vendors' => ['view vendors', 'create vendor', 'edit vendor'],
            'Directorates' => ['view directorates', 'create directorate', 'edit directorate'],

            // Project Management
            'Projects' => ['view projects', 'view project', 'create project', 'edit project', 'archive project', 'restore project', 'edit project user access'],
            'Milestones' => ['view milestones', 'create milestone', 'edit milestone', 'archive milestone', 'restore milestone'],
            'Budgets' => ['view budgets', 'create budget', 'edit budget', 'archive budget', 'restore budget'],

            // Indicators
            'Indicator Groups' => ['create task group', 'edit task group', 'archive task group', 'restore task group', 'reorder task group'],
            'Indicators' => [
                'view tasks', 'create task', 'edit task', 'archive task', 'restore task', 'reorder task',
                'complete task', 'add time log', 'delete time log', 'view time logs', 'view comments',
            ],

            // Financial
            'Invoices' => ['view invoices', 'create invoice', 'edit invoice', 'change invoice status', 'download invoice'],

            // Reporting & Monitoring
            'Reports' => ['view logged time sum report', 'view daily logged time report'],
            'Dashboards' => ['view admin dashboard', 'view monitoring dashboard'],
            'Activities' => ['view activities'],
        ],

        'me officer' => [
            // Organizations
            'Organizations' => ['view client companies'],
            'Vendors' => ['view vendors'],
            'Directorates' => ['view directorates'],

            // Project Management
            'Projects' => ['view projects', 'view project', 'create project', 'edit project'],
            'Milestones' => ['view milestones', 'create milestone', 'edit milestone'],
            'Budgets' => ['view budgets'],

            // Indicators - Core M&E work
            'Indicator Groups' => ['create task group', 'edit task group', 'reorder task group'],
            'Indicators' => [
                'view tasks', 'create task', 'edit task', 'reorder task', 'complete task',
                'add time log', 'delete time log', 'view time logs', 'view comments',
            ],

            // Reporting & Monitoring
            'Reports' => ['view logged time sum report', 'view daily logged time report'],
            'Dashboards' => ['view monitoring dashboard'],
            'Activities' => ['view activities'],
        ],

        'project coordinator' => [
            // Organizations
            'Organizations' => ['view client companies'],
            'Vendors' => ['view vendors'],
            'Directorates' => ['view directorates'],

            // Project Management
            'Projects' => ['view projects', 'view project', 'edit project'],
            'Milestones' => ['view milestones', 'create milestone', 'edit milestone'],
            'Budgets' => ['view budgets'],

            // Indicators
            'Indicator Groups' => ['create task group', 'edit task group'],
            'Indicators' => [
                'view tasks', 'create task', 'edit task', 'complete task',
                'add time log', 'view time logs', 'view comments',
            ],

            // Reporting
            'Reports' => ['view logged time sum report', 'view daily logged time report'],
            'Dashboards' => ['view monitoring dashboard'],
        ],

        'data officer' => [
            // Organizations
            'Organizations' => ['view client companies'],
            'Vendors' => ['view vendors'],
            'Directorates' => ['view directorates'],

            // Project Management
            'Projects' => ['view projects', 'view project'],
            'Milestones' => ['view milestones'],
            'Budgets' => ['view budgets'],

            // Indicators - Data entry focus
            'Indicators' => [
                'view tasks', 'create task', 'edit task', 'add time log', 'view time logs', 'view comments',
            ],

            // Reporting
            'Reports' => ['view logged time sum report', 'view daily logged time report'],
            'Dashboards' => ['view monitoring dashboard'],
        ],

        'finance officer' => [
            // Organizations
            'Organizations' => ['view client companies'],
            'Vendors' => ['view vendors', 'create vendor', 'edit vendor'],
            'Directorates' => ['view directorates'],

            // Project Management - Finance focus
            'Projects' => ['view projects', 'view project'],
            'Milestones' => ['view milestones'],
            'Budgets' => ['view budgets', 'create budget', 'edit budget'],

            // Indicators - View only
            'Indicators' => ['view tasks', 'view time logs'],

            // Financial
            'Invoices' => ['view invoices', 'create invoice', 'edit invoice', 'change invoice status', 'download invoice', 'print invoice'],

            // Reporting
            'Reports' => ['view logged time sum report', 'view daily logged time report'],
            'Dashboards' => ['view monitoring dashboard'],
        ],

        'directorate head' => [
            // Organizations - Own directorate only
            'Organizations' => ['view client companies'],
            'Directorates' => ['view directorates'],

            // Project Management - View their directorate's projects
            'Projects' => ['view projects', 'view project'],
            'Milestones' => ['view milestones'],
            'Budgets' => ['view budgets'],

            // Indicators - View and comment
            'Indicators' => ['view tasks', 'view time logs', 'view comments'],

            // Reporting
            'Reports' => ['view logged time sum report'],
            'Dashboards' => ['view monitoring dashboard'],
        ],

        'vendor representative' => [
            // Organizations - Own vendor only
            'Organizations' => ['view client companies'],
            'Vendors' => ['view vendors'],

            // Project Management - View assigned projects only
            'Projects' => ['view projects', 'view project'],
            'Milestones' => ['view milestones'],

            // Indicators - Limited to assigned tasks
            'Indicators' => ['view tasks', 'edit task', 'view comments'],
        ],

        'stakeholder' => [
            // Organizations
            'Organizations' => ['view client companies'],
            'Directorates' => ['view directorates'],

            // Project Management - View only
            'Projects' => ['view projects', 'view project'],
            'Milestones' => ['view milestones'],
            'Budgets' => ['view budgets'],

            // Indicators - View only
            'Indicators' => ['view tasks', 'view comments'],

            // Reporting - View dashboards
            'Dashboards' => ['view monitoring dashboard'],
        ],
    ];

    public static function allPermissionsGrouped(): array
    {
        return self::$permissionsByRole['system administrator'];
    }

    private static $usersWithAccessToProject = [];

    public static function usersWithAccessToProject($project): Collection
    {
        if (isset(self::$usersWithAccessToProject[$project->id])) {
            return self::$usersWithAccessToProject[$project->id];
        }

        $admins = User::role('system administrator')
            ->with('roles:id,name')
            ->get(['id', 'name', 'avatar'])
            ->map(fn ($user) => [...$user->toArray(), 'reason' => 'system administrator']);

        $owners = $project
            ->clientCompany
            ->clients
            ->load('roles:id,name')
            ->map(fn ($user) => [...$user->toArray(), 'reason' => 'company owner']);

        $givenAccess = $project
            ->users
            ->load('roles:id,name')
            ->map(fn ($user) => [...$user->toArray(), 'reason' => 'given access']);

        return self::$usersWithAccessToProject[$project->id] = collect([
            ...$admins,
            ...$owners,
            ...$givenAccess,
        ])
            ->unique('id')
            ->sortBy('name')
            ->values();
    }

    private static $projectsThatUserCanAccess = null;

    public static function projectsThatUserCanAccess(User $user): Collection
    {
        if (self::$projectsThatUserCanAccess !== null) {
            return self::$projectsThatUserCanAccess;
        }

        // System Administrator and Program Director have access to all projects
        if ($user->hasRole(['system administrator', 'program director'])) {
            return self::$projectsThatUserCanAccess = Project::all();
        }

        // Get projects user has explicit access to
        $projects = collect($user->projects->toArray());

        // Get projects from user's client company (if assigned to one)
        if ($user->client_company_id) {
            $user->load('clientCompanies.projects');
            $clientCompany = $user->clientCompanies;

            if ($clientCompany && $clientCompany->projects) {
                $projects = $projects->merge($clientCompany->projects->toArray());
            }
        }

        return self::$projectsThatUserCanAccess = $projects
            ->unique('id')
            ->sortBy('name')
            ->values();
    }
}

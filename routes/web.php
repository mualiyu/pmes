<?php

use App\Http\Controllers\Account\NotificationController;
use App\Http\Controllers\Account\ProfileController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\Client\ClientCompanyController;
use App\Http\Controllers\Client\ClientUserController;
use App\Http\Controllers\Client\DirectorateController;
use App\Http\Controllers\Client\VendorController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DropdownValuesController;
use App\Http\Controllers\Invoice\InvoiceTasksController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\MonitoringDashboardController;
use App\Http\Controllers\MyWork\ActivityController;
use App\Http\Controllers\MyWork\MyWorkTaskController;
use App\Http\Controllers\Project\BudgetController;
use App\Http\Controllers\Project\MilestoneController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\Settings\LabelController;
use App\Http\Controllers\Settings\OwnerCompanyController;
use App\Http\Controllers\Settings\RoleController;
use App\Http\Controllers\Task\AttachmentController;
use App\Http\Controllers\Task\CommentController;
use App\Http\Controllers\Task\GroupController;
use App\Http\Controllers\Task\TimeLogController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// TEMPORARY - Remove after creating link!
Route::get('/create-storage-link', function () {
    if (app()->environment('production')) {
        abort(403, 'Not allowed in production');
    }
    
    $target = storage_path('app/public');
    $link = public_path('storage');
    
    if (file_exists($link)) {
        return 'Storage link already exists!';
    }
    
    symlink($target, $link);
    
    return 'Storage link created successfully!';
})->middleware('auth');

Route::redirect('/', 'dashboard');

Route::group(['middleware' => ['auth:sanctum']], function () {
    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');

    // Monitoring Dashboard
    Route::get('monitoring/dashboard', [MonitoringDashboardController::class, 'index'])->name('monitoring.dashboard');
    Route::get('api/monitoring/stats', [MonitoringDashboardController::class, 'stats'])->name('api.monitoring.stats');
    Route::get('api/monitoring/projects/performance', [MonitoringDashboardController::class, 'projectPerformance'])->name('api.monitoring.projects.performance');
    Route::get('api/monitoring/projects/stats', [MonitoringDashboardController::class, 'projectStats'])->name('api.monitoring.projects.stats');
    Route::get('api/monitoring/milestones/stats', [MonitoringDashboardController::class, 'milestoneStats'])->name('api.monitoring.milestones.stats');
    Route::get('api/monitoring/budgets/stats', [MonitoringDashboardController::class, 'budgetStats'])->name('api.monitoring.budgets.stats');
    Route::get('api/monitoring/directorates/stats', [MonitoringDashboardController::class, 'directorateStats'])->name('api.monitoring.directorates.stats');
    Route::get('api/monitoring/trends', [MonitoringDashboardController::class, 'trends'])->name('api.monitoring.trends');

    // Route::get('/gantt-chart', [DashboardController::class, 'ganttChart'])->name('gantt-chart');
    // Route::get('/ceo-dashboard', [DashboardController::class, 'ceoDashboard'])->name('ceo-dashboard');

    // Projects
    Route::resource('projects', ProjectController::class);

    // Global Milestones & Budgets
    Route::get('milestones', [MilestoneController::class, 'globalIndex'])->name('milestones.index');
    Route::get('budgets', [BudgetController::class, 'globalIndex'])->name('budgets.index');

    Route::group(['prefix' => 'projects', 'as' => 'projects.'], function () {
        // PROJECT
        Route::post('{projectId}/restore', [ProjectController::class, 'restore'])->name('restore');
        Route::put('{project}/favorite/toggle', [ProjectController::class, 'favoriteToggle'])->name('favorite.toggle');
        Route::post('{project}/user-access', [ProjectController::class, 'userAccess'])->name('user_access');

        // MILESTONES
        Route::get('{project}/milestones', [MilestoneController::class, 'index'])->name('milestones.index');
        Route::get('{project}/milestones/create', [MilestoneController::class, 'create'])->name('milestones.create');
        Route::post('{project}/milestones', [MilestoneController::class, 'store'])->name('milestones.store');
        Route::get('{project}/milestones/{milestone}/edit', [MilestoneController::class, 'edit'])->name('milestones.edit')->scopeBindings();
        Route::put('{project}/milestones/{milestone}', [MilestoneController::class, 'update'])->name('milestones.update')->scopeBindings();
        Route::delete('{project}/milestones/{milestone}', [MilestoneController::class, 'destroy'])->name('milestones.destroy')->scopeBindings();
        Route::post('{project}/milestones/{milestoneId}/restore', [MilestoneController::class, 'restore'])->name('milestones.restore');

        // BUDGETS
        Route::get('{project}/budgets', [BudgetController::class, 'index'])->name('budgets.index');
        Route::get('{project}/budgets/create', [BudgetController::class, 'create'])->name('budgets.create');
        Route::post('{project}/budgets', [BudgetController::class, 'store'])->name('budgets.store');
        Route::get('{project}/budgets/{budget}/edit', [BudgetController::class, 'edit'])->name('budgets.edit')->scopeBindings();
        Route::put('{project}/budgets/{budget}', [BudgetController::class, 'update'])->name('budgets.update')->scopeBindings();
        Route::delete('{project}/budgets/{budget}', [BudgetController::class, 'destroy'])->name('budgets.destroy')->scopeBindings();
        Route::post('{project}/budgets/{budgetId}/restore', [BudgetController::class, 'restore'])->name('budgets.restore');

        // TASK GROUPS
        Route::post('{project}/task-groups', [GroupController::class, 'store'])->name('task-groups.store');
        Route::put('{project}/task-groups/{taskGroup}', [GroupController::class, 'update'])->name('task-groups.update')->scopeBindings();
        Route::delete('{project}/task-groups/{taskGroup}', [GroupController::class, 'destroy'])->name('task-groups.destroy')->scopeBindings();
        Route::post('{project}/task-groups/{taskGroupId}/restore', [GroupController::class, 'restore'])->name('task-groups.restore')->scopeBindings();
        Route::post('{project}/task-groups/reorder', [GroupController::class, 'reorder'])->name('task-groups.reorder');

        // TASKS
        Route::get('{project}/tasks', [TaskController::class, 'index'])->name('tasks');
        Route::post('{project}/tasks', [TaskController::class, 'store'])->name('tasks.store');
        Route::put('{project}/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update')->scopeBindings();
        Route::get('{project}/tasks/{task}/open', [TaskController::class, 'index'])->name('tasks.open')->scopeBindings();
        Route::delete('{project}/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy')->scopeBindings();
        Route::post('{project}/tasks/{task}/restore', [TaskController::class, 'restore'])->name('tasks.restore')->scopeBindings();

        Route::post('{project}/tasks/{task}/complete', [TaskController::class, 'complete'])->name('tasks.complete')->scopeBindings();
        Route::post('{project}/tasks/reorder', [TaskController::class, 'reorder'])->name('tasks.reorder');
        Route::post('{project}/tasks/move', [TaskController::class, 'move'])->name('tasks.move');

        // ATTACHMENTS
        Route::group(['prefix' => '{project}/tasks/{task}', 'as' => 'tasks.'], function () {
            Route::post('attachments/upload', [AttachmentController::class, 'store'])->name('attachments.upload');
            Route::delete('attachments/{attachment}', [AttachmentController::class, 'destroy'])->name('attachments.destroy');
        })->scopeBindings();

        // TIME LOGS
        Route::group(['prefix' => '{project}/tasks/{task}', 'as' => 'tasks.'], function () {
            Route::post('time-log', [TimeLogController::class, 'store'])->name('time-logs.store');
            Route::delete('time-log/{timeLog}', [TimeLogController::class, 'destroy'])->name('time-logs.destroy');
            Route::post('time-log/timer/start', [TimeLogController::class, 'startTimer'])->name('time-logs.timer.start');
            Route::post('time-log/{timeLog}/timer/stop', [TimeLogController::class, 'stopTimer'])->name('time-logs.timer.stop');
        })->scopeBindings();

        // COMMENTS
        Route::group(['prefix' => '{project}/tasks/{task}', 'as' => 'tasks.'], function () {
            Route::get('comment', [CommentController::class, 'index'])->name('comments');
            Route::post('comment', [CommentController::class, 'store'])->name('comments.store');
        })->scopeBindings();
    });

    // My Work
    Route::group(['prefix' => 'my-work', 'as' => 'my-work.'], function () {
        Route::get('tasks', [MyWorkTaskController::class, 'index'])->name('tasks.index');
        Route::get('activity', [ActivityController::class, 'index'])->name('activity.index');
    });

    // Clients
    Route::group(['prefix' => 'clients', 'as' => 'clients.'], function () {
        Route::resource('users', ClientUserController::class)->except(['show']);
        Route::post('users/{userId}/restore', [ClientUserController::class, 'restore'])->name('users.restore');

        Route::resource('companies', ClientCompanyController::class)->except(['show']);
        Route::post('companies/{companyId}/restore', [ClientCompanyController::class, 'restore'])->name('companies.restore');
    });

    // Vendors
    Route::resource('vendors', VendorController::class)->except(['show']);
    Route::post('vendors/{vendorId}/restore', [VendorController::class, 'restore'])->name('vendors.restore');

    // Directorates
    Route::resource('directorates', DirectorateController::class)->except(['show']);
    Route::post('directorates/{directorateId}/restore', [DirectorateController::class, 'restore'])->name('directorates.restore');

    // Users
    Route::resource('users', UserController::class)->except(['show']);
    Route::post('users/{userId}/restore', [UserController::class, 'restore'])->name('users.restore');

    // Invoices
    Route::resource('invoices', InvoiceController::class)->except(['show']);
    Route::group(['prefix' => 'invoices', 'as' => 'invoices.'], function () {
        Route::get('tasks', [InvoiceTasksController::class, 'index'])->name('tasks');
        Route::put('{invoice}/status', [InvoiceController::class, 'setStatus'])->name('status');
        Route::post('{invoice}/restore', [InvoiceController::class, 'restore'])->name('restore');
        Route::get('{invoice}/download', [InvoiceController::class, 'download'])->name('download');
        Route::get('{invoice}/pdf', [InvoiceController::class, 'pdf'])->name('pdf');
    });

    // Reports
    Route::group(['prefix' => 'reports', 'as' => 'reports.'], function () {
        Route::get('logged-time/sum', [ReportController::class, 'loggedTimeSum'])->name('logged-time.sum');
        Route::get('logged-time/daily', [ReportController::class, 'dailyLoggedTime'])->name('logged-time.daily');
    });

    // Settings
    Route::group(['prefix' => 'settings', 'as' => 'settings.'], function () {
        Route::get('company', [OwnerCompanyController::class, 'edit'])->name('company.edit');
        Route::put('company', [OwnerCompanyController::class, 'update'])->name('company.update');

        Route::resource('roles', RoleController::class)->except(['show']);
        Route::post('roles/{roleId}/restore', [RoleController::class, 'restore'])->name('roles.restore');

        Route::resource('labels', LabelController::class)->except(['show']);
        Route::post('labels/{labelId}/restore', [LabelController::class, 'restore'])->name('labels.restore');
    });

    // Account
    Route::group(['prefix' => 'account', 'as' => 'account.'], function () {
        Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::put('profile', [ProfileController::class, 'update'])->name('profile.update');
    });

    // Notifications
    Route::get('notifications', [NotificationController::class, 'index'])->name('notifications');
    Route::put('notifications/{notification}/read', [NotificationController::class, 'read'])->name('notifications.read');
    Route::put('notifications/read/all', [NotificationController::class, 'readAll'])->name('notifications.read.all');

    Route::get('dropdown/values', DropdownValuesController::class)->name('dropdown.values');
});

<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\MonitoringDashboardService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MonitoringDashboardController extends Controller
{
    public function __construct(
        private MonitoringDashboardService $dashboardService
    ) {}

    /**
     * Display the monitoring dashboard
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', \App\Models\Project::class);

        $stats = $this->dashboardService->getDashboardStats();

        return Inertia::render('MonitoringDashboard/Index', [
            'stats' => $stats,
        ]);
    }

    /**
     * Get dashboard statistics as JSON
     */
    public function stats(Request $request): JsonResponse
    {
        $this->authorize('viewAny', \App\Models\Project::class);

        $stats = $this->dashboardService->getDashboardStats();

        return response()->json([
            'success' => true,
            'data' => $stats,
        ]);
    }

    /**
     * Get project performance metrics
     */
    public function projectPerformance(Request $request): JsonResponse
    {
        $this->authorize('viewAny', \App\Models\Project::class);

        $metrics = $this->dashboardService->getProjectPerformanceMetrics();

        return response()->json([
            'success' => true,
            'data' => $metrics,
        ]);
    }

    /**
     * Get project statistics only
     */
    public function projectStats(Request $request): JsonResponse
    {
        $this->authorize('viewAny', \App\Models\Project::class);

        $stats = $this->dashboardService->getProjectStats();

        return response()->json([
            'success' => true,
            'data' => $stats,
        ]);
    }

    /**
     * Get milestone statistics only
     */
    public function milestoneStats(Request $request): JsonResponse
    {
        $this->authorize('viewAny', \App\Models\Project::class);

        $stats = $this->dashboardService->getMilestoneStats();

        return response()->json([
            'success' => true,
            'data' => $stats,
        ]);
    }

    /**
     * Get budget statistics only
     */
    public function budgetStats(Request $request): JsonResponse
    {
        $this->authorize('viewAny', \App\Models\Project::class);

        $stats = $this->dashboardService->getBudgetStats();

        return response()->json([
            'success' => true,
            'data' => $stats,
        ]);
    }

    /**
     * Get directorate statistics only
     */
    public function directorateStats(Request $request): JsonResponse
    {
        $this->authorize('viewAny', \App\Models\Project::class);

        $stats = $this->dashboardService->getDirectorateStats();

        return response()->json([
            'success' => true,
            'data' => $stats,
        ]);
    }

    /**
     * Get trends data
     */
    public function trends(Request $request): JsonResponse
    {
        $this->authorize('viewAny', \App\Models\Project::class);

        $trends = $this->dashboardService->getTrends();

        return response()->json([
            'success' => true,
            'data' => $trends,
        ]);
    }
}

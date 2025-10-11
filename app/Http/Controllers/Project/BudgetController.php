<?php

declare(strict_types=1);

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Budget\StoreBudgetRequest;
use App\Http\Requests\Budget\UpdateBudgetRequest;
use App\Http\Resources\Budget\BudgetResource;
use App\Models\Budget;
use App\Models\Currency;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BudgetController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Budget::class, 'budget');
    }

    /**
     * Display a global listing of all budgets.
     */
    public function globalIndex(Request $request): Response
    {
        $this->authorize('viewAny', Budget::class);

        $budgets = Budget::query()
            ->with(['project:id,name', 'currency:id,name,code,symbol'])
            ->searchByQueryString()
            ->when($request->has('archived'), fn ($query) => $query->onlyArchived())
            ->when($request->has('status'), fn ($query) => $query->where('status', $request->status))
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Budgets/Index', [
            'items' => BudgetResource::collection($budgets),
        ]);
    }

    /**
     * Display a listing of budgets for a project.
     */
    public function index(Request $request, Project $project): Response
    {
        $this->authorize('view', $project);

        $budgets = Budget::query()
            ->where('project_id', $project->id)
            ->with('currency:id,name,code,symbol')
            ->searchByQueryString()
            ->when($request->has('archived'), fn ($query) => $query->onlyArchived())
            ->when($request->has('status'), fn ($query) => $query->where('status', $request->status))
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Projects/Budgets/Index', [
            'project' => $project->load('directorate:id,name', 'clientCompany:id,name'),
            'items' => BudgetResource::collection($budgets),
        ]);
    }

    /**
     * Show the form for creating a new budget.
     */
    public function create(Project $project): Response
    {
        $this->authorize('create', Budget::class);

        return Inertia::render('Projects/Budgets/Create', [
            'project' => $project->only(['id', 'name']),
            'dropdowns' => [
                'currencies' => Currency::dropdownValues(),
            ],
        ]);
    }

    /**
     * Store a newly created budget.
     */
    public function store(StoreBudgetRequest $request, Project $project): RedirectResponse
    {
        $data = $request->validated();
        $data['project_id'] = $project->id;

        // Calculate remaining amount
        $data['remaining_amount'] = $data['total_amount'] - ($data['spent_amount'] ?? 0);

        Budget::create($data);

        return redirect()
            ->route('projects.budgets.index', $project)
            ->success('Budget created', 'A new budget was successfully created.');
    }

    /**
     * Show the form for editing the specified budget.
     */
    public function edit(Project $project, Budget $budget): Response
    {
        $this->authorize('update', $budget);

        return Inertia::render('Projects/Budgets/Edit', [
            'project' => $project->only(['id', 'name']),
            'item' => new BudgetResource($budget->load('currency:id,name,code,symbol')),
            'dropdowns' => [
                'currencies' => Currency::dropdownValues(),
            ],
        ]);
    }

    /**
     * Update the specified budget.
     */
    public function update(UpdateBudgetRequest $request, Project $project, Budget $budget): RedirectResponse
    {
        $data = $request->validated();

        // Recalculate remaining amount if total or spent amount changed
        if (isset($data['total_amount']) || isset($data['spent_amount'])) {
            $totalAmount = $data['total_amount'] ?? $budget->total_amount;
            $spentAmount = $data['spent_amount'] ?? $budget->spent_amount;
            $data['remaining_amount'] = $totalAmount - $spentAmount;
        }

        $budget->update($data);

        return redirect()
            ->route('projects.budgets.index', $project)
            ->success('Budget updated', 'The budget was successfully updated.');
    }

    /**
     * Remove the specified budget.
     */
    public function destroy(Project $project, Budget $budget): RedirectResponse
    {
        $budget->archive();

        return redirect()
            ->back()
            ->success('Budget archived', 'The budget was successfully archived.');
    }

    /**
     * Restore the specified budget.
     */
    public function restore(Project $project, int $budgetId): RedirectResponse
    {
        $budget = Budget::withArchived()->findOrFail($budgetId);

        $this->authorize('restore', $budget);

        $budget->unArchive();

        return redirect()
            ->back()
            ->success('Budget restored', 'The budget was successfully restored.');
    }
}

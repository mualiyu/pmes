<?php

declare(strict_types=1);

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Milestone\StoreMilestoneRequest;
use App\Http\Requests\Milestone\UpdateMilestoneRequest;
use App\Http\Resources\Milestone\MilestoneResource;
use App\Models\Milestone;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MilestoneController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Milestone::class, 'milestone');
    }

    /**
     * Display a global listing of all milestones.
     */
    public function globalIndex(Request $request): Response
    {
        $this->authorize('viewAny', Milestone::class);

        $milestones = Milestone::query()
            ->with('project:id,name')
            ->searchByQueryString()
            ->when($request->has('archived'), fn ($query) => $query->onlyArchived())
            ->when($request->has('status'), fn ($query) => $query->where('status', $request->status))
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Milestones/Index', [
            'items' => MilestoneResource::collection($milestones),
        ]);
    }

    /**
     * Display a listing of milestones for a project.
     */
    public function index(Request $request, Project $project): Response
    {
        $this->authorize('view', $project);

        $milestones = Milestone::query()
            ->where('project_id', $project->id)
            ->searchByQueryString()
            ->when($request->has('archived'), fn ($query) => $query->onlyArchived())
            ->when($request->has('status'), fn ($query) => $query->where('status', $request->status))
            ->orderBy('order')
            ->orderBy('start_date')
            ->get();

        return Inertia::render('Projects/Milestones/Index', [
            'project' => $project->load('directorate:id,name', 'clientCompany:id,name'),
            'items' => MilestoneResource::collection($milestones),
        ]);
    }

    /**
     * Show the form for creating a new milestone.
     */
    public function create(Project $project): Response
    {
        $this->authorize('create', Milestone::class);

        return Inertia::render('Projects/Milestones/Create', [
            'project' => $project->only(['id', 'name']),
        ]);
    }

    /**
     * Store a newly created milestone.
     */
    public function store(StoreMilestoneRequest $request, Project $project): RedirectResponse
    {
        $data = $request->validated();
        $data['project_id'] = $project->id;

        Milestone::create($data);

        return redirect()
            ->route('projects.milestones.index', $project)
            ->success('Milestone created', 'A new milestone was successfully created.');
    }

    /**
     * Show the form for editing the specified milestone.
     */
    public function edit(Project $project, Milestone $milestone): Response
    {
        $this->authorize('update', $milestone);

        return Inertia::render('Projects/Milestones/Edit', [
            'project' => $project->only(['id', 'name']),
            'item' => new MilestoneResource($milestone),
        ]);
    }

    /**
     * Update the specified milestone.
     */
    public function update(UpdateMilestoneRequest $request, Project $project, Milestone $milestone): RedirectResponse
    {
        $milestone->update($request->validated());

        return redirect()
            ->route('projects.milestones.index', $project)
            ->success('Milestone updated', 'The milestone was successfully updated.');
    }

    /**
     * Remove the specified milestone.
     */
    public function destroy(Project $project, Milestone $milestone): RedirectResponse
    {
        $milestone->archive();

        return redirect()
            ->back()
            ->success('Milestone archived', 'The milestone was successfully archived.');
    }

    /**
     * Restore the specified milestone.
     */
    public function restore(Project $project, int $milestoneId): RedirectResponse
    {
        $milestone = Milestone::withArchived()->findOrFail($milestoneId);

        $this->authorize('restore', $milestone);

        $milestone->unArchive();

        return redirect()
            ->back()
            ->success('Milestone restored', 'The milestone was successfully restored.');
    }
}


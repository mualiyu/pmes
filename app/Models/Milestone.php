<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\MilestoneStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Lacodix\LaravelModelFilter\Traits\IsSearchable;
use Lacodix\LaravelModelFilter\Traits\IsSortable;
use LaravelArchivable\Archivable;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Milestone extends Model implements AuditableContract
{
    use Archivable, Auditable, IsSearchable, IsSortable;

    protected $fillable = [
        'project_id',
        'name',
        'description',
        'status',
        'start_date',
        'end_date',
        'actual_start_date',
        'actual_end_date',
        'progress',
        'budget_allocated',
        'deliverables',
        'order',
    ];

    protected $casts = [
        'status' => MilestoneStatus::class,
        'start_date' => 'date',
        'end_date' => 'date',
        'actual_start_date' => 'date',
        'actual_end_date' => 'date',
        'progress' => 'integer',
        'budget_allocated' => 'decimal:2',
        'order' => 'integer',
    ];

    protected $searchable = [
        'name',
        'description',
    ];

    protected $sortable = [
        'name',
        'start_date',
        'end_date',
        'progress',
        'order',
    ];

    protected $observables = [
        'archived',
        'unArchived',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function activities(): MorphMany
    {
        return $this->morphMany(Activity::class, 'activity_capable');
    }

    public function isCompleted(): bool
    {
        return $this->status === MilestoneStatus::COMPLETED;
    }

    public function isDelayed(): bool
    {
        return $this->status === MilestoneStatus::DELAYED;
    }

    public function isInProgress(): bool
    {
        return $this->status === MilestoneStatus::IN_PROGRESS;
    }

    public function scopeByProject($query, int $projectId)
    {
        return $query->where('project_id', $projectId);
    }

    public function scopeByStatus($query, MilestoneStatus $status)
    {
        return $query->where('status', $status);
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', MilestoneStatus::COMPLETED);
    }

    public function scopeInProgress($query)
    {
        return $query->where('status', MilestoneStatus::IN_PROGRESS);
    }

    public function scopeDelayed($query)
    {
        return $query->where('status', MilestoneStatus::DELAYED);
    }
}

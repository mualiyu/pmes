<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\BudgetStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Lacodix\LaravelModelFilter\Traits\IsSearchable;
use Lacodix\LaravelModelFilter\Traits\IsSortable;
use LaravelArchivable\Archivable;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Budget extends Model implements AuditableContract
{
    use Archivable, Auditable, IsSearchable, IsSortable;

    protected $fillable = [
        'project_id',
        'name',
        'description',
        'status',
        'currency_id',
        'total_amount',
        'allocated_amount',
        'spent_amount',
        'remaining_amount',
        'fiscal_year_start',
        'fiscal_year_end',
        'notes',
    ];

    protected $casts = [
        'status' => BudgetStatus::class,
        'total_amount' => 'decimal:2',
        'allocated_amount' => 'decimal:2',
        'spent_amount' => 'decimal:2',
        'remaining_amount' => 'decimal:2',
        'fiscal_year_start' => 'date',
        'fiscal_year_end' => 'date',
    ];

    protected $searchable = [
        'name',
        'description',
    ];

    protected $sortable = [
        'name',
        'total_amount',
        'status',
    ];

    protected $observables = [
        'archived',
        'unArchived',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }

    public function activities(): MorphMany
    {
        return $this->morphMany(Activity::class, 'activity_capable');
    }

    public function isApproved(): bool
    {
        return $this->status === BudgetStatus::APPROVED;
    }

    public function isActive(): bool
    {
        return $this->status === BudgetStatus::ACTIVE;
    }

    public function isExceeded(): bool
    {
        return $this->status === BudgetStatus::EXCEEDED;
    }

    public function calculateRemaining(): float
    {
        return (float) ($this->total_amount - $this->spent_amount);
    }

    public function updateSpentAmount(float $amount): void
    {
        $this->spent_amount += $amount;
        $this->remaining_amount = $this->calculateRemaining();

        if ($this->spent_amount > $this->total_amount && $this->status !== BudgetStatus::EXCEEDED) {
            $this->status = BudgetStatus::EXCEEDED;
        }

        $this->save();
    }

    public function scopeByProject($query, int $projectId)
    {
        return $query->where('project_id', $projectId);
    }

    public function scopeByStatus($query, BudgetStatus $status)
    {
        return $query->where('status', $status);
    }

    public function scopeActive($query)
    {
        return $query->where('status', BudgetStatus::ACTIVE);
    }

    public function scopeExceeded($query)
    {
        return $query->where('status', BudgetStatus::EXCEEDED);
    }
}


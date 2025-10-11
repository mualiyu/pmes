<?php

declare(strict_types=1);

namespace App\Http\Resources\Budget;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BudgetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'project_id' => $this->project_id,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'currency_id' => $this->currency_id,
            'total_amount' => $this->total_amount,
            'allocated_amount' => $this->allocated_amount,
            'spent_amount' => $this->spent_amount,
            'remaining_amount' => $this->remaining_amount,
            'fiscal_year_start' => $this->fiscal_year_start?->format('Y-m-d'),
            'fiscal_year_end' => $this->fiscal_year_end?->format('Y-m-d'),
            'notes' => $this->notes,
            'project' => $this->whenLoaded('project', fn () => $this->project->only(['id', 'name'])),
            'currency' => $this->whenLoaded('currency', fn () => $this->currency->only(['id', 'name', 'code', 'symbol'])),
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }
}

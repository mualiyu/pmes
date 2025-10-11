<?php

declare(strict_types=1);

namespace App\Http\Requests\Budget;

use App\Enums\BudgetStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBudgetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['sometimes', 'required', 'string', Rule::enum(BudgetStatus::class)],
            'currency_id' => ['nullable', 'integer', 'exists:currencies,id'],
            'total_amount' => ['sometimes', 'required', 'numeric', 'min:0'],
            'allocated_amount' => ['nullable', 'numeric', 'min:0'],
            'spent_amount' => ['nullable', 'numeric', 'min:0'],
            'remaining_amount' => ['nullable', 'numeric', 'min:0'],
            'fiscal_year_start' => ['nullable', 'date'],
            'fiscal_year_end' => ['nullable', 'date', 'after_or_equal:fiscal_year_start'],
            'notes' => ['nullable', 'string'],
        ];
    }
}


<?php

namespace App\Http\Requests\Project;

use App\Enums\PricingType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
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
            'name' => ['required', 'string', Rule::unique('projects', 'name')],
            'description' => 'string|nullable',
            'default_pricing_type' => ['required', 'string', Rule::enum(PricingType::class)],
            'client_company_id' => 'required|integer|exists:client_companies,id',
            'directorate_id' => 'nullable|integer|exists:client_companies,id',
            'rate' => 'numeric|min:0|nullable',
            'users' => 'array',
        ];
    }
}

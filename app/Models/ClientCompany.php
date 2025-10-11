<?php

namespace App\Models;

use App\Enums\ClientCompanyType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Lacodix\LaravelModelFilter\Traits\IsSearchable;
use Lacodix\LaravelModelFilter\Traits\IsSortable;
use LaravelArchivable\Archivable;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class ClientCompany extends Model implements AuditableContract
{
    use Archivable, Auditable, HasFactory, IsSearchable, IsSortable;

    protected $fillable = [
        'code', // added this code after creating migration to add code field in table
        'name',
        'type',
        'address',
        'postal_code',
        'city',
        'country_id',
        'currency_id',
        'email',
        'phone',
        'web',
        'iban',
        'swift',
        'business_id',
        'tax_id',
        'vat',
    ];

    protected $casts = [
        'type' => ClientCompanyType::class,
    ];

    protected $searchable = [
        'name',
        'email',
    ];

    protected $sortable = [
        'name' => 'asc',
        'email',
    ];

    // client company has many users
    public function clients(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function scopeVendors($query)
    {
        return $query->where('type', ClientCompanyType::VENDOR);
    }

    public function scopeDirectorates($query)
    {
        return $query->where('type', ClientCompanyType::DIRECTORATE);
    }

    public function scopeGeneral($query)
    {
        return $query->where('type', ClientCompanyType::GENERAL);
    }

    public function isVendor(): bool
    {
        return $this->type === ClientCompanyType::VENDOR;
    }

    public function isDirectorate(): bool
    {
        return $this->type === ClientCompanyType::DIRECTORATE;
    }

    public static function dropdownValues($options = []): array
    {
        return self::orderBy('name')
            ->when(in_array('hasProjects', $options), fn ($query) => $query->has('projects'))
            ->when(in_array('vendors', $options), fn ($query) => $query->vendors())
            ->when(in_array('directorates', $options), fn ($query) => $query->directorates())
            ->get(['id', 'name'])
            ->map(fn ($i) => ['value' => (string) $i->id, 'label' => $i->name])
            ->toArray();
    }
}

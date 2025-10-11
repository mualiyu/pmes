<?php

declare(strict_types=1);

namespace App\Http\Controllers\Client;

use App\Enums\ClientCompanyType;
use App\Http\Controllers\Controller;
use App\Http\Requests\ClientCompany\StoreClientCompanyRequest;
use App\Http\Requests\ClientCompany\UpdateClientCompanyRequest;
use App\Http\Resources\ClientCompany\ClientCompanyResource;
use App\Models\ClientCompany;
use App\Models\Country;
use App\Models\Currency;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VendorController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Vendors/Index', [
            'items' => ClientCompanyResource::collection(
                ClientCompany::searchByQueryString()
                    ->sortByQueryString()
                    ->vendors()
                    ->with(['country:id,name', 'currency:id,name,code'])
                    ->when($request->has('archived'), fn ($query) => $query->onlyArchived())
                    ->paginate(12)
            ),
        ]);
    }

    public function create()
    {
        return Inertia::render('Vendors/Create', [
            'countries' => Country::select('id', 'name')->orderBy('name')->get(),
            'currencies' => Currency::select('id', 'name', 'code')->orderBy('name')->get(),
        ]);
    }

    public function store(StoreClientCompanyRequest $request)
    {
        $data = $request->validated();
        $data['type'] = ClientCompanyType::VENDOR->value;

        ClientCompany::create($data);

        return redirect()->route('vendors.index')->success('Vendor created', 'A new vendor was successfully created.');
    }

    public function edit(ClientCompany $vendor)
    {
        $this->authorize('update', $vendor);

        return Inertia::render('Vendors/Edit', [
            'item' => new ClientCompanyResource($vendor->load(['country:id,name', 'currency:id,name,code'])),
            'countries' => Country::select('id', 'name')->orderBy('name')->get(),
            'currencies' => Currency::select('id', 'name', 'code')->orderBy('name')->get(),
        ]);
    }

    public function update(ClientCompany $vendor, UpdateClientCompanyRequest $request)
    {
        $this->authorize('update', $vendor);

        $vendor->update($request->validated());

        return redirect()->route('vendors.index')->success('Vendor updated', 'The vendor was successfully updated.');
    }

    public function destroy(ClientCompany $vendor)
    {
        $this->authorize('delete', $vendor);

        $vendor->archive();

        return redirect()->back()->success('Vendor archived', 'The vendor was successfully archived.');
    }

    public function restore(int $vendorId)
    {
        $vendor = ClientCompany::withArchived()->findOrFail($vendorId);

        $this->authorize('restore', $vendor);

        $vendor->unArchive();

        return redirect()->back()->success('Vendor restored', 'The restoring of the vendor was completed successfully.');
    }
}

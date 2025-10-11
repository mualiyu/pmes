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

class DirectorateController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Directorates/Index', [
            'items' => ClientCompanyResource::collection(
                ClientCompany::searchByQueryString()
                    ->sortByQueryString()
                    ->directorates()
                    ->with(['country:id,name', 'currency:id,name,code'])
                    ->when($request->has('archived'), fn ($query) => $query->onlyArchived())
                    ->paginate(12)
            ),
        ]);
    }

    public function create()
    {
        return Inertia::render('Directorates/Create', [
            'countries' => Country::select('id', 'name')->orderBy('name')->get(),
            'currencies' => Currency::select('id', 'name', 'code')->orderBy('name')->get(),
        ]);
    }

    public function store(StoreClientCompanyRequest $request)
    {
        $data = $request->validated();
        $data['type'] = ClientCompanyType::DIRECTORATE->value;

        ClientCompany::create($data);

        return redirect()->route('directorates.index')->success('Directorate created', 'A new directorate was successfully created.');
    }

    public function edit(ClientCompany $directorate)
    {
        $this->authorize('update', $directorate);

        return Inertia::render('Directorates/Edit', [
            'item' => new ClientCompanyResource($directorate->load(['country:id,name', 'currency:id,name,code'])),
            'countries' => Country::select('id', 'name')->orderBy('name')->get(),
            'currencies' => Currency::select('id', 'name', 'code')->orderBy('name')->get(),
        ]);
    }

    public function update(ClientCompany $directorate, UpdateClientCompanyRequest $request)
    {
        $this->authorize('update', $directorate);

        $directorate->update($request->validated());

        return redirect()->route('directorates.index')->success('Directorate updated', 'The directorate was successfully updated.');
    }

    public function destroy(ClientCompany $directorate)
    {
        $this->authorize('delete', $directorate);

        $directorate->archive();

        return redirect()->back()->success('Directorate archived', 'The directorate was successfully archived.');
    }

    public function restore(int $directorateId)
    {
        $directorate = ClientCompany::withArchived()->findOrFail($directorateId);

        $this->authorize('restore', $directorate);

        $directorate->unArchive();

        return redirect()->back()->success('Directorate restored', 'The restoring of the directorate was completed successfully.');
    }
}

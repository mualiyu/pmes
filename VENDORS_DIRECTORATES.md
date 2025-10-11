# Vendors & Directorates Implementation

## Overview
Added functionality to categorize client companies into three types: **General**, **Vendor**, and **Directorate**, with separate management interfaces for each.

## What Was Implemented

### 1. Database Changes
- ✅ Created migration to add `type` field to `client_companies` table
- ✅ Added `ClientCompanyType` enum with three values:
  - `general` - Default type for regular client companies
  - `vendor` - For vendor organizations
  - `directorate` - For directorate organizations

### 2. Backend Updates

#### Enum (`app/Enums/ClientCompanyType.php`)
```php
enum ClientCompanyType: string
{
    case VENDOR = 'vendor';
    case DIRECTORATE = 'directorate';
    case GENERAL = 'general';
}
```

#### Model Updates (`app/Models/ClientCompany.php`)
- Added `type` field to fillable attributes
- Added type casting to `ClientCompanyType` enum
- Added scope methods:
  - `scopeVendors()` - Filter by vendor type
  - `scopeDirectorates()` - Filter by directorate type
  - `scopeGeneral()` - Filter by general type
- Added helper methods:
  - `isVendor()` - Check if company is a vendor
  - `isDirectorate()` - Check if company is a directorate
- Updated `dropdownValues()` to support filtering by type

#### Controllers
**VendorController** (`app/Http/Controllers/Client/VendorController.php`)
- index() - List all vendors with search, sort, and pagination
- create() - Show vendor creation form
- store() - Save new vendor (automatically sets type to 'vendor')
- edit() - Show vendor edit form
- update() - Update existing vendor
- destroy() - Archive vendor
- restore() - Restore archived vendor

**DirectorateController** (`app/Http/Controllers/Client/DirectorateController.php`)
- Same methods as VendorController but for directorates
- Automatically sets type to 'directorate' on creation

#### Routes (`routes/web.php`)
```php
// Vendors
Route::resource('vendors', VendorController::class)->except(['show']);
Route::post('vendors/{vendorId}/restore', [VendorController::class, 'restore']);

// Directorates
Route::resource('directorates', DirectorateController::class)->except(['show']);
Route::post('directorates/{directorateId}/restore', [DirectorateController::class, 'restore']);
```

### 3. Frontend Updates

#### Navigation (`resources/js/layouts/NavBarNested.jsx`)
Updated "Stakeholders" menu to include three sub-items:
- **Organizations** - General client companies (existing)
- **Vendors** - Vendor-specific management
- **Directorate** - Directorate-specific management

Each links to its respective index page with proper active state tracking.

#### View Files Created

**Vendors**
- `resources/js/pages/Vendors/Index.jsx` - List all vendors
- `resources/js/pages/Vendors/Create.jsx` - Create new vendor
- `resources/js/pages/Vendors/Edit.jsx` - Edit existing vendor

**Directorates**
- `resources/js/pages/Directorates/Index.jsx` - List all directorates
- `resources/js/pages/Directorates/Create.jsx` - Create new directorate
- `resources/js/pages/Directorates/Edit.jsx` - Edit existing directorate

All views include:
- Search functionality
- Sorting capabilities
- Pagination
- Archive/restore functionality
- Proper authorization checks

## How to Use

### Creating a Vendor
1. Navigate to **Stakeholders > Vendors**
2. Click **"Create Vendor"** button
3. Fill in:
   - Vendor Code (e.g., VEN001)
   - Vendor Name
   - Email (optional)
   - Phone (optional)
4. Click **"Create Vendor"**

### Creating a Directorate
1. Navigate to **Stakeholders > Directorate**
2. Click **"Create Directorate"** button
3. Fill in:
   - Directorate Code (e.g., DIR001)
   - Directorate Name
   - Email (optional)
   - Phone (optional)
4. Click **"Create Directorate"**

### Managing Vendors/Directorates
- **Edit**: Click the edit icon on any vendor/directorate row
- **Archive**: Click the archive icon to soft-delete
- **Restore**: Use the archived filter to view and restore archived items
- **Search**: Use the search box to filter by name or email
- **Sort**: Click column headers to sort

## Database Schema

The `client_companies` table now includes:
```sql
type VARCHAR(255) DEFAULT 'general'
```

Possible values:
- `'general'` - Default client company
- `'vendor'` - Vendor organization
- `'directorate'` - Directorate organization

## Permissions
The new Vendor and Directorate controllers use the same permissions as ClientCompany:
- `view client companies` - View vendors/directorates list
- `create client company` - Create new vendors/directorates
- `update client company` - Edit vendors/directorates
- `delete client company` - Archive vendors/directorates
- `restore client company` - Restore archived vendors/directorates

## Technical Notes

### Automatic Type Assignment
When creating through:
- VendorController - Type is automatically set to `'vendor'`
- DirectorateController - Type is automatically set to `'directorate'`
- ClientCompanyController - Type defaults to `'general'`

### Filtering
Use model scopes for querying:
```php
// Get all vendors
ClientCompany::vendors()->get();

// Get all directorates
ClientCompany::directorates()->get();

// Get all general companies
ClientCompany::general()->get();
```

### Dropdown Values
```php
// Get vendor dropdown values
ClientCompany::dropdownValues(['vendors']);

// Get directorate dropdown values
ClientCompany::dropdownValues(['directorates']);
```

## Migration Status
✅ Migration has been run successfully
✅ Database column added with default value 'general'
✅ Existing records will have type 'general' by default

## Future Enhancements
Possible improvements:
- Add type indicator badges in tables
- Add filtering by type in the main ClientCompany index
- Add type-specific fields or requirements
- Add statistics/analytics per type
- Add type-specific permissions for finer control


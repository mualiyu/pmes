<?php

declare(strict_types=1);

namespace App\Enums;

enum ClientCompanyType: string
{
    case VENDOR = 'vendor';
    case DIRECTORATE = 'directorate';
    case GENERAL = 'general';
}

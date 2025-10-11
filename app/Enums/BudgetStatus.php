<?php

declare(strict_types=1);

namespace App\Enums;

enum BudgetStatus: string
{
    case DRAFT = 'draft';
    case APPROVED = 'approved';
    case ACTIVE = 'active';
    case EXCEEDED = 'exceeded';
    case CLOSED = 'closed';
}

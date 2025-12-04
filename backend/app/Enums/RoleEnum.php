<?php

namespace App\Enums;

enum RoleEnum: string
{
    case PARTICIPANTE = 'participante';
    case ORGANIZADOR = 'organizador';

    public static function values(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }
}

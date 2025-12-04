<?php

namespace App\Enums;

enum SexoEnum: string
{
    case MASCULINO = 'masculino';
    case FEMININO = 'feminino';
    case OUTRO = 'outro';

    public static function values(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }
}

<?php

namespace App\Enums;

enum EventoStatusEnum: string
{
    case PROXIMO = 'proximo';
    case EM_ANDAMENTO = 'em_andamento';
    case FINALIZADO = 'finalizado';

    public static function values(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }
}

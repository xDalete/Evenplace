<?php

namespace App\Models;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Evento extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function inscricoes(): HasMany
    {
        return $this->hasMany(Inscricao::class);
    }

    public function getInscricoes(bool $pago): Collection
    {
        return $this->inscricoes()
            ->where('pago', $pago)
            ->get();
    }

    public static function queryAllByStatus(): Builder
    {
        return DB::table((new Evento())->getTable())
            ->select('*')
            ->orderBy(DB::raw("
                CASE
                    WHEN status = 'em_andamento' THEN 1
                    WHEN status = 'proximo' THEN 2
                    WHEN status = 'finalizado' THEN 3
                END
            "));
    }
}

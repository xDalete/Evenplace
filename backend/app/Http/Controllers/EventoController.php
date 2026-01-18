<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Evento;
use App\Enums\RoleEnum;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Enums\EventoStatusEnum;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\CreateEventoRequest;
use App\Http\Requests\UpdateEventoRequest;
use Spatie\RouteAttributes\Attributes\Get;
use Spatie\RouteAttributes\Attributes\Put;
use Spatie\RouteAttributes\Attributes\Post;
use Spatie\RouteAttributes\Attributes\Patch;
use Spatie\RouteAttributes\Attributes\Delete;
use Spatie\RouteAttributes\Attributes\Prefix;
use Symfony\Component\HttpFoundation\Response;
use Spatie\RouteAttributes\Attributes\Middleware;
use Symfony\Component\HttpFoundation\JsonResponse;

#[Prefix('/eventos')]
#[Middleware(['auth:sanctum', 'abilities:organizador'])]
class EventoController extends Controller
{
    #[Get('/', withoutMiddleware: ['abilities:organizador'])]
    public function index(Request $request): JsonResponse
    {
        $builder = Evento::queryAllByStatus();

        $builder->when(!!$request->query('nome'), callback: function (Builder $query) use ($request): Builder {
            return $query->where(
                fn(Builder $query): Builder =>
                $query->whereLike('nome', '%' . $request->query('nome') . '%')
                    ->orWhereLike('descricao', '%' . $request->query('nome') . '%')
            );
        });

        $builder->when(
            !!$request->query('status'),
            fn(Builder $query): Builder =>
            $query->whereIn('status', explode(',', $request->query('status')))
        );

        $eventos = $builder->get();

        return response()->json([
            'message' => 'Lista de eventos retornada com sucesso.',
            'data' => $eventos,
            'status' => Response::HTTP_OK,
        ]);
    }

    #[Post('/', withoutMiddleware: 'abilities:organizador')]
    public function store(CreateEventoRequest $request): JsonResponse
    {
        $request = collect($request->validated());

        if ($request->get('meta_vendas') > $request->get('quantidade_vagas')) {
            return response()->json([
                'message' => 'A meta de vendas não pode ser maior do que o número de vagas',
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $status = EventoStatusEnum::PROXIMO;
        $hoje = Carbon::now()->format('Y-m-d');

        if ($request->get('data') === $hoje) {
            $status = EventoStatusEnum::EM_ANDAMENTO;
        } else if ($request->get('data') < $hoje) {
            $status = EventoStatusEnum::FINALIZADO;
        }

        try {
            DB::beginTransaction();

            $evento = Evento::create([
                ...$request->except('banner'),
                'vagas_disponiveis' => $request->get('quantidade_vagas'),
                'status' => $status->value,
            ]);

            $fileName = "{$evento->id}-" . md5_file(request()->file('banner')->path())
                . ".{$request->get('banner')->extension()}";

            if (!Storage::disk('public')->putFileAs('/banners', $request->get('banner'), $fileName)) {
                throw new Exception('Não foi possível realizar o upload do banner');
            }

            $evento->banner = $fileName;

            $evento->update();

            Auth::user()->update(['status' => RoleEnum::ORGANIZADOR]);

            DB::commit();

            return response()->json([
                'message' => 'Evento criado com sucesso!',
                'data' => $evento,
                'status' => Response::HTTP_CREATED,
            ], Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            DB::rollBack();

            return response()->json([
                'message' => 'Não foi possível cadastrar o evento',
                'detalhes' => $th->getMessage(),
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Get('/{evento}', withoutMiddleware: ['abilities:organizador'])]
    public function show(Evento $evento): JsonResponse
    {
        $detalhesVagas = [];

        if (Auth::user()->tokenCan('organizador')) {
            $detalhesVagas = [
                'vagas_pagas' => $evento->getInscricoes(true)->count(),
                'vagas_pendentes' => $evento->getInscricoes(false)->count(),
                'meta_vendas' => $evento->meta_vendas,
            ];
        }

        return response()->json([
            'message' => 'Detalhes do evento retornados com sucesso.',
            'data' => [
                ...$evento->except('meta_vendas'),
                ...$detalhesVagas,
            ],
            'status' => Response::HTTP_OK,
        ]);
    }

    #[Put('/{evento}')]
    #[Patch('/{evento}')]
    public function update(UpdateEventoRequest $request, Evento $evento): JsonResponse
    {
        $request = collect($request->validated());

        if ($request->isEmpty()) {
            return response()->json([
                'message' => 'Pelo menos um campo deve ser atualizado.',
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if (
            !!$request->get('meta_vendas') and
            $request->get('meta_vendas') > $request->get('quantidade_vagas', $evento->quantidade_vagas)
        ) {
            return response()->json([
                'message' => 'A meta de vendas não pode ser maior do que o número de vagas',
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if (
            !!$request->get('vagas_disponiveis') and
            $request->get('vagas_disponiveis') > $request->get('quantidade_vagas', $evento->quantidade_vagas)
        ) {
            return response()->json([
                'message' => 'O número de vagas disponíveis não pode ser maior do que o número de vagas totais',
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            DB::beginTransaction();

            $evento->update($request->except('banner')->toArray());

            if (!$request->get('banner')) {
                DB::commit();

                return response()->json([
                    'message' => 'Evento atualizado com sucesso!',
                    'data' => $evento,
                    'status' => Response::HTTP_OK,
                ], Response::HTTP_OK);
            }

            if (!Storage::disk('public')->delete("/banners/{$evento->banner}")) {
                throw new Exception('Não foi possível deletar o banner antigo.');
            }

            $fileName = "{$evento->id}-" . md5_file(request()->file('banner')->path())
                . ".{$request->get('banner')->extension()}";

            if (!Storage::disk('public')->putFileAs('/banners', $request->get('banner'), $fileName)) {
                throw new Exception('Não foi possível realizar o upload do banner.');
            }

            $evento->banner = $fileName;

            $evento->update();

            DB::commit();

            return response()->json([
                'message' => 'Evento atualizado com sucesso!',
                'data' => $evento,
                'status' => Response::HTTP_OK,
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            DB::rollBack();

            return response()->json([
                'message' => 'Não foi possível cadastrar o evento',
                'detalhes' => $th->getMessage(),
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Delete('/{evento}')]
    public function destroy(Evento $evento)
    {
        $evento->delete();

        return response()->json([
            'message' => 'Evento excluído com sucesso.',
            'status' => Response::HTTP_OK,
        ]);
    }

    #[Get('/banner/{banner}', withoutMiddleware: ['auth:sanctum', 'abilities:organizador'])]
    public function banner(string $banner): JsonResponse|Response
    {
        if (!Storage::disk('public')->exists('banners/' . $banner)) {
            return response()->json([
                'message' => 'Este banner não pôde ser encontrado.',
                'status' => Response::HTTP_NOT_FOUND,
            ], Response::HTTP_NOT_FOUND);
        }

        return response(Storage::disk('public')->get('banners/' . $banner))
            ->header('Content-Type', Storage::disk('public')::mimeType('banners/' . $banner));
    }
}

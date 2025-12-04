<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Enums\RoleEnum;
use App\Enums\SexoEnum;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterRequest;
use Spatie\RouteAttributes\Attributes\Get;
use Spatie\RouteAttributes\Attributes\Post;
use Spatie\RouteAttributes\Attributes\Prefix;
use Symfony\Component\HttpFoundation\Response;
use Spatie\RouteAttributes\Attributes\Middleware;
use Symfony\Component\HttpFoundation\JsonResponse;

#[Prefix('/auth')]
#[Middleware('auth:sanctum')]
class AuthController extends Controller
{
    #[Post('/register', withoutMiddleware: 'auth:sanctum')]
    public function register(RegisterRequest $request): JsonResponse
    {
        $request = $request->validated();

        if (!array_key_exists('idade', $request)) {
            $request['idade'] = 18;
        }

        if (!array_key_exists('sexo', $request)) {
            $request['sexo'] = fake()->randomElement([SexoEnum::MASCULINO->value, SexoEnum::FEMININO->value, SexoEnum::OUTRO->value]);
        }

        $user = User::create($request);

        Auth::attempt([
            'email' => $user['email'],
            'password' => $request['password']
        ]);

        $token = Auth::user()->isOrganizador()
            ? Auth::user()->createToken('access_token', [RoleEnum::ORGANIZADOR])->plainTextToken
            : Auth::user()->createToken('access_token', [])->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'data' => [
                ...$user->toArray(),
                'access_token' => $token,
            ],
            'status' => Response::HTTP_CREATED,
        ], Response::HTTP_CREATED);
    }

    #[Post('/login', withoutMiddleware: 'auth:sanctum')]
    public function login(LoginRequest $request): JsonResponse
    {
        $userCredentials = $request->validated();

        if (!Auth::attempt($userCredentials)) {
            return response()->json([
                'message' => 'Invalid credentials',
                'status' => Response::HTTP_UNAUTHORIZED,
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = Auth::user()->isOrganizador()
            ? Auth::user()->createToken('access_token', [RoleEnum::ORGANIZADOR])->plainTextToken
            : Auth::user()->createToken('access_token', [])->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'data' => [
                ...User::where('email', $userCredentials['email'])->first()->toArray(),
                'access_token' => $token,
            ],
            'status' => Response::HTTP_OK,
        ], Response::HTTP_OK);
    }

    #[Get('/me')]
    public function me(Request $request)
    {
        return response()->json([
            'message' => 'Dados do usuário logado recuperados com sucesso.',
            'data' => [
                ...Auth::user()->toArray(),
                'access_token' => $request->bearerToken(),
            ],
            'status' => Response::HTTP_OK,
        ]);
    }
}

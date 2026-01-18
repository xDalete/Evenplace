<?php

namespace Database\Factories;

use App\Enums\EventoStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Evento>
 */
class EventoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $quantidadeVagas = fake()->numberBetween(50, 2000);

        return [
            'nome' => fake()->sentence(3),
            'data' => fake()->dateTimeBetween('-1 year', '+1 years')->format('Y-m-d'),
            'local' => fake()->address(),
            'horario' => fake()->time(),
            'descricao' => fake()->paragraph(),
            'valor_ingresso' => fake()->randomFloat(2, 0, 100),
            'quantidade_vagas' => $quantidadeVagas,
            'vagas_disponiveis' => $quantidadeVagas,
            'meta_vendas' => fake()->numberBetween(10, $quantidadeVagas),
            'status' => fake()->randomElement(EventoStatusEnum::values()),
            'banner' => fake()->image( storage_path('app\public\banners') , 640, 480, null, false),
        ];
    }
}

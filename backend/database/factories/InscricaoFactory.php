<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Evento;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inscricao>
 */
class InscricaoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $percentageOfGettingTrue = 60;

        $evento = Evento::inRandomOrder()->first();
        $evento?->decrement('vagas_disponiveis');

        return [
            'user_id' => User::inRandomOrder()->first()?->id,
            'evento_id' => $evento?->id,
            'pago' => fake()->boolean($percentageOfGettingTrue),
        ];
    }
}

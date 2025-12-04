<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enums\RoleEnum;
use App\Enums\SexoEnum;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (config('app.env') === 'local') {
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => Hash::make('password'),
                'idade' => 27,
                'sexo' => SexoEnum::OUTRO,
                'role' => RoleEnum::ORGANIZADOR,
            ]);
        }

        self::call([
            UserSeeder::class,
            EventoSeeder::class,
            InscricaoSeeder::class,
        ]);
    }
}

<?php

use App\Enums\EventoStatusEnum;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('eventos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->date('data');
            $table->string('local');
            $table->time('horario');
            $table->text('descricao')->nullable();
            $table->double('valor_ingresso');
            $table->unsignedInteger('quantidade_vagas');
            $table->unsignedInteger('vagas_disponiveis');
            $table->unsignedInteger('meta_vendas')->nullable();
            $table->enum('status', EventoStatusEnum::values())
                ->default(EventoStatusEnum::PROXIMO);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eventos');
    }
};

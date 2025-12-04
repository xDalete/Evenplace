<?php

namespace App\Http\Requests;

use App\Enums\EventoStatusEnum;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class UpdateEventoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->isOrganizador();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nome' => 'string|min:1|max:255',
            'data' => 'date|date_format:Y-m-d',
            'local' => 'string|min:1|max:255',
            'horario' => 'string|date_format:H:i:s',
            'valor_ingresso' => 'decimal:0,2',
            'quantidade_vagas' => 'integer',
            'meta_vendas' => 'integer',
            'vagas_disponiveis' => 'integer',
            'descricao' => 'string',
            'banner' => 'file',
            'status' => 'string|in:' . implode(',', EventoStatusEnum::values()),
        ];
    }
}

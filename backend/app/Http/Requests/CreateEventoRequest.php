<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class CreateEventoRequest extends FormRequest
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
            'nome' => 'required|string|min:1|max:255',
            'data' => 'required|date|date_format:Y-m-d',
            'local' => 'required|string|min:1|max:255',
            'horario' => 'required|string|date_format:H:i:s',
            'valor_ingresso' => 'required|decimal:0,2',
            'quantidade_vagas' => 'required|integer',
            'meta_vendas' => 'required|integer',
            'descricao' => 'string',
            'banner' => 'file',
        ];
    }
}

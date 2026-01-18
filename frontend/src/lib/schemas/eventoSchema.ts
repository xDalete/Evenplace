import z from "zod";

import { EventoStatusEnum } from "../Types/EventTypes";

export const eventoSchema = z.object({
  banner: z.instanceof(File).optional().or(z.null()),
  data: z.string().refine(val => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), "Data deve estar no formato Y-m-d"),
  descricao: z.string(),
  horario: z.string().refine(val => !val || /^\d{2}:\d{2}:\d{2}$/.test(val), "Horário deve estar no formato H:i:s"),
  local: z.string().min(1, "Local é obrigatório").max(255, "Local deve ter no máximo 255 caracteres"),
  meta_vendas: z.number().int("Meta deve ser um inteiro").min(0, "Meta deve ser positiva"),
  nome: z.string().min(1, "Nome é obrigatório").max(255, "Nome deve ter no máximo 255 caracteres"),
  quantidade_vagas: z.number().int("Quantidade deve ser um inteiro").min(0, "Quantidade deve ser positiva"),
  status: z.enum(EventoStatusEnum, { message: "Status inválido" }),
  vagas_disponiveis: z
    .number()
    .int("Vagas disponíveis deve ser um inteiro")
    .min(0, "Vagas disponíveis deve ser positiva"),
  valor_ingresso: z
    .number()
    .min(0, "Valor deve ser positivo")
    .refine(val => Number.isFinite(val) && Math.abs(val * 100) % 1 === 0, "Valor deve ter no máximo 2 casas decimais")
});

export type eventoSchemaType = z.infer<typeof eventoSchema>;

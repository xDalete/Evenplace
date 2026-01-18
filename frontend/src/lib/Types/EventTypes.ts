import { StringfiedDate } from "./Types";

export enum EventoStatusEnum {
  EM_ANDAMENTO = "em_andamento",
  FINALIZADO = "finalizado",
  PROXIMO = "proximo"
}

export type Evento = {
  banner: string;
  createdAt: StringfiedDate;
  //TODO: mudar para startDate e endDate aqui e no backend
  data: string;
  descricao: string;
  horario: string;
  id: string;
  local: string;
  meta_vendas?: number;
  nome: string;
  quantidade_vagas: number;
  status: EventoStatusEnum;
  updatedAt: StringfiedDate;
  vagas_disponiveis: number;
  vagas_pagas?: number;
  vagas_pendentes?: number;
  valor_ingresso: number;
  //organizerId: number;
};

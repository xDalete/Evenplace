import { StringfiedDate } from "./Types";

export enum EventoStatusEnum {
  PROXIMO = "proximo",
  EM_ANDAMENTO = "em_andamento",
  FINALIZADO = "finalizado"
};

export type Evento = {
  id: number;
  nome: string;
  //TODO: mudar para startDate e endDate aqui e no backend
  data: string;
  local: string;
  horario: string;
  descricao: string;
  valor_ingresso: number;
  quantidade_vagas: number;
  vagas_disponiveis: number;
  meta_vendas?: number;
  status: EventoStatusEnum;
  createdAt: StringfiedDate;
  updatedAt: StringfiedDate;
  vagas_pagas?: number;
  vagas_pendentes?: number;
  //organizerId: number;
};

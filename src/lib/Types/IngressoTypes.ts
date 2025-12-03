import { StringfiedDate } from "./Types";
import { Evento } from "./EventTypes";

export type Ingresso = {
  id: number;
  eventoId: number;
  evento: Evento;
  quantidade: number;
  valorTotal: number;
  tipoIngresso: "inteira" | "meia" | "vip";
  status: "pago" | "pendente" | "cancelado";
  codigoBarras?: string;
  qrCode?: string;
  createdAt: StringfiedDate;
  updatedAt: StringfiedDate;
};


import { Evento } from "@/lib/Types/EventTypes";
import { ArrayResponseType, ResponseType } from "@/lib/Types/Types";
import { getAxios } from "@/lib/utils/axios";

//TODO: adicionar paginação e filtros
export const getAllEventos = async () => {
  const response = await getAxios().get<ArrayResponseType<Evento[]>>(`/eventos`);

  return response.data;
};

export const getEventoById = async (id: number) => {
  const response = await getAxios().get<ResponseType<Evento>>(`/eventos/${id}`);

  return response.data;
};

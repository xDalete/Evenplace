import { Evento } from "@/lib/Types/EventTypes";
import { ArrayResponseType, ResponseType } from "@/lib/Types/Types";
import { getAxios } from "@/lib/utils/axios";

//TODO: adicionar paginação e filtros
export const getAllEventos = async () => {
  const response = await getAxios().get<ArrayResponseType<Evento>>(`/eventos`);

  return response.data;
};

export const getEventoById = async (id: string) => {
  const response = await getAxios().get<ResponseType<Evento>>(`/eventos/${id}`);

  return response.data;
};

export const createEvento = async (data: FormData) => {
  const response = await getAxios().post<ResponseType<Evento>>(`/eventos`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
};

export const updateEvento = async (id: string, data: FormData) => {
  const response = await getAxios().put<ResponseType<Evento>>(`/eventos/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
};

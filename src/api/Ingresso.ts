import { Ingresso } from "@/lib/Types/IngressoTypes";
import { ArrayResponseType } from "@/lib/Types/Types";
import { getAxios } from "@/lib/utils/axios";

// Busca todos os ingressos do usuário logado
export const getIngressosByUser = async () => {
  const response = await getAxios().get<ArrayResponseType<Ingresso>>(`/ingressos/meus`);

  return response.data;
};

// Busca um ingresso específico por ID
export const getIngressoById = async (id: number) => {
  const response = await getAxios().get<{ data: Ingresso }>(`/ingressos/${id}`);

  return response.data;
};


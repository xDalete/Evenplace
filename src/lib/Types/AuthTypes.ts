import { ErrCallbackType, StringfiedDate } from "./Types";

export type LoginParams = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type UserDataType = {
  id: number;
  name: string;
  email: string;
  email_verified_at?: StringfiedDate | null;
  idade?: number | null;
  sexo?: SexoEnum | null;
  role: RoleEnum;
  created_at: StringfiedDate;
  updated_at: StringfiedDate;
  access_token: string;
};

export type AuthValuesType = {
  loading: boolean;
  logout: () => void;
  user: UserDataType | null;
  setLoading: (value: boolean) => void;
  setUser: (value: UserDataType | null) => void;
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void;
};

export enum SexoEnum {
  MASCULINO = "masculino",
  FEMININO = "feminino",
  OUTRO = "outro"
};

export type RoleEnum = {
  ORGANIZADOR: "organizador";
  PARTICIPANTE: "participante";
  //TODO: Adicionar administrador no backend
  //ADMIN: "admin";
};

import { ErrCallbackType, StringfiedDate } from "./Types";

export enum SexoEnum {
  FEMININO = "feminino",
  MASCULINO = "masculino",
  OUTRO = "outro"
}

export type AuthValuesType = {
  loading: boolean;
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void;
  logout: () => void;
  setLoading: (value: boolean) => void;
  setUser: (value: null | UserDataType) => void;
  user: null | UserDataType;
};

export type LoginParams = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type RoleEnum = {
  ORGANIZADOR: "organizador";
  PARTICIPANTE: "participante";
  //TODO: Adicionar administrador no backend
  //ADMIN: "admin";
};

export type UserDataType = {
  access_token: string;
  created_at: StringfiedDate;
  email: string;
  email_verified_at?: null | StringfiedDate;
  id: number;
  idade?: null | number;
  name: string;
  role: RoleEnum;
  sexo?: null | SexoEnum;
  updated_at: StringfiedDate;
};

import AuthConfig from "@/lib/configs/auth";
import { LoginParams, UserDataType } from "@/lib/Types/AuthTypes";
import { ResponseType } from "@/lib/Types/Types";
import { getAxios } from "@/lib/utils/axios";

export const login = async (params: LoginParams) => {
  const response = await getAxios().post<ResponseType<UserDataType>>(AuthConfig.loginEndpoint, params, {
    headers: {
      Authorization: ""
    }
  });

  return response.data;
};

export const getUserData = async () => {
  const response = await getAxios().get<ResponseType<UserDataType>>(AuthConfig.meEndpoint);

  return response.data;
};

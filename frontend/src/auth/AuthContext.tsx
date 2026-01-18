"use client";
// ** Next Import
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// ** React Imports
import { createContext, ReactNode, useEffect, useState } from "react";

import { getUserData, login } from "@/api/Auth";
// ** Config
import authConfig from "@/lib/configs/auth";
// ** Types
import { AuthValuesType, LoginParams, UserDataType } from "@/lib/Types/AuthTypes";
import { ErrCallbackType } from "@/lib/Types/Types";

// ** Defaults
const defaultProvider: AuthValuesType = {
  loading: true,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setLoading: () => Boolean,
  setUser: () => null,
  user: null
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<null | UserDataType>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  // ** Hooks
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!;
      if (storedToken) {
        setLoading(true);
        await getUserData()
          .then(async response => {
            setLoading(false);
            setUser(response.data);
          })
          .catch(() => {
            localStorage.removeItem("userData");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            setUser(null);
            setLoading(false);
            if (authConfig.onTokenExpiration === "logout" && !pathname.includes("login")) {
              router.replace("/login");
            }
          });
      } else {
        setLoading(false);
        router.replace("/login");
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    login(params)
      .then(async response => {
        if (params.rememberMe) {
          window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.access_token);
          window.localStorage.setItem(authConfig.userDataKeyName, JSON.stringify(response.data));
        }
        const returnUrl = searchParams.get("returnUrl");

        setUser(response.data);

        const redirectURL = typeof returnUrl === "string" && returnUrl !== "/" ? returnUrl : "/dashboard";

        router.replace(redirectURL);
      })

      .catch(err => {
        if (errorCallback) errorCallback(err);
      });
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    router.push("/login");
  };

  const values = {
    loading,
    login: handleLogin,
    logout: handleLogout,
    setLoading,
    setUser,
    user
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };

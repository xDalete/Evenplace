"use client";
// ** React Imports
import { createContext, useEffect, useState, ReactNode } from "react";

// ** Next Import
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// ** Config
import authConfig from "@/lib/configs/auth";

// ** Types
import { AuthValuesType, LoginParams, UserDataType } from "@/lib/Types/AuthTypes";
import { getUserData, login } from "@/api/Auth";
import { ErrCallbackType } from "@/lib/Types/Types";

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
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
        console.log(response);

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
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };

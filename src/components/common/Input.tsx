import React, { HtmlHTMLAttributes, InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  InputContainerProps?: HtmlHTMLAttributes<HTMLDivElement>;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  InputContainerProps,
  fullWidth = false,
  ...props
}) => (
  <div className={`${styles.inputContainer} ${fullWidth ? styles.fullWidth : ""}`} {...InputContainerProps}>
    {label && <label className={`${styles.label}`}>{label}</label>}
    <input {...props} className={`${styles.input} ${error ? styles.error : ""}`} />
    {error ? (
      <span className={`${styles.errorText}`}>{error}</span>
    ) : (
      helperText && <span className={`${styles.helperText}`}>{helperText}</span>
    )}
  </div>
);

export default Input;
/*
TODO: Adicionar contexto de autenticação completo com login, logout, estado de usuário e proteção de rotas.
Perfeito! Aqui está a **versão PRO completa** com **Auth Context + Provider + Hook**, tudo 100% tipado, pronto para produção e super fácil de usar em qualquer lugar da sua aplicação.

### Estrutura final recomendada:
```
src/
├── auth/
│   ├── AuthContext.tsx
│   ├── AuthProvider.tsx
│   └── useAuth.ts
├── hooks/
│   └── (pode manter o antigo ou remover)
└── app/
    └── login/page.tsx
```

### 1. `src/auth/AuthContext.tsx`

```ts
// src/auth/AuthContext.tsx
import { createContext, useContext } from "react";

export type User = {
  id: string;
  username: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
```

### 2. `src/auth/AuthProvider.tsx`

```tsx
// src/auth/AuthProvider.tsx
"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthContext, User } from "./AuthContext";
import { login } from "@/api/Auth";

type AuthProviderProps = {
  children: ReactNode;
  redirectTo?: string; // para onde ir após login
};

export function AuthProvider({ children, redirectTo = "/dashboard" }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // importante: começa true

  // Recupera sessão ao carregar a página
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const loginUser = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await login(email, password);

      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      setToken(response.token);
      setUser(response.user);

      router.push(redirectTo);
    } catch (err: any) {
      throw err; // deixa o formulário tratar
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  const value = {
    user,
    token,
    isLoading,
    login: loginUser,
    logout,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
```

### 3. Envolva sua app no `layout.tsx` (Next.js 13+ App Router)

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { AuthProvider } from "@/auth/AuthProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minha App",
  description: "Feita com amor e Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider redirectTo="/dashboard">
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 4. Atualize seu `Login.tsx` (agora MUITO mais limpo!)

```tsx
'use client';

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import styles from "./LoginForm.module.scss";
import CustomLink from "@/components/common/CustomLink";
import { useAuth } from "@/auth/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "O email é obrigatório").email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
    } catch (err: any) {
      setError("root", { message: err.message || "Email ou senha incorretos" });
    }
  };

  return (
    <div>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)} noValidate>

        <Input
          {...register("email")}
          label="Email"
          type="email"
          placeholder="exemplo@gmail.com"
          fullWidth
          error={errors.email?.message}
          disabled={isLoading}
        />

        <Input
          {...register("password")}
          label="Senha"
          type="password"
          placeholder="••••••••"
          fullWidth
          error={errors.password?.message || errors.root?.message}
          disabled={isLoading}
        />

        <CustomLink href="/esqueci-minha-senha" className={styles.forgotPassword}>
          Esqueci minha senha
        </CustomLink>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Login"}
        </Button>
      </form>

      <CustomLink href="/cadastro" className={styles.createAccount}>
        Não tenho uma conta
      </CustomLink>
    </div>
  );
}
```

### Como usar em qualquer componente (ex: Header)

```tsx
import { useAuth } from "@/auth/AuthContext";

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <div>
      <span>Bem-vindo, {user?.username}!</span>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

**Pronto!**  
Agora você tem um sistema de autenticação **completo, escalável, seguro e bonito** — exatamente como apps grandes fazem.

Próximos passos (quando quiser):
- Adicionar rota protegida com middleware
- Refresh token
- Zustand ou Redux (se precisar de estado mais complexo)
- Login com Google/GitHub

É só pedir que eu monto tudo!
*/

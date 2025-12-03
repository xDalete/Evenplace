"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import styles from "./LoginForm.module.scss";
import CustomLink from "@/components/common/CustomLink";
import { useAuth } from "@/lib/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().min(1, "O email é obrigatório").email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres")
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    login({ ...data, rememberMe: true }, err => {
      const errorMessage =
        err && typeof err === "object" && "message" in err ? err.message : "Email ou senha incorretos";
      setError("root", { message: errorMessage });
    });

    setIsLoading(false);
  };

  //TODO: adicionar lembrar-me
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

        <Button type="submit" variant="primary" fullWidth loading={isLoading} disabled={isLoading}>
          Login
        </Button>
      </form>

      <CustomLink href="/cadastro" className={styles.createAccount}>
        Não tenho uma conta
      </CustomLink>
    </div>
  );
}

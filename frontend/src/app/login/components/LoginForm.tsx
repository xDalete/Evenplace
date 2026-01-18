"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Button from "@/components/common/Button";
import CustomLink from "@/components/common/CustomLink";
import Input from "@/components/common/Input";
import { useAuth } from "@/lib/hooks/useAuth";

import styles from "./LoginForm.module.scss";

const loginSchema = z.object({
  email: z.string().min(1, "O email é obrigatório").email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres")
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    login({ ...data, rememberMe: true }, () => {
      const errorMessage = "Email ou senha incorretos";
      setError("root", { message: errorMessage });
    });

    setIsLoading(false);
  };

  //TODO: adicionar lembrar-me
  return (
    <div>
      <form className={styles.loginForm} noValidate onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email")}
          disabled={isLoading}
          error={errors.email?.message}
          fullWidth
          label="Email"
          placeholder="exemplo@gmail.com"
          type="email"
        />

        <Input
          {...register("password")}
          disabled={isLoading}
          error={errors.password?.message || errors.root?.message}
          fullWidth
          label="Senha"
          placeholder="••••••••"
          type="password"
        />

        <CustomLink className={styles.forgotPassword} href="/esqueci-minha-senha">
          Esqueci minha senha
        </CustomLink>

        <Button disabled={isLoading} fullWidth loading={isLoading} type="submit" variant="primary">
          Login
        </Button>
      </form>

      <CustomLink className={styles.createAccount} href="/cadastro">
        Não tenho uma conta
      </CustomLink>
    </div>
  );
}

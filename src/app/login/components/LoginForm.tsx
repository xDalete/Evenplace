"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import styles from "./LoginForm.module.scss"; 
import CustomLink from "@/components/common/CustomLink";

//TODO: adicionar validação e integração com backend
//TODO: adicionar caminho para resetar senha e criar conta
//TODO: adicionar loading state no botão de login

export default function Login() {
  return (
    <div>
      <form className={styles.loginForm}>
        <Input fullWidth label="Email" type="email" placeholder="exemplo@gmail.com" />
        <Input fullWidth label="Senha" type="password" placeholder="senha" />
        <CustomLink href="#" className={styles.forgotPassword}>
          Esqueci minha senha
        </CustomLink>
        <Button type="submit" variant="primary">
          Login
        </Button>
      </form>
      <CustomLink href="#" className={styles.createAccount}>
        Não tenho uma conta
      </CustomLink>
    </div>
  );
}
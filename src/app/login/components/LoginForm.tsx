"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import styles from "./LoginForm.module.scss"; 
import CustomLink from "@/components/common/CustomLink";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login realizado:", formData);
    // REQUISIÇÃO AO BACKEND 
    
    // Após login, redireciona
    router.push("/dashboard"); 
  };

  return (
    <div>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <Input
          fullWidth
          label="Email"
          type="email"
          placeholder="seu.email@exemplo.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          fullWidth
          label="Senha"
          type="password"
          placeholder="Sua senha"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        
        <div style={{ textAlign: "right", marginBottom: "1rem", fontSize: "0.9rem" }}>
             <CustomLink href="/recuperar-senha">Esqueceu a senha?</CustomLink>
        </div>

        <Button type="submit" variant="primary" fullWidth>
          Entrar
        </Button>
      </form>


      <div className={styles.signupLink} style={{ marginTop: "20px", textAlign: "center" }}>
        <span>Não tem uma conta? </span>
        <CustomLink href="/cadastro">Cadastre-se</CustomLink>
      </div>
    </div>
  );
}
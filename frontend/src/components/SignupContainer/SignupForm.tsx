"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import styles from "./SignupForm.module.scss";
import CustomLink from "@/components/common/CustomLink";
import { useState } from "react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: ""
  });

  const validateForm = () => {
    const newErrors = { name: "", email: "", password: "", confirmPassword: "", acceptTerms: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
      isValid = false;
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Email inválido";
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter no mínimo 6 caracteres";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
      isValid = false;
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Você deve aceitar os termos";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Cadastro realizado:", formData);
      //Requisição para o backend
    }
  };

  return (
    <div>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <Input
          fullWidth
          label="Nome Completo"
          type="text"
          placeholder="Seu nome"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />
        <Input
          fullWidth
          label="Email"
          type="email"
          placeholder="seu.email@exemplo.com"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />
        <Input
          fullWidth
          label="Senha"
          type="password"
          placeholder="Crie uma senha forte"
          value={formData.password}
          onChange={e => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
          helperText="Mínimo 6 caracteres"
        />
        <Input
          fullWidth
          label="Confirmar Senha"
          type="password"
          placeholder="Repita sua senha"
          value={formData.confirmPassword}
          onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
          error={errors.confirmPassword}
        />

        <div className={styles.termsCheckbox}>
          <input
            type="checkbox"
            id="terms"
            checked={formData.acceptTerms}
            onChange={e => setFormData({ ...formData, acceptTerms: e.target.checked })}
          />
          <label htmlFor="terms">
            Concordo com os <strong>Termos de Serviço</strong> e <strong>Política de Privacidade</strong>
          </label>
        </div>
        {errors.acceptTerms && <p className={styles.errorText}>{errors.acceptTerms}</p>}

        <Button type="submit" variant="primary" fullWidth>
          Criar Conta
        </Button>
      </form>

      <div className={styles.loginLink}>
        Já possui uma conta? <CustomLink href="/login">Faça login aqui</CustomLink>
      </div>
    </div>
  );
}

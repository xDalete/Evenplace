"use client";

import { useState } from "react";

import Button from "@/components/common/Button";
import CustomLink from "@/components/common/CustomLink";
import Input from "@/components/common/Input";

import styles from "./SignupForm.module.scss";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    acceptTerms: false,
    confirmPassword: "",
    email: "",
    name: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    acceptTerms: "",
    confirmPassword: "",
    email: "",
    name: "",
    password: ""
  });

  const validateForm = () => {
    const newErrors = { acceptTerms: "", confirmPassword: "", email: "", name: "", password: "" };
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
    }
  };

  return (
    <div>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <Input
          error={errors.name}
          fullWidth
          label="Nome Completo"
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          placeholder="Seu nome"
          type="text"
          value={formData.name}
        />
        <Input
          error={errors.email}
          fullWidth
          label="Email"
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          placeholder="seu.email@exemplo.com"
          type="email"
          value={formData.email}
        />
        <Input
          error={errors.password}
          fullWidth
          helperText="Mínimo 6 caracteres"
          label="Senha"
          onChange={e => setFormData({ ...formData, password: e.target.value })}
          placeholder="Crie uma senha forte"
          type="password"
          value={formData.password}
        />
        <Input
          error={errors.confirmPassword}
          fullWidth
          label="Confirmar Senha"
          onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
          placeholder="Repita sua senha"
          type="password"
          value={formData.confirmPassword}
        />

        <div className={styles.termsCheckbox}>
          <input
            checked={formData.acceptTerms}
            id="terms"
            onChange={e => setFormData({ ...formData, acceptTerms: e.target.checked })}
            type="checkbox"
          />
          <label htmlFor="terms">
            Concordo com os <strong>Termos de Serviço</strong> e <strong>Política de Privacidade</strong>
          </label>
        </div>
        {errors.acceptTerms && <p className={styles.errorText}>{errors.acceptTerms}</p>}

        <Button fullWidth type="submit" variant="primary">
          Criar Conta
        </Button>
      </form>

      <div className={styles.loginLink}>
        Já possui uma conta? <CustomLink href="/login">Faça login aqui</CustomLink>
      </div>
    </div>
  );
}

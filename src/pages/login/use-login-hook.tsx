import React, { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../../service/auth-service";

type UseLogin = {
  email: string;
  password: string;
  error: string | null;
  handleSubmit: (e: React.FormEvent) => void;
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  signUp: () => void;
};

export const useLogin = (): UseLogin => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function onChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await toast.promise(
        login(email, password),
        {
          pending: "Carregando...",
          success: "Acesso concedido 🚀",
          error: "E-mail ou senha inválidos",
        },
      );
      window.location.href = "/dashboard";
    } catch (error) {
      setError("E-mail ou senha inválidos");
    }
  };

  function signUp() {
    window.location.href = "/signup";
  }

  return {
    email,
    password,
    error,
    handleSubmit,
    signUp,
    onChangeEmail,
    onChangePassword,
  };
};

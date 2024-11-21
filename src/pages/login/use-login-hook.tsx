import React, { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../../service/auth-service";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
      navigate("/messages");
    } catch (error) {
      setError("E-mail ou senha inválidos");
    }
  };

  function signUp() {
    navigate("/signup");
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

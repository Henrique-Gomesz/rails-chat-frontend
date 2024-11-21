import React, { useState } from "react";
import { toast } from "react-toastify";
import { signup } from "../../service/auth-service";

export const useSignup = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.promise(
      signup(formData.email, formData.username, formData.password),
      {
        error: "Erro ao criar conta",
        pending: "Criando conta...",
        success: "Conta criada com sucesso",
      },
    )
      .then(() => {
        window.location.href = "/login";
      }).catch((error) => {
        setError(error.message);
      });
  };

  function goBack() {
    window.location.href = "/login";
  }

  return {
    formData,
    error,
    handleChange,
    handleSubmit,
    goBack,
  };
};

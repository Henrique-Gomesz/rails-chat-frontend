import React, { useState } from "react";
import { toast } from "react-toastify";
import { signup } from "../../service/auth-service";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const navigate = useNavigate();

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
        navigate("/login");
      }).catch((error) => {
        setError(error.message);
      });
  };

  function goBack() {
    navigate("/login");
  }

  return {
    formData,
    error,
    handleChange,
    handleSubmit,
    goBack,
  };
};

import React, { useState } from "react";
import { signup } from "../../service/auth-service";
import {
  BackButton,
  Button,
  Error,
  Form,
  Input,
  InputGroup,
  Label,
  SignupContainer,
  Title,
} from "./signup-styles";

export const SignupPage = () => {
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
    signup(formData.email, formData.username, formData.password).then(() => {
      window.location.href = "/login";
    }).catch((error) => {
      setError(error.message);
    });
  };

  function goBack() {
    window.location.href = "/login";
  }

  return (
    <SignupContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Crie uma conta</Title>
        <InputGroup>
          <Label>E-mail</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Nome de usuário (Nome exibido nas conversas)</Label>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Senha</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <Error>{error}</Error>
        <Button type="submit">Enviar</Button>
        <BackButton type="button" onClick={goBack}>Voltar</BackButton>
      </Form>
    </SignupContainer>
  );
};

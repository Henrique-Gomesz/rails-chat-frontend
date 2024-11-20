import React, { useState } from "react";
import { login } from "../../service/auth-service";
import {
  Container,
  ErrorMessage,
  Form,
  FormContainer,
  Input,
  Label,
  SignUpButton,
  SubmitButton,
  Title,
  WelcomeMessage,
} from "./login.styles";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      window.location.href = "/dashboard";
    } catch (error) {
      setError("E-mail ou senha inválidos");
    }
  };

  function signUp() {
    window.location.href = "/signup";
  }

  return (
    <Container>
      <WelcomeMessage>
        Bem-vindo ao rails chat🛤️
      </WelcomeMessage>
      <FormContainer>
        <Form method="POST" onSubmit={handleSubmit}>
          <Title>Login</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Label>E-mail</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Label>Senha</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <SubmitButton type="submit">Enviar</SubmitButton>
          <SignUpButton type="button" onClick={signUp}>
            Criar uma conta
          </SignUpButton>
        </Form>
      </FormContainer>
    </Container>
  );
};

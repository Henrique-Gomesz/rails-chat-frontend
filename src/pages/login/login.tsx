import React from "react";
import { MainScreen } from "../../components/main-screen/main-screen";
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
import { useLogin } from "./use-login-hook";

export const LoginPage: React.FC = () => {
  const {
    email,
    error,
    handleSubmit,
    onChangeEmail,
    onChangePassword,
    password,
    signUp,
  } = useLogin();

  return (
    <MainScreen>
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
              onChange={onChangeEmail}
              required
            />
            <Label>Senha</Label>
            <Input
              type="password"
              value={password}
              onChange={onChangePassword}
              required
            />
            <SubmitButton type="submit">Enviar</SubmitButton>
            <SignUpButton type="button" onClick={signUp}>
              Criar uma conta
            </SignUpButton>
          </Form>
        </FormContainer>
      </Container>
    </MainScreen>
  );
};

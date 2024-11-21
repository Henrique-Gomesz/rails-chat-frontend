import { MainScreen } from "../../components/main-screen/main-screen";
import { useSignup } from "./signup-hook";
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
} from "./signup.styles";

export const SignupPage = () => {
  const { error, formData, goBack, handleChange, handleSubmit } = useSignup();

  return (
    <MainScreen>
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
    </MainScreen>
  );
};

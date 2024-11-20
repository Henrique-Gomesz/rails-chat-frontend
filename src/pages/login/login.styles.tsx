import styled from "styled-components";

export const Container = styled.div`
width: 100vw;

`;

export const WelcomeMessage = styled.h1`
text-align: center;
`;

export const FormContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  color: #666;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    border-color: #cb141c;
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  color: white;
  background-color: #cb141c;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a5141c;
  }
`;

export const SignUpButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  color: #cb141c;
  background: none;
  border: 1px solid #cb141c;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  margin-bottom: 16px;

  &:hover {
    background-color: #a5141c;
    color: white;
  }

  margin-top: 1rem;
`;

export const ErrorMessage = styled.p`
  color: #cb141c;
  text-align: center;
  margin-bottom: 10px;
`;

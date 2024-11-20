import styled from "styled-components";

export const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
    width: 100vw;
  background: #f3f4f6;
`;

export const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  color: #666;
  display: block;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #c81418;
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  color: white;
   background-color: #c81418;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a5141c
  }
`;

export const BackButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  color: #c81418;
  background: none;
  border: 1px solid #c81418;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #c81418;
    color: white;
  }

  margin-top: 1rem;
`;

export const Error = styled.p`
  color: #c81418;
  text-align: center;
  margin-top: 1rem;
`;

import { jwtDecode } from "jwt-decode";

export const login = async (
  email: string,
  password: string,
): Promise<void> => {
  const response = await fetch("http://127.0.0.1:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  const data = await response.json();
  const decodedToken = jwtDecode(data.token) as { username: string };
  localStorage.setItem("token", data.token);
  localStorage.setItem("username", decodedToken.username);
};

export const signup = async (
  email: string,
  username: string,
  password: string,
) => {
  const response = await fetch("http://127.0.0.1:3000/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: { email, password, username } }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }
};

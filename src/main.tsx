import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { LoginPage } from "./pages/login/login.tsx";
import { MessagesPage } from "./pages/messages/messages.tsx";
import { SignupPage } from "./pages/signup/signup.tsx";
import { ProtectedRoute } from "./components/protected-route.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "*",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/messages",
    element: (
      <ProtectedRoute>
        <MessagesPage />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider
      router={router}
    />
  </StrictMode>,
);

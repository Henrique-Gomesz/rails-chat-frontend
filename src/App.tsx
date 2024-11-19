import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./components/protected-route";
import { LoginPage } from "./pages/login/login";
import { MessagesPage } from "./pages/messages/messages";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

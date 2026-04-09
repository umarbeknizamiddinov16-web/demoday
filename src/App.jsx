import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminPanel from "./AdminPanel.jsx";
import UsersList from "./pages/UsersList.jsx";
import UserDetail from "./pages/UserDetail.jsx";
import UserForm from "./pages/UserForm.jsx";
import NotFound from "./pages/NotFound.jsx";
import Sidebar from "./pages/Sidebar.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );

  const handleLogin = () => {
    localStorage.setItem("adminLoggedIn", "true");
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <LanguageSwitcher />
      <div style={{ display: "flex" }}>
        {loggedIn && <Sidebar onLogout={handleLogout} />}
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? <Navigate to="/admin" replace /> : <Login onLogin={handleLogin} />
              }
            />
            <Route
              path="/admin"
              element={loggedIn ? <AdminPanel /> : <Navigate to="/" replace />}
            />
            <Route
              path="/users"
              element={loggedIn ? <UsersList /> : <Navigate to="/" replace />}
            />
            <Route
              path="/users/:id"
              element={loggedIn ? <UserDetail /> : <Navigate to="/" replace />}
            />
            <Route
              path="/add"
              element={loggedIn ? <UserForm /> : <Navigate to="/" replace />}
            />
            <Route
              path="/edit/:id"
              element={loggedIn ? <UserForm /> : <Navigate to="/" replace />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
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
import { ToastProvider } from "./ToastProvider.jsx";
import { RoleProvider } from "./RoleContext.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

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
    localStorage.removeItem("userRole");
    localStorage.removeItem("currentUser");
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <RoleProvider>
        <ToastProvider>
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
                  element={
                    loggedIn ? (
                      <ProtectedRoute element={<AdminPanel />} requiredPermission="viewItems" />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
                <Route
                  path="/users"
                  element={
                    loggedIn ? (
                      <ProtectedRoute element={<UsersList />} requiredPermission="viewUsers" />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
                <Route
                  path="/users/:id"
                  element={
                    loggedIn ? (
                      <ProtectedRoute element={<UserDetail />} requiredPermission="viewUsers" />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
                <Route
                  path="/add"
                  element={
                    loggedIn ? (
                      <ProtectedRoute element={<UserForm />} requiredPermission="editUsers" />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
                <Route
                  path="/edit/:id"
                  element={
                    loggedIn ? (
                      <ProtectedRoute element={<UserForm />} requiredPermission="editUsers" />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </ToastProvider>
      </RoleProvider>
    </BrowserRouter>
  );
}
import React from "react";
import { Navigate } from "react-router-dom";
import { useRole } from "./RoleContext";

export const ProtectedRoute = ({ element, requiredPermission, requiredRole }) => {
  const { userRole, hasPermission } = useRole();

  if (!userRole) {
    return element;
  }

  if (requiredRole && userRole !== requiredRole) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>access denied</h2>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Доступ запрещён</h2>
        <p>У вас нет прав для просмотра этой страницы</p>
      </div>
    );
  }

  return element;
};

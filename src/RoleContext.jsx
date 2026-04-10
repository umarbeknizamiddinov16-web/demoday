import React, { createContext, useContext, useState, useMemo } from "react";

const RoleContext = createContext();

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within RoleProvider");
  }
  return context;
};

const PERMISSIONS = {
  admin: {
    viewUsers: true,
    editUsers: true,
    deleteUsers: true,
    viewItems: true,
    editItems: true,
    deleteItems: true,
    manageRoles: true,
    exportData: true,
    viewAnalytics: true,
    editAdmins: true,
  },
  editor: {
    viewUsers: true,
    editUsers: true,
    deleteUsers: false,
    viewItems: true,
    editItems: true,
    deleteItems: false,
    manageRoles: false,
    exportData: true,
    viewAnalytics: false,
    editAdmins: false,
  },
  viewer: {
    viewUsers: true,
    editUsers: false,
    deleteUsers: false,
    viewItems: true,
    editItems: false,
    deleteItems: false,
    manageRoles: false,
    exportData: false,
    viewAnalytics: false,
    editAdmins: false,
  },
};

export const RoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole") || null;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  });

  const hasPermission = (permission) => {
    if (!userRole) return false;
    return PERMISSIONS[userRole]?.[permission] || false;
  };

  const canView = (resource) => {
    return hasPermission(`view${resource}`);
  };

  const canEdit = (resource) => {
    return hasPermission(`edit${resource}`);
  };

  const canDelete = (resource) => {
    return hasPermission(`delete${resource}`);
  };

  const setRole = (role, user) => {
    localStorage.setItem("userRole", role);
    localStorage.setItem("currentUser", JSON.stringify(user));
    setUserRole(role);
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("currentUser");
    setUserRole(null);
    setCurrentUser(null);
  };

  const value = useMemo(
    () => ({
      userRole,
      currentUser,
      hasPermission,
      canView,
      canEdit,
      canDelete,
      setRole,
      logout,
      PERMISSIONS,
    }),
    [userRole, currentUser]
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

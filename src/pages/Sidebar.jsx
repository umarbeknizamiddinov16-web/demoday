import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Sidebar({ onLogout }) {
  const { t } = useTranslation();

  return (
    <div className="sidebar">
      <h1>{t("adminPanel")}</h1>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        <NavLink to="/admin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          🏠 {t("sidebarHome")}
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          👥 {t("sidebarUsers")}
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          ➕ {t("sidebarAdd")}
        </NavLink>
      </nav>
      {onLogout && (
        <button onClick={onLogout} className="btn btn-primary" style={{ marginTop: '24px' }}>
          {t("logout")}
        </button>
      )}
    </div>
  );
}

export default Sidebar;
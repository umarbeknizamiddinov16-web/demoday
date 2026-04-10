import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRole } from '../RoleContext.jsx';

function Sidebar({ onLogout }) {
  const { t } = useTranslation();
  const { currentUser, userRole, logout } = useRole();
  const [helpVisible, setHelpVisible] = useState(false);

  const refreshPage = () => {
    window.location.reload();
  };

  const toggleHelp = () => {
    setHelpVisible((visible) => !visible);
  };

  const handleLogout = () => {
    logout();
    onLogout?.();
  };

  const getRoleLabel = () => {
    switch (userRole) {
      case 'admin':
        return 'Администратор';
      case 'editor':
        return 'Редактор';
      case 'viewer':
        return 'Просмотр';
      default:
        return '';
    }
  };

  const getRoleColor = () => {
    switch (userRole) {
      case 'admin':
        return '#fee2e2';
      case 'editor':
        return '#fef3c7';
      case 'viewer':
        return '#e0f2fe';
      default:
        return '#f3f4f6';
    }
  };

  const getRoleTextColor = () => {
    switch (userRole) {
      case 'admin':
        return '#991b1b';
      case 'editor':
        return '#92400e';
      case 'viewer':
        return '#0c4a6e';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="sidebar">
      <h1>{t("adminPanel")}</h1>
      
      {currentUser && (
        <div style={{
          padding: '12px',
          background: '#f3f4f6',
          borderRadius: '8px',
          marginTop: '16px',
          marginBottom: '16px'
        }}>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Вход как:</div>
          <div style={{ fontWeight: '600', marginBottom: '6px' }}>{currentUser.name}</div>
          <div style={{
            fontSize: '11px',
            padding: '4px 8px',
            background: getRoleColor(),
            color: getRoleTextColor(),
            borderRadius: '4px',
            display: 'inline-block',
            fontWeight: '500'
          }}>
            {getRoleLabel()}
          </div>
        </div>
      )}

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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
        <button type="button" className="nav-action" onClick={refreshPage}>
          🔄 {t("sidebarRefresh")}
        </button>
        <button type="button" className="nav-action" onClick={toggleHelp}>
          ❓ {t("sidebarHelp")}
        </button>
      </div>
      {helpVisible && (
        <div style={{ marginTop: '14px', padding: '14px', background: 'rgba(224, 231, 255, 0.5)', borderRadius: '14px', color: 'var(--text)' }}>
          <strong>{t("sidebarHelpTitle")}</strong>
          <p style={{ margin: '8px 0 0 0', lineHeight: 1.5, color: 'var(--muted)' }}>
            {t("sidebarHelpText")}
          </p>
        </div>
      )}
      {onLogout && (
        <button onClick={handleLogout} className="btn btn-primary" style={{ marginTop: '24px' }}>
          {t("logout")}
        </button>
      )}
    </div>
  );
}

export default Sidebar;
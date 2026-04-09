import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Sidebar({ onLogout }) {
  const { t } = useTranslation();
  const [helpVisible, setHelpVisible] = useState(false);

  const refreshPage = () => {
    window.location.reload();
  };

  const toggleHelp = () => {
    setHelpVisible((visible) => !visible);
  };

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
        <button onClick={onLogout} className="btn btn-primary" style={{ marginTop: '24px' }}>
          {t("logout")}
        </button>
      )}
    </div>
  );
}

export default Sidebar;
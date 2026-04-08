import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar({ onLogout }) {
  return (
    <div className="sidebar" style={{ width: '250px', height: '100vh', background: '#f8f9fa', padding: '20px', borderRight: '1px solid #ddd' }}>
      <h1>Admin Panel</h1>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        <NavLink to="/admin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          🏠 Home
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          👥 Users
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          ➕ Add User
        </NavLink>
      </nav>
      {onLogout && (
        <button
          onClick={onLogout}
          style={{
            marginTop: '24px',
            width: '100%',
            padding: '10px 14px',
            borderRadius: '10px',
            border: 'none',
            background: '#ef4444',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Выйти
        </button>
      )}
    </div>
  );
}

export default Sidebar;
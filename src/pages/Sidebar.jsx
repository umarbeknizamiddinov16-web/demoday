import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar" style={{ width: '250px', height: '100vh', background: '#f8f9fa', padding: '20px', borderRight: '1px solid #ddd' }}>
      <h1>Admin Panel</h1>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          🏠 Home
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          👥 Users
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          ➕ Add User
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
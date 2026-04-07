import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Добро пожаловать! 👋</h1>
      <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.1rem' }}>
        Это простое и удобное приложение для управления списком пользователей.
        Добавляйте, редактируйте и ищите нужных людей в пару кликов.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/users" className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>
          Перейти к списку
        </Link>
        <Link to="/add" className="btn" style={{ background: '#e0e7ff', color: '#4338ca', padding: '0.8rem 2rem' }}>
          Добавить нового
        </Link>
      </div>
    </div>
  );
}
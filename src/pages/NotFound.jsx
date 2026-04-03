import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '5rem 0' }}>
      <h1 style={{ fontSize: '5rem', margin: 0, color: '#4f46e5' }}>404</h1>
      <p style={{ fontSize: '1.5rem', color: '#333' }}>Упс! Страница не найдена</p>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Похоже, вы зашли куда-то не туда.</p>
      <Link to="/" className="btn btn-primary">Вернуться на главную</Link>
    </div>
  );
}
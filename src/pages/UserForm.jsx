import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UserForm() {
  const [user, setUser] = useState({ name: "", email: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/users/${id}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(() => navigate("/404"));
    }
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id ? `http://localhost:3001/users/${id}` : "http://localhost:3001/users";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    navigate("/users");
  };

  return (
    <div className="container">
      <h2>{id ? "Редактировать профиль" : "Новый пользователь"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Имя</label>
        <input
          className="input-field"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
        <label>Email</label>
        <input
          type="email"
          className="input-field"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <button type="submit" className="btn btn-primary">Сохранить</button>
        <button type="button" onClick={() => navigate(-1)} style={{ marginLeft: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>Отмена</button>
      </form>
    </div>
  );
}
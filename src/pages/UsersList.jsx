import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
      const ok = window.confirm("Are you sure you want to delete this user?");
      if (ok) {
        await fetch(`http://localhost:3001/users/${id}`, { method: "DELETE" });
        setUsers(users.filter((u) => u.id !== id));
      }
  };
    

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Пользователи</h1>
        <Link to="/add" className="btn btn-primary">+ Добавить</Link>
      </div>

      <input
        className="input-field"
        placeholder="Поиск по списку..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="users-list">
        {filtered.map((u) => (
          <div key={u.id} className="user-card">
            <div className="user-info">
              <h3>{u.name}</h3>
              <p>{u.email}</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to={`/users/${u.id}`} className="btn btn-secondary">Info</Link>
              <Link to={`/edit/${u.id}`} className="btn btn-secondary" style={{color: '#b45309'}}>Edit</Link>
              <button onClick={() => handleDelete(u.id)} className="btn btn-secondary" style={{color: '#dc2626'}}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
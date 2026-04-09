import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function UsersList() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load users");
        return res.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setUsers(list);
        localStorage.setItem("users", JSON.stringify(list));
      })
      .catch((err) => {
        setError(t("loadError"));
        const local = JSON.parse(localStorage.getItem("users") || "[]");
        setUsers(local);
      })
      .finally(() => setLoading(false));
  }, [t]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const filtered = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm(t("deleteConfirmation"))) {
      try {
        const response = await fetch(`http://localhost:3001/users/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete");
        setUsers(users.filter((u) => u.id !== id));
      } catch (err) {
        alert(t("deleteError"));
      }
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1>{t("usersList")}</h1>
          <p style={{ color: '#64748b', margin: 0 }}>{t("userCount", { count: filtered.length })}</p>
        </div>
        <Link to="/add" className="btn btn-primary">{t("addNew")}</Link>
      </div>

      <input
        className="input-field"
        placeholder={t("searchPlaceholder")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="users-list">
        {loading ? (
          <p>{t("loading")}</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : filtered.length > 0 ? (
          filtered.map((u) => (
            <div key={u.id} className="user-card">
              <div className="user-info">
                <h3>{u.name}</h3>
                <p>{u.email}</p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link to={`/users/${u.id}`} className="btn btn-secondary">{t("userDetails")}</Link>
                <Link to={`/edit/${u.id}`} className="btn btn-secondary" style={{ color: '#b45309' }}>{t("edit")}</Link>
                <button onClick={() => handleDelete(u.id)} className="btn btn-secondary" style={{ color: '#dc2626' }}>{t("delete")}</button>
              </div>
            </div>
          ))
        ) : (
          <p>{t("noUsers")}</p>
        )}
      </div>
    </div>
  );
}

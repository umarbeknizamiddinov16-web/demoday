import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useToast } from "../ToastProvider.jsx";

export default function UserForm() {
  const { t } = useTranslation();
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

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
    setLoading(true);
    setError("");
    try {
      const method = id ? "PUT" : "POST";
      const url = id ? `http://localhost:3001/users/${id}` : "http://localhost:3001/users";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to save user");
      }
addToast(t("userSaved"), "success");
      
      navigate("/users");
    } catch (err) {
      addToast(t("saveError"), "error");
      setError(t("saveError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>{id ? t("editProfile") : t("newUser")}</h2>
      <form onSubmit={handleSubmit}>
        <label>{t("name")}</label>
        <input
          className="input-field"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
        <label>{t("email")}</label>
        <input
          type="email"
          className="input-field"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? t("saving") : t("save")}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-ghost"
          style={{ marginLeft: '10px' }}
        >
          {t("cancel")}
        </button>
      </form>
    </div>
  );
}
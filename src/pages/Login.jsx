import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_EMAIL = "admin@example.com";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email.trim().toLowerCase() === ADMIN_EMAIL) {
      onLogin?.();
      navigate("/admin");
      return;
    }

    setError("Неверный email. Попробуйте admin@example.com");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "#f3f4f6",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          padding: "32px",
          borderRadius: "24px",
          background: "#ffffff",
          boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
        }}
      >
        <h1 style={{ marginBottom: "16px" }}>Вход в админ-панель</h1>
        <p style={{ marginBottom: "24px", color: "#4b5563" }}>
          Введите правильный email, чтобы получить доступ к панели администратора.
        </p>

        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
            Email
          </label>
          <input
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              marginBottom: "16px",
              outline: "none",
            }}
            required
          />

          {error && (
            <div style={{ color: "#b91c1c", marginBottom: "16px" }}>{error}</div>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px 18px",
              borderRadius: "12px",
              border: "none",
              background: "#4338ca",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

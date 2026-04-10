import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRole } from "../RoleContext";

const ADMIN_EMAIL = "admin@example.com";
const MOCK_2FA_CODE = "123456";

export default function Login({ onLogin }) {
  const { t } = useTranslation();
  const { setRole } = useRole();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [code, setCode] = useState("");
  const [step, setStep] = useState("select");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch("http://localhost:3002/users");
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        const saved = JSON.parse(localStorage.getItem("users") || "[]");
        setUsers(saved);
      }
    };
    loadUsers();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setStep("code");
    setError("");
  };

  const handleCodeSubmit = (event) => {
    event.preventDefault();

    if (code === MOCK_2FA_CODE && selectedUser) {
      setRole(selectedUser.role, selectedUser);
      onLogin?.();
      navigate("/admin");
    } else {
      setError(t("invalidCode"));
    }
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
          maxWidth: "520px",
          padding: "32px",
          borderRadius: "24px",
          background: "#ffffff",
          boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
        }}
      >
        <h1 style={{ marginBottom: "16px" }}>{t("loginTitle")}</h1>
        <p style={{ marginBottom: "24px", color: "#4b5563" }}>
          {step === "select"
            ? "Выберите пользователя для входа"
            : "Введите код подтверждения"}
        </p>

        {step === "select" ? (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              {users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    border: "2px solid #e5e7eb",
                    background: "#ffffff",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#3b82f6";
                    e.currentTarget.style.background = "#f0f9ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                    e.currentTarget.style.background = "#ffffff";
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: "4px" }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>
                    {user.email}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      marginTop: "6px",
                      padding: "4px 8px",
                      background:
                        user.role === "admin"
                          ? "#fee2e2"
                          : user.role === "editor"
                          ? "#fef3c7"
                          : "#e0f2fe",
                      color:
                        user.role === "admin"
                          ? "#991b1b"
                          : user.role === "editor"
                          ? "#92400e"
                          : "#0c4a6e",
                      borderRadius: "4px",
                      display: "inline-block",
                      fontWeight: "500",
                    }}
                  >
                    {user.role === "admin"
                      ? "Администратор"
                      : user.role === "editor"
                      ? "Редактор"
                      : "Просмотр"}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleCodeSubmit}>
            <div
              style={{
                padding: "16px",
                background: "#f3f4f6",
                borderRadius: "12px",
                marginBottom: "16px",
              }}
            >
              <div style={{ fontSize: "14px", color: "#6b7280" }}>
                Вход как:
              </div>
              <div style={{ fontWeight: 600, fontSize: "16px" }}>
                {selectedUser?.name}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginTop: "4px",
                }}
              >
                {selectedUser?.email}
              </div>
            </div>

            <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
              {t("verificationCode")}
            </label>
            <input
              type="text"
              placeholder="123456"
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
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
              autoFocus
            />

            {error && (
              <div style={{ color: "#b91c1c", marginBottom: "16px" }}>{error}</div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", padding: "12px 18px", fontWeight: 600 }}
            >
              {t("verify")}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("select");
                setCode("");
                setError("");
                setSelectedUser(null);
              }}
              style={{
                width: "100%",
                marginTop: "12px",
                padding: "12px 18px",
                background: "none",
                border: "1px solid #d1d5db",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              {t("back")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

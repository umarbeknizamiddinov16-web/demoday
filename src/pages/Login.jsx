import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ADMIN_EMAIL = "admin@example.com";
const MOCK_2FA_CODE = "123456";

export default function Login({ onLogin }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState("email");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = (event) => {
    event.preventDefault();

    if (email.trim().toLowerCase() === ADMIN_EMAIL) {
      setStep("code");
      setError("");
    } else {
      setError(t("invalidEmail"));
    }
  };

  const handleCodeSubmit = (event) => {
    event.preventDefault();

    if (code === MOCK_2FA_CODE) {
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
          maxWidth: "480px",
          padding: "32px",
          borderRadius: "24px",
          background: "#ffffff",
          boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
        }}
      >
        <h1 style={{ marginBottom: "16px" }}>{t("loginTitle")}</h1>
        <p style={{ marginBottom: "24px", color: "#4b5563" }}>
          {step === "email" ? t("loginDescription") : t("enterCode")}
        </p>

        {step === "email" ? (
          <form onSubmit={handleEmailSubmit}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
              {t("email")}
            </label>
            <input
              type="email"
              placeholder={t("placeholderEmail")}
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
              className="btn btn-primary"
              style={{ width: "100%", padding: "12px 18px", fontWeight: 600 }}
            >
              {t("sendCode")}
            </button>
          </form>
        ) : (
          <form onSubmit={handleCodeSubmit}>
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
              onClick={() => setStep("email")}
              style={{ width: "100%", marginTop: "12px", padding: "12px 18px", background: "none", border: "1px solid #d1d5db", borderRadius: "12px", cursor: "pointer" }}
            >
              {t("back")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

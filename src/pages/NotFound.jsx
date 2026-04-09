import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="container" style={{ textAlign: 'center', padding: '5rem 0' }}>
      <h1 style={{ fontSize: '5rem', margin: 0, color: '#4f46e5' }}>404</h1>
      <p style={{ fontSize: '1.5rem', color: '#333' }}>{t("notFound")}</p>
      <p style={{ color: '#666', marginBottom: '2rem' }}>{t("notFoundDescription")}</p>
      <Link to="/" className="btn btn-primary">{t("backToHome")}</Link>
    </div>
  );
}
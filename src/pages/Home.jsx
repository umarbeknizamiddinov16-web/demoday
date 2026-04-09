import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/users" className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>
          {t("goToList")}
        </Link>
        <Link to="/add" className="btn" style={{ background: '#e0e7ff', color: '#4338ca', padding: '0.8rem 2rem' }}>
          {t("addNew")}
        </Link>
      </div>
    </div>
  );
}
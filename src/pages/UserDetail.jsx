import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function UserDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => navigate("/404"));
  }, [id, navigate]);

  if (loading) return <div className="container">{t("loading")}</div>;
  if (!user) return null;

  return (
    <div className="container">
      <button
        onClick={() => navigate(-1)}
        style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', marginBottom: '1rem' }}
      >
        ← {t("backToList")}
      </button>
      
      <div style={{ borderTop: '1px solid rgba(226, 232, 240, 1)', paddingTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ width: '64px', height: '64px', background: '#4f46e5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {user.name?.[0]}
          </div>
          <div>
            <h1 style={{ margin: 0 }}>{user.name}</h1>
            <p style={{ color: '#666' }}>{user.email}</p>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          <Link to={`/edit/${user.id}`} className="btn btn-secondary" style={{ background: '#fef3c7', color: '#92400e' }}>
            {t("editProfile")}
          </Link>
        </div>
      </div>
    </div>
  );
}
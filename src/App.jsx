import { useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const loginEmail = (email) => {
    if (email === "admin@gmail.com") {
      setUser({ email });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loginEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}

function EmailGate() {
  const { loginEmail } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = new FormData(e.target).get("email");

    if (loginEmail(email)) navigate("/dashboard");
    else setError("Неправильный email");
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#111" }}>
      <form onSubmit={handleSubmit} style={{ background: "#1e1e2f", padding: 30, borderRadius: 12, color: "white", width: 300 }}>
        <h2 style={{ marginBottom: 20 }}>Admin Login</h2>
        <input name="email" placeholder="Email" style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "none" }} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button style={{ width: "100%", padding: 10, background: "#4f46e5", color: "white", border: "none", borderRadius: 6 }}>Login</button>
      </form>
    </div>
  );
}


function Home() {
  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 20 }}>
        {[
          { title: "Users", value: 120 },
          { title: "Products", value: 80 },
          { title: "Orders", value: 45 }
        ].map((card) => (
          <div key={card.title} style={{ background: "#1e1e2f", color: "white", padding: 20, borderRadius: 12 }}>
            <h3>{card.title}</h3>
            <p style={{ fontSize: 24 }}>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Users() {
  return <h2>Users management</h2>;
}
function Products() {
  return <h2>Products management</h2>;
}
function Settings() {
  return <h2>Settings</h2>;
}


function Layout({ children }) {
  const { logout } = useAuth();

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0f172a", color: "white" }}>
      
      <div style={{ width: 220, background: "#1e293b", padding: 20 }}>
        <h2 style={{ marginBottom: 20 }}>Admin</h2>
        <nav>
          <div><Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link></div>
          <div><Link to="/dashboard/users" style={{ color: "white" }}>Users</Link></div>
          <div><Link to="/dashboard/products" style={{ color: "white" }}>Products</Link></div>
          <div><Link to="/dashboard/settings" style={{ color: "white" }}>Settings</Link></div>
        </nav>
        <button onClick={logout} style={{ marginTop: 20 }}>Logout</button>
      </div>

      
      <div style={{ flex: 1, padding: 20 }}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmailGate />} />

          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="users" element={<Users />} />
                    <Route path="products" element={<Products />} />
                    <Route path="settings" element={<Settings />} />
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import UsersList from "./pages/UsersList.jsx";
import UserDetail from "./pages/UserDetail.jsx";
import UserForm from "./pages/UserForm.jsx";
import NotFound from "./pages/NotFound.jsx";
import Sidebar from "./pages/Sidebar.jsx";

export default function App() {
  return (
    <BrowserRouter>
      {/* Если Sidebar должен быть на всех страницах, его нужно ставить СНАРУЖИ Routes */}
      <div style={{ display: 'flex' }}>
        <Sidebar /> 
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/add" element={<UserForm />} />
            <Route path="/edit/:id" element={<UserForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
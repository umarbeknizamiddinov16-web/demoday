import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AdminPanel from "./AdminPanel.jsx";
import ItemsList from "./ItemList.jsx";


function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Список предметов</h1>
      <Link to="/admin">Перейти в панель администратора</Link>
      <ItemsList />
    </div>
  );
}

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
  );
}
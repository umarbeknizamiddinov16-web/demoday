// Home.jsx
import React from "react";

function Home() {
  const cards = [
    { title: "Users", value: 120, color: "#3b82f6" },
    { title: "Products", value: 80, color: "#22c55e" },
    { title: "Orders", value: 45, color: "#f59e0b" }
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Dashboard</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 20
      }}>
        {cards.map((card) => (
          <div key={card.title} style={{
            background: "#1e293b",
            padding: 20,
            borderRadius: 12,
            borderLeft: `5px solid ${card.color}`,
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
          }}>
            <h4 style={{ margin: 0, opacity: 0.8 }}>{card.title}</h4>
            <p style={{ fontSize: 28, marginTop: 10 }}>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
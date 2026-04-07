import React from "react";

const items = [
  { id: 1, name: "Математика", teacher: "Иванов", type: "Школьный" },
  { id: 2, name: "Физика", teacher: "Петров", type: "Школьный" },
];

export default function ItemsList() {
  return (
    <div style={{ marginTop: 20 }}>
      <h2>Список предметов</h2>
      <ul>
        {items.map(i => (
          <li key={i.id}>{i.name} — {i.teacher} ({i.type})</li>
        ))}
      </ul>
    </div>
  );
}
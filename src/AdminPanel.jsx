import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm.jsx";
import { useTranslation } from "react-i18next";

const initialItems = [
  { id: 1, name: "Математика", teacher: "Иванов", type: "Школьный" },
  { id: 2, name: "Физика", teacher: "Петров", type: "Школьный" },
];

export default function AdminPanel() {
  const { t } = useTranslation();
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("adminItems");
    return saved ? JSON.parse(saved) : initialItems;
  });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    localStorage.setItem("adminItems", JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    item.id = Date.now();
    setItems([...items, item]);
  };

  const updateItem = (updated) => {
    setItems(items.map((i) => (i.id === updated.id ? updated : i)));
    setEditingItem(null);
  };

  const deleteItem = (id) => {
    if (window.confirm(t("deleteConfirmation"))) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{t("adminPanel")}</h2>
      <p style={{ color: '#64748b', marginBottom: 16 }}>{t("itemsCount", { count: items.length })}</p>
      <ItemForm
        key={editingItem ? editingItem.id : "new"}
        onSubmit={editingItem ? updateItem : addItem}
        editingItem={editingItem}
        onCancel={() => setEditingItem(null)}
      />
      <table border="1" cellPadding="10" style={{ marginTop: 20, width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#eef2ff' }}>
            <th>{t("name")}</th>
            <th>{t("teacher")}</th>
            <th>{t("type")}</th>
            <th>{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              <td>{i.name}</td>
              <td>{i.teacher}</td>
              <td>{i.type}</td>
              <td>
                <button className="btn btn-secondary" onClick={() => setEditingItem(i)}>{t("edit")}</button>{" "}
                <button className="btn btn-ghost" onClick={() => deleteItem(i.id)} style={{ color: '#dc2626' }}>{t("delete")}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

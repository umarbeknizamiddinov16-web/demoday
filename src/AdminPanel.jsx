import React, { useState } from "react";
import ItemForm from "./ItemForm.jsx";
import { useTranslation } from "react-i18next";

const initialItems = [
  { id: 1, name: "Математика", teacher: "Иванов", type: "Школьный" },
  { id: 2, name: "Физика", teacher: "Петров", type: "Школьный" },
];

export default function AdminPanel() {
  const { t } = useTranslation();
  const [items, setItems] = useState(initialItems);
  const [editingItem, setEditingItem] = useState(null);

  const addItem = (item) => {
    item.id = Date.now();
    setItems([...items, item]);
  };

  const updateItem = (updated) => {
    setItems(items.map(i => (i.id === updated.id ? updated : i)));
    setEditingItem(null);
  };

  const deleteItem = (id) => {
    if (window.confirm(t("confirmDelete"))) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{t("adminPanel")}</h2>
      <ItemForm
        key={editingItem ? editingItem.id : "new"}
        onSubmit={editingItem ? updateItem : addItem}
        editingItem={editingItem}
        onCancel={() => setEditingItem(null)}
      />
      <table border="1" cellPadding="10" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>{t("name")}</th>
            <th>{t("teacher")}</th>
            <th>{t("type")}</th>
            <th>{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {items.map(i => (
            <tr key={i.id}>
              <td>{i.name}</td>
              <td>{i.teacher}</td>
              <td>{i.type}</td>
              <td>
                <button onClick={() => setEditingItem(i)}>{t("edit")}</button>{" "}
                <button onClick={() => deleteItem(i.id)}>{t("delete")}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
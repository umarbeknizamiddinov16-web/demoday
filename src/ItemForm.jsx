import React, { useState, useEffect } from "react";

export default function ItemForm({ onSubmit, editingItem, onCancel }) {
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [type, setType] = useState("Школьный");

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setTeacher(editingItem.teacher);
      setType(editingItem.type);
    } else {
      setName("");
      setTeacher("");
      setType("Школьный");
    }
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !teacher) {
      alert("Заполните все поля!");
      return;
    }
    onSubmit({ id: editingItem?.id, name, teacher, type });
    setName("");
    setTeacher("");
    setType("Школьный");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>{editingItem ? "Редактировать" : "Добавить"} предмет</h3>
      <input
        type="text"
        placeholder="Название предмета"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input
        type="text"
        placeholder="Учитель / Ответственный"
        value={teacher}
        onChange={e => setTeacher(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <select value={type} onChange={e => setType(e.target.value)} style={{ marginRight: 10 }}>
        <option>Школьный</option>
        <option>Внеурочный</option>
        <option>Дополнительный</option>
      </select>
      <button type="submit">{editingItem ? "Сохранить" : "Добавить"}</button>
      {editingItem && <button type="button" onClick={onCancel} style={{ marginLeft: 10 }}>Отмена</button>}
    </form>
  );
}
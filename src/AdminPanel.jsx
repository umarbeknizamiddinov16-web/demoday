import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm.jsx";
import { useTranslation } from "react-i18next";

const initialItems = [
  { id: 1, name: "Математика", teacher: "Иванов", type: "Школьный", description: "Алгебраическая логика и геометрия", status: "Активный" },
  { id: 2, name: "Физика", teacher: "Петров", type: "Школьный", description: "Механика, оптика и электродинамика", status: "Активный" },
];

export default function AdminPanel() {
  const { t } = useTranslation();
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("adminItems");
    return saved ? JSON.parse(saved) : initialItems;
  });
  const [editingItem, setEditingItem] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [actionLog, setActionLog] = useState([]);

  useEffect(() => {
    localStorage.setItem("adminItems", JSON.stringify(items));
  }, [items]);

  const addLog = (message) => {
    setActionLog((prev) => [
      { id: Date.now(), message, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 9),
    ]);
  };

  const addItem = (item) => {
    item.id = Date.now();
    setItems([...items, item]);
    addLog(t("actionAdded", { name: item.name }));
  };

  const updateItem = (updated) => {
    setItems(items.map((i) => (i.id === updated.id ? updated : i)));
    setEditingItem(null);
    addLog(t("actionUpdated", { name: updated.name }));
  };

  const deleteItem = (id) => {
    const item = items.find((i) => i.id === id);
    if (window.confirm(t("deleteConfirmation"))) {
      setItems(items.filter((item) => item.id !== id));
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
      addLog(t("actionDeleted", { name: item?.name || "item" }));
    }
  };

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === filteredItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredItems.map((item) => item.id));
    }
  };

  const deleteSelected = () => {
    if (!selectedIds.length) return;
    if (window.confirm(t("deleteSelectedConfirmation", { count: selectedIds.length }))) {
      setItems(items.filter((item) => !selectedIds.includes(item.id)));
      addLog(t("actionDeletedMultiple", { count: selectedIds.length }));
      setSelectedIds([]);
    }
  };

  const clearAllItems = () => {
    if (window.confirm(t("deleteAllConfirmation"))) {
      setItems([]);
      setSelectedIds([]);
      addLog(t("actionClearedAll"));
    }
  };

  const resetItems = () => {
    setItems(initialItems);
    setSelectedIds([]);
    addLog(t("actionReset"));
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.teacher.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType === "all" || item.type === filterType;
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>{t("adminPanel")}</h2>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20, alignItems: 'center' }}>
        <button className="btn btn-secondary" onClick={clearAllItems}>{t("clearAll")}</button>
        <button className="btn btn-secondary" onClick={resetItems}>{t("resetSubjects")}</button>
        <div style={{ marginLeft: 'auto', alignSelf: 'center', color: 'var(--muted)' }}>
          {t("itemsFound", { count: filteredItems.length })}
        </div>
      </div>

      <ItemForm
        key={editingItem ? editingItem.id : "new"}
        onSubmit={editingItem ? updateItem : addItem}
        editingItem={editingItem}
        onCancel={() => setEditingItem(null)}
      />

      <div style={{ marginTop: 20, marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder={t("searchSubjects")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field"
          style={{ width: '100%', maxWidth: '320px' }}
        />
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="input-field" style={{ maxWidth: '220px' }}>
          <option value="all">{t("filterAllTypes")}</option>
          <option value={t("schoolType")}>{t("schoolType")}</option>
          <option value={t("extracurricularType")}>{t("extracurricularType")}</option>
          <option value={t("additionalType")}>{t("additionalType")}</option>
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input-field" style={{ maxWidth: '220px' }}>
          <option value="all">{t("filterAllStatus")}</option>
          <option value={t("statusActive")}>{t("statusActive")}</option>
          <option value={t("statusArchived")}>{t("statusArchived")}</option>
        </select>
      </div>

      <table border="1" cellPadding="10" style={{ marginTop: 20, width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#eef2ff' }}>
            <th><input type="checkbox" checked={selectedIds.length === filteredItems.length && filteredItems.length > 0} onChange={selectAll} /></th>
            <th>{t("name")}</th>
            <th>{t("teacher")}</th>
            <th>{t("subjectDescription")}</th>
            <th>{t("status")}</th>
            <th>{t("type")}</th>
            <th>{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((i) => (
            <tr key={i.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(i.id)}
                  onChange={() => toggleSelection(i.id)}
                />
              </td>
              <td>{i.name}</td>
              <td>{i.teacher}</td>
              <td>{i.description}</td>
              <td>{i.status}</td>
              <td>{i.type}</td>
              <td>
                <button className="btn btn-secondary" onClick={() => setEditingItem(i)}>{t("edit")}</button>{" "}
                <button className="btn btn-ghost" onClick={() => deleteItem(i.id)} style={{ color: '#dc2626' }}>{t("delete")}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 20, padding: 16, background: 'rgba(224, 231, 255, 0.4)', borderRadius: 12 }}>
        <h3 style={{ margin: 0, marginBottom: 10 }}>{t("actionLog")}</h3>
        {actionLog.length ? (
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)' }}>
            {actionLog.map((log) => (
              <li key={log.id} style={{ marginBottom: 6 }}>
                <strong>{log.time}</strong>: {log.message}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ margin: 0, color: 'var(--muted)' }}>{t("actionLogEmpty")}</p>
        )}
      </div>
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-start' }}>
        <button className="btn btn-secondary" onClick={deleteSelected} disabled={!selectedIds.length}>
          {t("deleteSelected", { count: selectedIds.length })}
        </button>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useCallback } from "react";
import ItemForm from "./ItemForm.jsx";
import { useTranslation } from "react-i18next";
import { useRole } from "./RoleContext.jsx";

const initialItems = [
  { id: 1, name: "Математика", teacher: "Иванов", type: "Школьный", description: "Алгебраическая логика и геометрия", status: "Активный" },
  { id: 2, name: "Физика", teacher: "Петров", type: "Школьный", description: "Механика, оптика и электродинамика", status: "Активный" },
];

export default function AdminPanel() {
  const { t } = useTranslation();
  const { userRole, currentUser, canEdit, canDelete } = useRole();
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("adminItems");
    return saved ? JSON.parse(saved) : initialItems;
  });
  const [users, setUsers] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [actionLog, setActionLog] = useState([]);
  const [showRoleManager, setShowRoleManager] = useState(false);

  useEffect(() => {
    localStorage.setItem("adminItems", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch("http://localhost:3002/users");
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        const saved = JSON.parse(localStorage.getItem("users") || "[]");
        setUsers(saved);
      }
    };
    loadUsers();
  }, []);

  const addLog = useCallback((message) => {
    setActionLog((prev) => [
      { id: Date.now(), message, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 9),
    ]);
  }, []);

  const addItem = useCallback((item) => {
    item.id = Date.now();
    setItems((prevItems) => [...prevItems, item]);
    addLog(t("actionAdded", { name: item.name }));
  }, [addLog, t]);

  const updateItem = useCallback((updated) => {
    setItems((prevItems) => prevItems.map((i) => (i.id === updated.id ? updated : i)));
    setEditingItem(null);
    addLog(t("actionUpdated", { name: updated.name }));
  }, [addLog, t]);

  const deleteItem = useCallback((id) => {
    setItems((prevItems) => {
      const item = prevItems.find((i) => i.id === id);
      if (window.confirm(t("deleteConfirmation"))) {
        addLog(t("actionDeleted", { name: item?.name || "item" }));
        return prevItems.filter((item) => item.id !== id);
      }
      return prevItems;
    });
    setSelectedIds((prevIds) => prevIds.filter((selectedId) => selectedId !== id));
  }, [addLog, t]);

  const updateUserRole = useCallback((userId, newRole) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((u) =>
        u.id === userId ? { ...u, role: newRole } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      addLog(`Updated role for user to ${newRole}`);
      return updatedUsers;
    });
  }, [addLog]);

  const toggleSelection = useCallback((id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds((prev) => {
      const filtered = items.filter((item) => {
        const matchesSearch =
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.teacher.toLowerCase().includes(search.toLowerCase()) ||
          item.type.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase());

        const matchesType = filterType === "all" || item.type === filterType;
        const matchesStatus = filterStatus === "all" || item.status === filterStatus;

        return matchesSearch && matchesType && matchesStatus;
      });

      return prev.length === filtered.length ? [] : filtered.map((item) => item.id);
    });
  }, [items, search, filterType, filterStatus]);

  const deleteSelected = useCallback(() => {
    setSelectedIds((prevIds) => {
      if (!prevIds.length) return prevIds;
      if (window.confirm(t("deleteSelectedConfirmation", { count: prevIds.length }))) {
        setItems((prevItems) => prevItems.filter((item) => !prevIds.includes(item.id)));
        addLog(t("actionDeletedMultiple", { count: prevIds.length }));
        return [];
      }
      return prevIds;
    });
  }, [addLog, t]);

  const clearAllItems = useCallback(() => {
    if (window.confirm(t("deleteAllConfirmation"))) {
      setItems([]);
      setSelectedIds([]);
      addLog(t("actionClearedAll"));
    }
  }, [addLog, t]);

  const resetItems = useCallback(() => {
    setItems(initialItems);
    setSelectedIds([]);
    addLog(t("actionReset"));
  }, [addLog, t]);

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2>{t("adminPanel")}</h2>
        <div style={{
          padding: "12px 16px",
          background: "#f3f4f6",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>Вход как:</div>
            <div style={{ fontWeight: 600 }}>{currentUser?.name}</div>
            <div style={{
              fontSize: "12px",
              padding: "4px 8px",
              background: userRole === "admin"
                ? "#fee2e2"
                : userRole === "editor"
                ? "#fef3c7"
                : "#e0f2fe",
              color: userRole === "admin"
                ? "#991b1b"
                : userRole === "editor"
                ? "#92400e"
                : "#0c4a6e",
              borderRadius: "4px",
              display: "inline-block",
              fontWeight: "500",
              marginTop: "4px"
            }}>
              {userRole === "admin"
                ? "Администратор"
                : userRole === "editor"
                ? "Редактор"
                : "Просмотр"}
            </div>
          </div>
        </div>
      </div>

      {userRole === "admin" && (
        <div style={{
          padding: "16px",
          background: "#f0f9ff",
          borderRadius: "12px",
          marginBottom: "20px",
          border: "1px solid #bfdbfe"
        }}>
          <button
            onClick={() => setShowRoleManager(!showRoleManager)}
            style={{
              fontWeight: "600",
              background: "#3b82f6",
              color: "white",
              padding: "10px 14px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer"
            }}
          >
            {showRoleManager ? "Скрыть" : "Показать"} управление ролями
          </button>

          {showRoleManager && (
            <div style={{ marginTop: "16px" }}>
              <h3 style={{ marginTop: 0 }}>Управление ролями пользователей</h3>
              <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", marginTop: "12px" }}>
                <thead>
                  <tr style={{ background: "#dbeafe" }}>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Текущая роль</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td style={{ fontWeight: "600" }}>{user.role}</td>
                      <td style={{ display: "flex", gap: "8px" }}>
                        {user.role !== "admin" && (
                          <button
                            onClick={() => updateUserRole(user.id, "admin")}
                            style={{
                              padding: "6px 12px",
                              background: "#fee2e2",
                              color: "#991b1b",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "12px",
                              fontWeight: "500"
                            }}
                          >
                            Admin
                          </button>
                        )}
                        {user.role !== "editor" && (
                          <button
                            onClick={() => updateUserRole(user.id, "editor")}
                            style={{
                              padding: "6px 12px",
                              background: "#fef3c7",
                              color: "#92400e",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "12px",
                              fontWeight: "500"
                            }}
                          >
                            Editor
                          </button>
                        )}
                        {user.role !== "viewer" && (
                          <button
                            onClick={() => updateUserRole(user.id, "viewer")}
                            style={{
                              padding: "6px 12px",
                              background: "#e0f2fe",
                              color: "#0c4a6e",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "12px",
                              fontWeight: "500"
                            }}
                          >
                            Viewer
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20, alignItems: 'center' }}>
        {canDelete("Items") && <button className="btn btn-secondary" onClick={clearAllItems}>{t("clearAll")}</button>}
        {canDelete("Items") && <button className="btn btn-secondary" onClick={resetItems}>{t("resetSubjects")}</button>}
        <div style={{ marginLeft: 'auto', alignSelf: 'center', color: 'var(--muted)' }}>
          {t("itemsFound", { count: filteredItems.length })}
        </div>
      </div>

      {canEdit("Items") && (
        <ItemForm
          key={editingItem ? editingItem.id : "new"}
          onSubmit={editingItem ? updateItem : addItem}
          editingItem={editingItem}
          onCancel={() => setEditingItem(null)}
        />
      )}

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
            {canDelete("Items") && <th><input type="checkbox" checked={selectedIds.length === filteredItems.length && filteredItems.length > 0} onChange={selectAll} /></th>}
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
              {canDelete("Items") && (
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(i.id)}
                    onChange={() => toggleSelection(i.id)}
                  />
                </td>
              )}
              <td>{i.name}</td>
              <td>{i.teacher}</td>
              <td>{i.description}</td>
              <td>{i.status}</td>
              <td>{i.type}</td>
              <td>
                {canEdit("Items") && <button className="btn btn-secondary" onClick={() => setEditingItem(i)}>{t("edit")}</button>}
                {canDelete("Items") && <> {<button className="btn btn-ghost" onClick={() => deleteItem(i.id)} style={{ color: '#dc2626' }}>{t("delete")}</button>}</>}
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
        {canDelete("Items") && (
          <button className="btn btn-secondary" onClick={deleteSelected} disabled={!selectedIds.length}>
            {t("deleteSelected", { count: selectedIds.length })}
          </button>
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ItemForm({ onSubmit, editingItem, onCancel }) {
  const { t } = useTranslation();
  const [name, setName] = useState(editingItem?.name || "");
  const [teacher, setTeacher] = useState(editingItem?.teacher || "");
  const [type, setType] = useState(editingItem?.type || t("schoolType"));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !teacher) {
      return;
    }
    onSubmit({ id: editingItem?.id, name, teacher, type });
    setName("");
    setTeacher("");
    setType(t("schoolType"));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20, display: 'grid', gap: 12 }}>
      <h3>{editingItem ? t("editSubject") : t("addSubject")}</h3>
      <input
        type="text"
        placeholder={t("subjectName")}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder={t("teacherResponsible")}
        value={teacher}
        onChange={(e) => setTeacher(e.target.value)}
        className="input-field"
      />
      <select value={type} onChange={(e) => setType(e.target.value)} className="input-field">
        <option>{t("schoolType")}</option>
        <option>{t("extracurricularType")}</option>
        <option>{t("additionalType")}</option>
      </select>
      <div style={{ display: 'flex', gap: 10 }}>
        <button type="submit" className="btn btn-primary">{editingItem ? t("save") : t("addSubject")}</button>
        {editingItem && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>{t("cancel")}</button>
        )}
      </div>
    </form>
  );
}

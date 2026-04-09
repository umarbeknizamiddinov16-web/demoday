import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ position: 'absolute', top: 10, right: 10 }}>
      <button onClick={() => changeLanguage('en')} style={{ margin: 5 }}>EN</button>
      <button onClick={() => changeLanguage('ru')} style={{ margin: 5 }}>RU</button>
      <button onClick={() => changeLanguage('uz')} style={{ margin: 5 }}>UZ</button>
    </div>
  );
};

export default LanguageSwitcher;
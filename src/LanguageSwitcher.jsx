import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [theme, setTheme] = useState(localStorage.getItem('appTheme') || 'light');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('appLanguage', lng);
  };

  return (
    <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
      <button className="btn btn-ghost" onClick={() => changeLanguage('en')}>EN</button>
      <button className="btn btn-ghost" onClick={() => changeLanguage('ru')}>RU</button>
      <button className="btn btn-ghost" onClick={() => changeLanguage('uz')}>UZ</button>
      <button className="btn btn-ghost" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} title={theme === 'light' ? t('darkMode') : t('lightMode')}>
        {theme === 'light' ? t('moonIcon') : t('sunIcon')}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
import React from 'react';
import i18n from '../../internationalization/i18n';
import { routes } from '../../router/routes';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="text-white bg-slate-900 p-4 flex justify-between">
      {Object.entries(routes).map(([name, route]) => (
        <Link
          to={route + location.search}
          className={`${
            route === location.pathname ? 'text-amber-500' : 'underline'
          } text-center w-full font-bold text-lg`}
          key={route}
        >
          {t(name)}
        </Link>
      ))}
      <div className="w-full flex flex-col text-sm text-right">
        <span className={`${i18n.language === 'ua' ? 'text-amber-500' : ''}`} onClick={() => i18n.changeLanguage('ua')}>
          Українська
        </span>
        <span className={`${i18n.language === 'en' ? 'text-amber-500' : ''}`} onClick={() => i18n.changeLanguage('en')}>
          English
        </span>
      </div>
    </div>
  );
};

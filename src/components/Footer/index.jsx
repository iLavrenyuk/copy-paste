import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

export const Footer = () => {
  const { t } = useTranslation();
  const { linkId } = useParams();

  return (
    <footer className="text-white bg-slate-900 flex justify-between px-4 py-6 text-sm flex-wrap">
      <span className="basis-full text-center whitespace-pre-line mb-2">{t('Volunteer project')}</span>
      <div className="flex flex-col">
        <span className="text-slate-500">{t('Contact me by')}</span>

        <div className="flex">
          <a className="underline mr-4" href="https://t.me/iLavreniuk" target="_blank" rel="noreferrer">
            Telegram
          </a>
          <a className="underline" href="https://www.instagram.com/ilavrenyuk/" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-slate-500">Develop by</span>
        <Link to={'/admin/' + linkId}>ILLIA LAVRENIUK</Link>
      </div>
    </footer>
  );
};

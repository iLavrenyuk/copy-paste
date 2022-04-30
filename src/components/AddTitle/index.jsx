import React from 'react';
import { Button } from '../Button';
import { useTranslation } from 'react-i18next';

export const AddTitle = () => {
  const { t } = useTranslation();

  const instagramOauth =
    'https://www.instagram.com/oauth/authorize?client_id=677140250230821&redirect_uri=https://copy-paste.onrender.com/create&scope=user_profile,user_media&response_type=code&state=add-account';

  return (
    <div className="w-full grid grid-cols-4 sm:grid-cols-5 gap-2">
      <div className="flex justify-center items-center truncate max-w-full font-bold">{t('title')}:</div>
      <input className={`col-span-3 sm:col-span-4 text-sm w-full mt-1 rounded-md text-slate-800 p-2 border-4`} />
      <div className="col-span-4 sm:col-span-5 flex justify-center mb-5">
        <Button onClick={() => window.open(instagramOauth, '_blank')}>{t('Connect instagram')}</Button>
      </div>
    </div>
  );
};

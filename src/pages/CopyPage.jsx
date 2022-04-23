import React, { useEffect, useState } from 'react';
import { routes } from '../router/routes';
import { Button } from '../components/Button';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';

export const CopyPage = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const names = searchParams.getAll('name');
    const values = searchParams.getAll('value');
    const searchParamsData = names.map((item, index) => ({ name: item, value: values[index] }));
    setData(searchParamsData);

    return () => {
      setData(null);
    };
  }, [searchParams]);

  return (
    <div className="text-white min-h-screen bg-slate-800 p-4 overflow-hidden">
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-5">
        {data?.length ? (
          data?.map((item) => (
            <React.Fragment key={item.name}>
              <div className="col-span-2 sm:col-span-4 text-right">
                <p className="font-bold text-xl">{item.name || t('Not found')}</p>
                <div className="truncate text-sm max-w-full">{item.value || t('Not found')}</div>
              </div>
              {item.value ? (
                <Button onClick={() => navigator.clipboard.writeText(item.value)}>{t('COPY')}</Button>
              ) : (
                <span>{t('Not found')}</span>
              )}
            </React.Fragment>
          ))
        ) : (
          <div className="col-span-3 sm:col-span-5 flex flex-col items-center">
            <div className="max-w-full">{t('Not found any data')}</div>
          </div>
        )}
        <div className="mt-8 mb-8 col-span-3 sm:col-span-5 border-b-2" />
        <div className="col-span-2 sm:col-span-4 text-right">{t('copy site link')}</div>
        <div style={{ maxWidth: '40%' }}>
          <Button onClick={() => navigator.clipboard.writeText(window.location.href)}>{t('COPY')}</Button>
        </div>
        <div className="col-span-2 sm:col-span-4 text-right">{t('Set my params')}</div>
        <Link
          className="mt-1 px-6 py-1 bg-amber-500 font-bold rounded-md w-fit h-fit"
          to={routes.Paste + location.search}
        >
          {t('Create')}
        </Link>
      </div>
    </div>
  );
};

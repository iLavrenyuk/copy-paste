import React, { useEffect, useState } from 'react';
import { routes } from '../router/routes';
import { Button } from '../components/Button';
import { useTranslation } from 'react-i18next';
import { ShortLink } from '../components/ShortLink';
import { Link, useSearchParams } from 'react-router-dom';

export const CopyPage = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const entries = [];
    for (const entry of searchParams.entries()) {
      entries.push(entry);
    }

    if (entries?.length) {
      setData(entries);
    } else {
      setData(null);
    }

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
                {item.map((element, indexElement) =>
                  indexElement ? (
                    <div className="truncate text-sm max-w-full">{element || t('Not found')}</div>
                  ) : (
                    <p key={indexElement} className="font-bold text-xl">
                      {element || t('Not found')}
                    </p>
                  )
                )}
              </div>
              {item[1] ? (
                <Button onClick={() => navigator.clipboard.writeText(item[1])}>{t('COPY')}</Button>
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

        <div className="mt-8 mb-8 col-span-3 sm:col-span-5 border-b-2" />

        <ShortLink />
      </div>
    </div>
  );
};

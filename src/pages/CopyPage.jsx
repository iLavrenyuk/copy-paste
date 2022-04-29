import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

export const CopyPage = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);

  const [clicked, setClicked] = useState(null);

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

  const embedLink = (link) => {
    if (link.includes('?')) {
      return link.replace('?', 'embed/?');
    } else return link + 'embed';
  };

  return (
    <div className="text-white bg-slate-800 px-4 py-6 overflow-hidden" style={{ minHeight: 'calc(100vh - 208px)' }}>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-5">
        {data?.length ? (
          data?.map((item) =>
            item[1].includes('https://www.instagram.com') ? (
              <div className="col-span-3 sm:col-span-5 flex flex-col items-center" key={item[0]}>
                <p className="font-bold text-lg mb-2">{item[0] || t('Not found')}</p>
                <iframe width="100%" height="300" src={embedLink(item[1])} frameBorder="0" />
              </div>
            ) : (
              <React.Fragment key={item[0]}>
                <div className="col-span-2 sm:col-span-4 text-right">
                  {item.map((element, indexElement) =>
                    indexElement ? (
                      <div className="truncate text-xs max-w-full">{element || t('Not found')}</div>
                    ) : (
                      <p key={indexElement} className="font-bold text-lg">
                        {element || t('Not found')}
                      </p>
                    )
                  )}
                </div>
                {item[1] ? (
                  <Button
                    isClicked={clicked === item[0]}
                    onClick={() => {
                      navigator.clipboard.writeText(item[1]);
                      setClicked(item[0]);
                    }}
                  >
                    {clicked === item[0] ? t('Copied') : t('COPY')}
                  </Button>
                ) : (
                  <span>{t('Not found')}</span>
                )}
              </React.Fragment>
            )
          )
        ) : (
          <div className="col-span-3 sm:col-span-5 flex flex-col items-center">
            <div className="max-w-full">{t('Not found any data')}</div>
          </div>
        )}
      </div>
    </div>
  );
};

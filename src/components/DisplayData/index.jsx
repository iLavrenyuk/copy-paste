import copy from 'copy-to-clipboard';
import React, { useState } from 'react';
import { Button } from '../Button';
import { useTranslation } from 'react-i18next';

export const DisplayData = ({ data, isLoading }) => {
  const { t } = useTranslation();

  const [heightIframe, setHeightIframe] = useState(300);
  const [clicked, setClicked] = useState(null);

  const embedLink = (link) => {
    if (link.includes('?')) {
      return link.replace('?', 'embed/?');
    } else return link + 'embed';
  };

  return data?.length ? (
    data?.map((item) =>
      item.value.includes('https://www.instagram.com') ? (
        <div className="col-span-3 sm:col-span-5 flex flex-col items-center" key={item.name}>
          <p className="font-bold text-lg mb-2">{item.name || t('Not found')}</p>
          <iframe
            style={{ maxWidth: 640, width: '100%', height: heightIframe + 'px' }}
            src={embedLink(item.value)}
            frameBorder="0"
            onLoad={(e) => setHeightIframe(e.target.scrollWidth + 54)}
          />
        </div>
      ) : (
        <React.Fragment key={item.name}>
          <div className="col-span-2 sm:col-span-3 text-right">
            <p className="font-bold text-lg">{item.name || t('Not found')}</p>
            <div className="truncate text-xs max-w-full">{item.value || t('Not found')}</div>
          </div>
          {item.value ? (
            item.value.includes('http') ? (
              <Button onClick={() => window.open(item.value, '_blank')}>{t('Visit')}</Button>
            ) : (
              <Button
                isClicked={clicked === item.name}
                onClick={() => {
                  copy(item.value);
                  setClicked(item.name);
                }}
              >
                {clicked === item.name ? t('Copied') : t('COPY')}
              </Button>
            )
          ) : (
            <span>{t('Not found')}</span>
          )}
        </React.Fragment>
      )
    )
  ) : isLoading ? null : (
    <div className="col-span-3 sm:col-span-5 flex flex-col items-center">
      <div className="max-w-full">{t('Not found any data')}</div>
    </div>
  );
};

import axios from 'axios';
import React, { useState } from 'react';
import { Button } from '../Button';
import { useTranslation } from 'react-i18next';

export const ShortLink = () => {
  const { t } = useTranslation();

  const token = process.env.REACT_APP_BITLY_API_KEY;
  const [link, setLink] = useState(localStorage.getItem('bitLy'));
  const [isOpen, setIsOpen] = useState(false);
  const [apiError, setApiError] = useState(false);

  const getMinLink = async () => {
    if (link) {
      return link;
    } else {
      try {
        const res = await axios({
          url: 'https://api-ssl.bitly.com/v4/shorten',
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          data: {
            long_url: window.location.href,
          },
        });
        localStorage.setItem('bitLy', res.data.link);
        setLink(res.data.link);
        return res.data.link;
      } catch (error) {
        setApiError(true);
      }
    }
  };

  return (
    <>
      <div className="col-span-2 sm:col-span-4 text-right">{t('Generate short link')}</div>
      <div style={{ maxWidth: '40%' }}>
        <Button onClick={() => setIsOpen(!isOpen)}>{t('Open')}</Button>
      </div>
      {isOpen ? (
        <>
          <div className="col-span-2 sm:col-span-4 text-right">{t('1 link is free')}</div>
          <div style={{ maxWidth: '40%' }}>
            {link ? null : (
              <Button onClick={async () => navigator.clipboard.writeText(await getMinLink())}>{t('Generate')}</Button>
            )}
          </div>

          <div className="col-span-2 sm:col-span-3 text-right">
            {apiError ? t('Error') : link || t('Does not exist')}
          </div>
          <div style={{ maxWidth: '40%' }}>
            {link ? <Button onClick={() => navigator.clipboard.writeText(link)}>{t('COPY')}</Button> : null}
          </div>

          <div className="col-span-2 sm:col-span-3 text-right">{t('Generate yourself')}:</div>
          <a
            href="https://bitly.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-1 sm:col-span-2 underline text-blue-600"
          >
            bitly.com
          </a>
        </>
      ) : null}
    </>
  );
};

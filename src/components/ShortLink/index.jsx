import axios from 'axios';
import React, { useState } from 'react';
import { Button } from '../Button';
import { useTranslation } from 'react-i18next';

export const ShortLink = ({ clicked, setClicked }) => {
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
      <div className="col-span-2 sm:col-span-4 text-right whitespace-pre-line">{t('Generate short link')}</div>
      <Button className="" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? t('Close') : t('Open')}
        <svg
          className={`m-2 shrink-0 ${isOpen ? '-rotate-90' : 'rotate-90'} transition-transform`}
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="11"
          viewBox="0 0 8 11"
        >
          <g fill="none" fillRule="evenodd">
            <g fill="#ffffff" fillRule="nonzero">
              <g>
                <g>
                  <path
                    d="M8.293 0.293L9.707 1.707 5 6.414 0.293 1.707 1.707 0.293 5 3.585z"
                    transform="translate(-315 -193) translate(74 188) rotate(-90 128.5 -113)"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </Button>

      {isOpen ? (
        <>
          <div className="col-span-2 sm:col-span-4 text-right">{t('1 link as a gift')}</div>
          {link ? null : (
            <Button onClick={async () => navigator.clipboard.writeText(await getMinLink())}>{t('Generate')}</Button>
          )}

          <div className="col-span-2 sm:col-span-4 text-right">
            {apiError ? t('Error') : link || t('Does not exist')}
          </div>
          {link ? (
            <Button
              isClicked={clicked === 'bitly link'}
              onClick={() => {
                navigator.clipboard.writeText(link);
                setClicked('bitly link');
              }}
            >
              {clicked === 'bitly link' ? t('Copied') : t('COPY')}
            </Button>
          ) : null}

          <div className="col-span-2 sm:col-span-4 text-right">{t('Generate yourself')}:</div>
          <a
            href="https://bitly.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-1 sm:col-span-1 underline text-blue-600"
          >
            bitly.com
          </a>
        </>
      ) : null}
    </>
  );
};

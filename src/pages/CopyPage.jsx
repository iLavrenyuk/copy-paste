import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

export const CopyPage = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [heightIframe, setHeightIframe] = useState(300);

  const [clicked, setClicked] = useState(null);

  const token =
    'IGQVJXeGlyMVVvS2xJNkVEa04xQ1cxNEhkX1NXS0lZAaUh0RGtvZAWF3bzNjVEdjNXdOMUxOZADdDQjBuV0N1TU1ScHJVUjEzbURUMWxUZAUs4dnl3YzlBeE04cnRzU1ozUnpIUFZAzQ0JJTllfQ0ZAXMVBwZAwZDZD';
  const code =
    'AQCjQGsP6IvRAW_eKnVqX71XRMVLeiSzShOGk7p5nVKnovb8mKajKIK4b7caix0a4LK5K4X3C0Bt_Ay-b1JcIcF9QK48AsnDtX0jbqkkIixNooNeoTzOA8NEMZeq47m_58Bd-vAZDmH3YYlbCbISFYB2F_Yx7ZtS5HRd3XkYIhDnAL-KScFhDm_GAjY-47S9M-Lett-LrIG-76v1HJRAzjErRRru4Hyt1E7KuZVp0RuyVw';

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

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchInstagramPost() {
      try {
        const params = new URLSearchParams();
        params.append('client_id', process.env.REACT_APP_META_APP_ID);
        params.append('client_secret', process.env.REACT_APP_META_APP_SECRET);
        params.append('grant_type', 'authorization_code');
        params.append('redirect_uri', process.env.REACT_APP_META_REDIRECT_URL);
        params.append('code', code);

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        };
        const accessToken = await axios.post('https://api.instagram.com/oauth/access_token', params, config);
        console.log(accessToken);

        const data = await axios.get(
          `https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption&access_token=${token}`
        );
        console.log(data);
      } catch (err) {
        console.log('error', err);
      }
    }

    fetchInstagramPost();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-5">
        {data?.length ? (
          data?.map((item) =>
            ['code', 'state'].includes(item[0]) ? null : item[1].includes('https://www.instagram.com') ? (
              <div className="col-span-3 sm:col-span-5 flex flex-col items-center" key={item[0]}>
                <p className="font-bold text-lg mb-2">{item[0] || t('Not found')}</p>
                <iframe
                  style={{ maxWidth: 640, width: '100%', height: heightIframe + 'px' }}
                  src={embedLink(item[1])}
                  frameBorder="0"
                  onLoad={(e) => setHeightIframe(e.target.scrollWidth + 54)}
                />
              </div>
            ) : (
              <React.Fragment key={item[0]}>
                <div className="col-span-2 sm:col-span-3 text-right">
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
                  item[1].includes('http') ? (
                    <Button onClick={() => window.open(item[1], '_blank')}>{t('Visit')}</Button>
                  ) : (
                    <Button
                      isClicked={clicked === item[0]}
                      onClick={() => {
                        navigator.clipboard.writeText(item[1]);
                        setClicked(item[0]);
                      }}
                    >
                      {clicked === item[0] ? t('Copied') : t('COPY')}
                    </Button>
                  )
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
    </>
  );
};

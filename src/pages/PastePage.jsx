import defaultData from '../data/defaultData';
import React, { useEffect, useState } from 'react';
import { routes } from '../router/routes';
import { Button } from '../components/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const PastePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const entries = [];
    for (const entry of searchParams.entries()) {
      entries.push(entry);
    }

    if (entries?.length) {
      setData(entries);
    } else {
      setData(defaultData);
    }

    return () => {
      setData(defaultData);
    };
  }, [searchParams]);

  const handleDelete = (index) => {
    setData(data.filter((item, indexItem) => indexItem !== index));
  };

  const handleChange = (value, index, indexElement) => {
    setData(
      data.map((item, indexItem) =>
        indexItem === index ? item.map((e, indexE) => (indexE === indexElement ? value : e)) : item
      )
    );
  };

  const setUrlParams = () => data.reduce((str, item) => `${str}${item[0]}=${item[1]}&`, '?');

  return (
    <div className="text-white bg-slate-800 px-4 py-6" style={{ minHeight: 'calc(100vh - 208px)' }}>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {data?.map((item, index) => (
          <React.Fragment key={index}>
            {item.map((element, indexElement) => (
              <React.Fragment key={indexElement}>
                <div className="flex justify-center items-center truncate max-w-full font-bold">
                  {indexElement ? t('value') : t('name')}:
                </div>
                <input
                  onChange={(e) => handleChange(e.target.value, index, indexElement)}
                  value={element}
                  className="col-span-3 sm:col-span-4 text-sm w-full mt-1 rounded-md text-slate-800 p-2"
                />
              </React.Fragment>
            ))}
            <div className="col-span-4 sm:col-span-5 flex justify-center mb-5">
              <Button onClick={() => handleDelete(index)}>{t('delete')}</Button>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="w-full flex justify-evenly mt-8">
        <Button onClick={() => setData((values) => [...values, ['', '']])}>+</Button>
        <Button onClick={() => navigate(routes.Copy + setUrlParams())}>{t('SAVE')}</Button>
      </div>
    </div>
  );
};

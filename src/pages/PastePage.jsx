import defaultData from '../data/defaultData';
import React, { useEffect, useState } from 'react';
import { routes } from '../router/routes';
import { Button } from '../components/Button';
import { Link, useSearchParams } from 'react-router-dom';

export const PastePage = () => {
  const [searchParams] = useSearchParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    const names = searchParams.getAll('name');
    const values = searchParams.getAll('value');
    const searchParamsData = names.map((item, index) => ({ name: item, value: values[index] }));
    searchParamsData?.length && setData(searchParamsData);

    return () => {
      setData(defaultData);
    };
  }, [searchParams]);

  const handleDelete = (index) => {
    setData(data.filter((item, indexItem) => indexItem !== index));
  };

  const handleChange = (key, value, index) => {
    setData(data.map((item, indexItem) => (indexItem === index ? { ...item, [key]: value } : item)));
  };

  const setUrlParams = () => data.reduce((str, item) => `${str}name=${item.name}&value=${item.value}&`, '?');

  return (
    <div className="text-white min-h-screen bg-slate-800 p-4">
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {data?.map((item, index) => (
          <React.Fragment key={item.name + index}>
            <div className="flex justify-center items-center truncate max-w-full font-bold">name:</div>
            <input
              onChange={(e) => handleChange('name', e.target.value, index)}
              value={item.name}
              className="col-span-3 sm:col-span-4 text-sm w-full mt-1 rounded-md text-slate-800 p-2"
            />
            <div className="flex justify-center items-center truncate max-w-full font-bold">value:</div>
            <input
              onChange={(e) => handleChange('value', e.target.value, index)}
              value={item.value}
              className="col-span-3 sm:col-span-4 text-sm w-full mt-1 rounded-md text-slate-800 p-2"
            />

            <div className="col-span-4 sm:col-span-5 flex justify-center mb-5">
              <Button onClick={() => handleDelete(index)}>delete</Button>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="w-full flex justify-evenly mt-8">
        <Button onClick={() => setData((values) => [...values, { name: '', value: '' }])}>+</Button>
        <Link
          to={routes.Copy + setUrlParams()}
          className="mt-1 px-6 py-1 bg-amber-400 font-bold rounded-md w-fit h-fit"
        >
          SAVE
        </Link>
      </div>
    </div>
  );
};

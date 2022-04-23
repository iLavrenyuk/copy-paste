import React, { useEffect, useState } from 'react';
import { routes } from '../router/routes';
import { Button } from '../components/Button';
import { Link, useSearchParams } from 'react-router-dom';

export const CopyPage = () => {
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
    <div className="text-white min-h-screen bg-slate-800 p-4">
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-5 text-right">
        {data?.length ? (
          data?.map((item) => (
            <React.Fragment key={item.name}>
              <div className="col-span-3 sm:col-span-4">
                <p className="font-bold text-2xl">{item.name || 'Not found'}</p>
                <div className="truncate max-w-full">{item.value || 'Not found'}</div>
              </div>
              {item.value ? (
                <Button onClick={() => navigator.clipboard.writeText(item.value)}>COPY</Button>
              ) : (
                <span>Not found</span>
              )}
            </React.Fragment>
          ))
        ) : (
          <div className="col-span-4 sm:col-span-5 flex flex-col items-center">
            <div className="max-w-full">Not found any data</div>
          </div>
        )}
      </div>
      <div className="w-full flex justify-evenly mt-8">
        <Button onClick={() => navigator.clipboard.writeText(window.location.href)}>copy site link</Button>
        <Link
          className="mt-1 px-6 py-1 bg-amber-400 font-bold rounded-md w-fit h-fit"
          to={routes.Paste + location.search}
        >
          Create
        </Link>
      </div>
    </div>
  );
};

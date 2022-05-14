import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DisplayData } from '../components/DisplayData';

export const CopyPage = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const entries = [];
    for (const entry of searchParams.entries()) {
      entries.push({ name: entry[0], value: entry[1] });
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
    <div className="text-white bg-slate-800 px-4 py-6 overflow-hidden" style={{ minHeight: 'calc(100vh - 208px)' }}>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-5">
        <DisplayData data={data} />
      </div>
    </div>
  );
};

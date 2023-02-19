import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getLinkData } from '../api/linkDataApi';
import { DisplayData } from '../components/DisplayData';

export const CopyPageV2 = () => {
  const { linkId } = useParams();

  const [linkData, setLinkData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = getLinkData(linkId);
      setLinkData(res);
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  }, [linkId]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="text-white bg-slate-800 px-4 py-6 overflow-hidden" style={{ minHeight: 'calc(100vh - 208px)' }}>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-5">
        <DisplayData data={linkData} isLoading={isLoading} />
      </div>
    </div>
  );
};

import React, { useEffect, useState, useCallback } from 'react';
import { appBase } from '../data/firebase';
import { useParams } from 'react-router-dom';
import { DisplayData } from '../components/DisplayData';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

export const CopyPageBase = () => {
  const { linkId } = useParams();

  const [linkData, setLinkData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const db = getFirestore(appBase);
      const linksCol = collection(db, 'links');
      const linksSnapshot = await getDocs(linksCol);
      const searchLink = linksSnapshot.docs.find((doc) => doc.id == linkId)?.data()?.fields;
      searchLink && setLinkData(searchLink);
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

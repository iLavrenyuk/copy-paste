import React, { useCallback, useEffect, useState } from 'react';
import { routes } from '../router/routes';
import { appBase } from '../data/firebase';
import { Button } from '../components/Button';
import { useTranslation } from 'react-i18next';
import { CreateField } from '../components/CreateField';
import { useNavigate, useParams } from 'react-router-dom';
import { updateDoc, getFirestore, collection, getDocs, doc } from 'firebase/firestore';

export const AdminPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { linkId } = useParams();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = (index) => {
    setData(data.filter((item, indexItem) => indexItem !== index));
  };

  const handleChange = (value, index, key) => {
    setData(data.map((item, indexItem) => (indexItem === index ? { ...item, [key]: value } : item)));
  };

  const updateLink = async () => {
    try {
      const db = getFirestore(appBase);
      const linksCol = collection(db, 'links');
      const docRef = doc(linksCol, linkId);
      await updateDoc(docRef, { fields: data });
      navigate(routes.Copy + '/' + linkId);
    } catch (error) {
      alert(error);
    }
  };

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const db = getFirestore(appBase);
      const linksCol = collection(db, 'links');
      const linksSnapshot = await getDocs(linksCol);
      const searchLink = linksSnapshot.docs.find((doc) => doc.id == linkId)?.data()?.fields;
      searchLink && setData(searchLink);
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  }, [linkId]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="text-white bg-slate-800 px-4 py-6" style={{ minHeight: 'calc(100vh - 208px)' }}>
      {data?.length ? (
        <>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {data?.map((item, index) => (
              <React.Fragment key={index}>
                <CreateField
                  name={t('name')}
                  value={item.name}
                  onChange={(e) => handleChange(e.target.value, index, 'name')}
                />
                <CreateField
                  name={t('value')}
                  value={item.value}
                  onChange={(e) => handleChange(e.target.value, index, 'value')}
                />
                <div className="col-span-4 sm:col-span-5 flex justify-center mb-5">
                  <Button onClick={() => handleDelete(index)}>{t('delete')}</Button>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="w-full flex justify-evenly mt-8">
            <Button onClick={() => setData((values) => [...values, { name: '', value: '' }])}>+</Button>
            <Button onClick={updateLink}>{t('Create')}</Button>
            <Button onClick={() => navigate(-1)}>{t('Back')}</Button>
          </div>
        </>
      ) : isLoading ? null : (
        <div className="col-span-3 sm:col-span-5 flex flex-col items-center">
          <div className="max-w-full">{t('Not found any data')}</div>
        </div>
      )}
    </div>
  );
};

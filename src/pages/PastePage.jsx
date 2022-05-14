import React, { useState } from 'react';
import defaultData from '../data/defaultData';
import { routes } from '../router/routes';
import { appBase } from '../data/firebase';
import { Button } from '../components/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CreateField } from '../components/CreateField';
import { addDoc, getFirestore, collection } from 'firebase/firestore';

export const PastePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [data, setData] = useState(defaultData);

  const handleDelete = (index) => {
    setData(data.filter((item, indexItem) => indexItem !== index));
  };

  const handleChange = (value, index, key) => {
    setData(data.map((item, indexItem) => (indexItem === index ? { ...item, [key]: value } : item)));
  };

  const createLink = async () => {
    try {
      const db = getFirestore(appBase);
      const linksCol = collection(db, 'links');
      const docRef = await addDoc(linksCol, { fields: data });
      navigate(routes.Copy + '/' + docRef.id);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="text-white bg-slate-800 px-4 py-6" style={{ minHeight: 'calc(100vh - 208px)' }}>
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
        <Button onClick={createLink}>{t('Create')}</Button>
        <Button onClick={() => navigate(-1)}>{t('Back')}</Button>
      </div>
    </div>
  );
};

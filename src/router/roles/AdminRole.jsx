import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button';
import { CreateField } from '../../components/CreateField';

export const AdminRole = ({ children }) => {
  const { t } = useTranslation();

  const [auth, setAuth] = useState({
    login: '',
    password: '',
  });

  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin'));
  const [error, setError] = useState(false);

  const handleChange = (name, e) => {
    setAuth((v) => ({
      ...v,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (auth.login === 'ira' && auth.password === 'm') {
      setAuth({
        login: '',
        password: '',
      });
      setIsAdmin(true);
      setError(false);
      localStorage.setItem('isAdmin', true);
    } else {
      setError(true);
    }
  };

  return isAdmin ? (
    children
  ) : (
    <div className="text-white bg-slate-800 px-4 py-6 overflow-hidden" style={{ minHeight: 'calc(100vh - 208px)' }}>
      <CreateField center name={t('login')} value={auth.login} onChange={(e) => handleChange('login', e)} />
      <div className="mt-2" />
      <CreateField center name={t('password')} value={auth.password} onChange={(e) => handleChange('password', e)} />
      <div className="flex flex-col items-center mt-4">
        {error && <div className="text-red-500 text-center">{t('loginError')}</div>}
        <Button onClick={handleSubmit}>{t('enter')}</Button>
      </div>
    </div>
  );
};

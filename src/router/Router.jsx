import React from 'react';
import { routes } from './routes';
import { CopyPage } from '../pages/CopyPage';
import { AdminRole } from './roles/AdminRole';
import { AdminPage } from '../pages/AdminPage';
import { PastePage } from '../pages/PastePage';
import { CopyPageV2 } from '../pages/CopyPageV2';
import { MainWrapper } from '../components/MainWrapper';
import { Navigate, Route, Routes } from 'react-router-dum';

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainWrapper />}>
          <Route path={routes.Copy}>
            <Route index element={<CopyPage />} />
            <Route path=":linkId" element={<CopyPageV2 />} />
          </Route>
          <Route
            path={routes.Admin}
            element={
              <AdminRole>
                <AdminPage />
              </AdminRole>
            }
          />
          <Route path={routes.Create} element={<PastePage />} />
        </Route>
        <Route path="*" element={<Navigate to={routes.Copy} replace />} />
      </Routes>
    </>
  );
};

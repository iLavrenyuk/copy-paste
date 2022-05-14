import React from 'react';
import { routes } from './routes';
import { CopyPage } from '../pages/CopyPage';
import { PastePage } from '../pages/PastePage';
import { CopyPageBase } from '../pages/CopyPageBase';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainWrapper } from '../components/MainWrapper/inndex';

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainWrapper />}>
          <Route index element={<Navigate to={routes.Copy} replace />} />
          <Route path={routes.Copy}>
            <Route index element={<CopyPage />} />
            <Route path=":linkId" element={<CopyPageBase />} />
          </Route>
          <Route path={routes.Create} element={<PastePage />} />
        </Route>
      </Routes>
    </>
  );
};

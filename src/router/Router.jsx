import React from 'react';
import { routes } from './routes';
import { CopyPage } from '../pages/CopyPage';
import { PastePage } from '../pages/PastePage';
import { Navigation } from '../components/Navigation';
import { Navigate, Route, Routes } from 'react-router-dom';

export const Router = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path={routes.Copy} element={<CopyPage />} />
        <Route path={routes.Paste} element={<PastePage />} />
        <Route path="*" element={<Navigate to={routes.Copy} replace />} />
      </Routes>
    </>
  );
};

import React from 'react';
import { routes } from './routes';
import { CopyPage } from '../pages/CopyPage';
import { Footer } from '../components/Footer';
import { PastePage } from '../pages/PastePage';
import { Navigation } from '../components/Navigation';
import { PageWrapper } from '../components/PageWrapper';
import { Navigate, Route, Routes } from 'react-router-dom';

export const Router = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route element={<PageWrapper />}>
          <Route path={routes.Copy} element={<CopyPage />} />
          <Route path={routes.Create} element={<PastePage />} />
        </Route>

        <Route path="*" element={<Navigate to={routes.Copy} replace />} />
      </Routes>
      <Footer />
    </>
  );
};

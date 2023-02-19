import React from 'react';
import { Footer } from '../Footer';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../Navigation';

export const MainWrapper = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};

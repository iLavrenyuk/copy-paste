import './internationalization/i18n';
import React from 'react';
import { Router } from './router/Router';
import { BrowserRouter } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

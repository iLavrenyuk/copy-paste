import React from 'react';
import { Outlet } from 'react-router-dom';

export const PageWrapper = () => {
  return (
    <div className="text-white bg-slate-800 flex justify-center" style={{ minHeight: 'calc(100vh - 208px)' }}>
      <div className="max-w-3xl px-4 py-6">
        <Outlet />
      </div>
    </div>
  );
};

import React from 'react';
import { routes } from '../../router/routes';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();
  return (
    <div className="text-white bg-slate-900 p-4 flex justify-between">
      {Object.entries(routes).map(([name, route]) => (
        <Link
          to={route + location.search}
          className={`${
            route === location.pathname ? 'text-amber-400' : 'underline'
          } text-center w-full font-bold text-lg`}
          key={route}
        >
          {name}
        </Link>
      ))}
    </div>
  );
};

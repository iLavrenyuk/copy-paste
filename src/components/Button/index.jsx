import React from 'react';

export const Button = ({ children, onClick }) => {
  return (
    <button
      className="mt-1 px-6 py-1 bg-amber-500 font-bold rounded-md w-fit h-fit focus:bg-lime-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

import React from 'react';

export const Button = ({ children, onClick, isClicked }) => {
  return (
    <button
      className={`mt-1 px-6 py-1 text-sm font-bold rounded-md w-fit h-fit ${
        isClicked ? 'bg-lime-600' : 'bg-amber-500'
      } flex justify-center items-center max-w-full`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

import React from 'react';

export const CreateField = ({ name, value, onChange }) => {
  return (
    <>
      <div className="flex justify-center items-center truncate max-w-full font-bold">{name}:</div>
      <input
        onChange={onChange}
        value={value}
        className={`col-span-3 sm:col-span-4 text-sm w-full mt-1 rounded-md text-slate-800 p-2`}
      />
    </>
  );
};

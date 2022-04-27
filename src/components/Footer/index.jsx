import React from 'react';

export const Footer = () => {
  return (
    <footer className="text-white bg-slate-900 flex justify-between p-4 text-sm">
      <div className="flex flex-col">
        <span className="text-slate-500">Contact me by</span>

        <div className="flex">
          <a className="underline mr-4" href="https://t.me/iLavreniuk" target="_blank" rel="noreferrer">
            Telegram
          </a>
          <a className="underline" href="https://www.instagram.com/ilavrenyuk/" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-slate-500">Develop by </span>ILLIA LAVRENIUK
      </div>
    </footer>
  );
};

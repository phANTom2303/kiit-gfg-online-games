import React from 'react';

export const Footer = ({ reset }) => (
  <footer className="bg-blue-950 p-2 text-center">
    <div className="flex justify-center items-center">
      <button
        onClick={reset}
        className="bg-blue-700 text-white rounded-md p-1 sm:p-2 font-semibold hover:bg-slate-700 flex items-center space-x-1 sm:space-x-2"
        aria-label="Retry the game"
      >
        <span className="text-xs sm:text-sm">RETRY</span>
        <img src="/images/hangmanPic/logo.png" alt="Logo" className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
    </div>
  </footer>
);

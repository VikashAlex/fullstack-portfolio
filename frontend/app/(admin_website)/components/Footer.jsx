'use client';
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="relative bg-slate-900/70 border-t border-white/10 backdrop-blur-xl py-6 px-6 text-center shadow-inner">

        {/* Glow Line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 opacity-40"></div>

        {/* Main Text */}
        <p className="text-sm text-slate-400">
          &copy; {currentYear}
          <span className="font-semibold text-cyan-400"> My Portfolio Admin Console</span>.
          All rights reserved.
        </p>

        {/* Sub Text */}
        <p className="mt-1 text-xs text-slate-500">
          Managed by <span className="text-cyan-300 font-medium">VikashDev</span> • Built with Tailwind CSS
        </p>

        {/* Soft gradient bottom glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-8 bg-gradient-to-t from-cyan-500/10 via-indigo-500/10 to-transparent blur-xl"></div>
      </div>
    </footer>
  );
};

export default Footer;

'use client';
import Link from "next/link";
import React from "react";
import { FiBell, FiSettings, FiUser } from "react-icons/fi";

function Header() {
    return (
        <header className="sticky top-0 z-20 backdrop-blur-xl bg-slate-900/70 border-b border-white/10 px-6 py-4 flex items-center justify-between shadow-lg">

            {/* LEFT – TITLE */}
            <div className="flex items-center gap-3">
                <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 ring-1 ring-white/10 overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-br from-cyan-500/40 via-indigo-500/40 to-emerald-500/30 opacity-70"></span>
                    <FiUser className="relative text-xl text-white" />
                </span>

                <h3 className="text-xl font-bold tracking-tight text-slate-100">
                    Vikash <span className="text-cyan-400">Developer</span>
                </h3>
            </div>

            {/* RIGHT – PROFILE + ACTIONS */}
            <div className="flex items-center gap-6">

                {/* Notification Icon */}
                <button className="relative p-2 rounded-xl bg-slate-900/60 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/40 transition">
                    <FiBell className="text-xl" />
                    {/* Notification Dot */}
                    <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-md"></span>
                </button>

                {/* Settings Icon */}
                <Link href={'/admin/settings'}>
                    <button className="p-2 rounded-xl bg-slate-900/60 border border-white/10 text-slate-300 hover:text-white hover:border-indigo-400/40 transition">
                        <FiSettings className="text-xl" />
                    </button>
                </Link>

                {/* Admin Profile */}
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-300">
                        Hi, <span className="text-cyan-300">Admin</span>
                    </span>

                    <div className="relative">
                        <img
                            src="/hero/developer.png"
                            className="h-10 w-10 rounded-full object-cover border-2 border-cyan-400 shadow-cyan-500/30 shadow-md"
                            alt="Admin"
                        />

                        {/* Glow ring */}
                        <span className="absolute inset-0 rounded-full border-2 border-cyan-400/40 blur-[3px] opacity-60"></span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

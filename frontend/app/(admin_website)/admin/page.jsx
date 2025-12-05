'use client';

import { getProject, getSkills } from '@/app/utility/webData';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiFolder, FiCheckCircle, FiMail, FiStar, FiPlus, FiTrendingUp } from "react-icons/fi";

const DashboardLayout = () => {
  const [project, setProject] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const Project = await getProject();
      setProject(Project)
      const Skill = await getSkills();
      setSkills(Skill)

    }
    fetchData();
  }, [])
  // HARD FIX FOR TAILWIND (no dynamic classes)
  const cardColors = {
    cyan: "from-cyan-500 to-cyan-400 text-cyan-300 shadow-cyan-500/20",
    teal: "from-teal-500 to-teal-400 text-teal-300 shadow-teal-500/20",
    orange: "from-orange-500 to-orange-400 text-orange-300 shadow-orange-500/20",
    fuchsia: "from-fuchsia-500 to-fuchsia-400 text-fuchsia-300 shadow-fuchsia-500/20",
  };

  const ProjectCard = ({ title, count, icon, color }) => (
    <div className="relative group p-6 rounded-2xl bg-slate-900/70 border border-white/5 backdrop-blur-xl shadow-xl hover:shadow-2xl transition">

      {/* Glow Background */}
      <div className={`absolute -inset-1 bg-gradient-to-br ${cardColors[color]} rounded-2xl blur-2xl opacity-40 group-hover:opacity-70 transition`}></div>

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-400">
            {title}
          </p>
          <p className={`text-4xl font-bold mt-1 ${cardColors[color].split(" ")[2]}`}>
            {count}
          </p>
        </div>

        {/* Icon bubble */}
        <div className="h-12 w-12 rounded-2xl bg-slate-950/60 border border-white/10 flex items-center justify-center shadow-inner">
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-6 py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
        <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 ring-1 ring-white/10 overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-br from-cyan-500/40 via-indigo-500/40 to-emerald-500/30 opacity-70"></span>
          <FiTrendingUp className="relative text-xl" />
        </span>
        Dashboard <span className="text-cyan-400">Overview</span>
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <ProjectCard
          title="Total Projects"
          count={project?.length}
          color="cyan"
          icon={<FiFolder className="text-2xl text-cyan-300" />}
        />
        <ProjectCard
          title="Skills Updated"
          count={skills?.length}
          color="fuchsia"
          icon={<FiStar className="text-2xl text-fuchsia-300" />}
        />
      </div>

      {/* Quick Actions */}
      <div className="relative bg-slate-900/70 p-6 rounded-2xl border border-white/5 backdrop-blur-xl shadow-lg">

        <h2 className="text-xl font-bold mb-4 text-slate-100">Quick Actions</h2>

        <div className="flex flex-col gap-4">

          <Link href={'/admin/projects/add'}>
            <button className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-900 font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition">
              <FiPlus className="text-lg" /> Add New Project
            </button>
          </Link>

          <Link href={'/admin/skills/add'}>
            <button className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-900 font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition">
              <FiPlus className="text-lg" /> Add New Skill
            </button>
          </Link>

        </div>

      </div>
    </main>
  );
};

export default DashboardLayout;

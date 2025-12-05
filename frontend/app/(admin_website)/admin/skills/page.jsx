'use client';
import { Axiosinstance } from '@/app/utility/helper';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';



const page = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    Axiosinstance.get('/skills/get').then((res) => {
      if (res.data.success) {
        setSkillsData(res.data.data)
      }
    }).catch((error) => {
      console.log(error)
    })
  }, [flag])

  const ProgressBar = ({ proficiency = null }) => (
    <div className="w-full h-2.5 rounded-full bg-slate-800/80 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 transition-all duration-700 ease-out"
        style={{ width: `${proficiency}%` }}
      />
    </div>
  );

  const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        Axiosinstance.delete(`/skills/delete/${id}`).then((res) => {
          if (res.data.success) {
            toast.success(res.data.msg)
            setFlag(!flag)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    });


  }


  const onToggleActive = () => {

  }

  const SkillCard = ({ skill }) => (
    <article className=" rounded-2xl border border-white/5 bg-slate-900/70 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.9)] overflow-hidden backdrop-blur-xl">
      {/* Glow border */}
      <div className="pointer-events-none absolute inset-px rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 group-hover:scale-[1.01] transition duration-500" />

      {/* Gradient strip top-left */}
      <div
        className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 bg-gradient-to-br from-orange-500/40 to-transparent blur-2xl opacity-40 group-hover:opacity-80 transition duration-700"
      />

      <div className="relative flex items-start justify-between gap-4">
        {/* Icon badge */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center overflow-hidden justify-center rounded-full bg-slate-900 ring-1 ring-white/10">
            <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/icons/${skill.icon}`} className='w-full h-full object-cover object-center' alt="" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50 tracking-tight">
              {skill.skill}
            </h3>
            <p
              className={`text-xs font-medium mt-1 inline-flex items-center px-2 py-0.5 rounded-full bg-slate-900/80 ring-1 ring-white/10 ${skill.colorCode}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
              {skill.category}
            </p>
          </div>
        </div>

        {/* Proficiency badge */}
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
            Level
          </span>
          <span className="mt-1 text-sm font-semibold text-slate-50">
            {skill.proficiency}%
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="relative mt-5 space-y-2">
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>Proficiency</span>
          <span className="font-medium text-slate-300">
            {skill.proficiency <= 70
              ? 'Improving'
              : skill.proficiency < 90
                ? 'Strong'
                : 'Expert'}
          </span>
        </div>
        <ProgressBar proficiency={skill.proficiency} />

        {/* Little dots */}
        <div className="flex justify-end mt-1">
          <div className="flex gap-1">
            <span className="h-1 w-1 rounded-full bg-slate-500 group-hover:bg-cyan-400 transition" />
            <span className="h-1 w-1 rounded-full bg-slate-600 group-hover:bg-indigo-400 transition delay-100" />
            <span className="h-1 w-1 rounded-full bg-slate-700 group-hover:bg-emerald-400 transition delay-150" />
          </div>
        </div>
      </div>


      <div className="mt-5 flex items-center gap-2  group-hover:opacity-100 transition">

        {/* Edit Button */}
        <Link href={`/admin/skills/edit/${skill._id}`} >
          <button
            className="px-2.5 py-1 text-[10px] rounded-md bg-slate-800/60 ring-1 ring-white/10 text-slate-300 hover:text-white hover:bg-slate-700/60 transition"
          >
            Edit
          </button>
        </Link>

        {/* Active Button */}
        <button
          onClick={() => onToggleActive(skill._id)}
          className={`px-2.5 py-1 text-[10px] rounded-md ring-1 ring-white/10 transition
        ${skill.active
              ? "bg-emerald-600/70 text-white hover:bg-emerald-700"
              : "bg-slate-700/60 text-slate-300 hover:bg-slate-600"
            }`}
        >
          {skill.active ? "Active" : "Inactive"}
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(skill._id)}
          className="px-2.5 py-1 text-[10px] rounded-md bg-red-600/70 text-white hover:bg-red-700 transition"
        >
          Delete
        </button>

      </div>

    </article >

  );


  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              My Tech <span className="text-cyan-400">Skills</span>
            </h1>
          </div>

          {/* Stats card (sirf display) */}
          <div className="flex items-center gap-4">
            <Link href="skills/add">
              <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:scale-[1.02] transition">
                <span className="text-lg">＋</span>
                <span>Add New Skills</span>
              </button>
            </Link>
          </div>
        </header>



        {/* Skills Grid */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {
            skillsData.length > 0
              ?
              skillsData.map((skill) => (
                <SkillCard key={skill._id} skill={skill} />
              ))
              :
              <article className="group relative rounded-2xl border border-white/5 bg-slate-900/70 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.9)] overflow-hidden backdrop-blur-xl">
                {/* Glow border */}
                <div className="pointer-events-none absolute inset-px rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 group-hover:scale-[1.01] transition duration-500" />

                {/* Gradient strip top-left */}
                <div
                  className={`pointer-events-none absolute -left-10 -top-10 h-24 w-24 bg-gradient-to-br  to-transparent blur-2xl opacity-40 group-hover:opacity-80 transition duration-700`}
                />


              </article>
          }

        </section>
      </div>
    </div>
  );
};

export default page;

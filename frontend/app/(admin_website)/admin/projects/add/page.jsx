'use client';
import { Axiosinstance, getCokies } from '@/app/utility/helper';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FiImage, FiTag, FiEdit3, FiGithub, FiLink, FiPlus } from 'react-icons/fi';
import Select from 'react-select'
import { toast } from 'react-toastify';

const page = () => {
  const [tech, setTech] = useState([]);
  const [formData, setFormData] = useState('')
  const [selTech, setSelTech] = useState([]);
  const nameRef = useRef(null)
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);
  const linkRef = useRef(null);
  const githubRef = useRef(null);
  const activeRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectname = nameRef.current.value;
    const description = descriptionRef.current.value;
    const livelink = linkRef.current.value;
    const repogithub = githubRef.current.value;
    const thumbnail = imageRef.current?.files[0];
    const active = activeRef.current.checked ? true : false;
    const tech = JSON.stringify(selTech)
    const token = getCokies('admin_token')
    const formData = new FormData();
    formData.append("projectname", projectname);
    formData.append("tech", tech);
    formData.append("description", description);
    formData.append("livelink", livelink);
    formData.append("repogithub", repogithub);
    formData.append("active", active);
    formData.append("thumbnail", thumbnail);
    Axiosinstance.post('/project/create', formData, {
      headers: {
        Authorization: token
      }
    }).then((res) => {
      if (res.data.success) {
        toast.success(res.data.msg)
      } else {
        toast.warning(res.data.msg)
      }
    }).catch((error) => {
      console.log(error)
      toast.warning(error.response.data.msg)
    })

  };

  useEffect(() => {
    axios.get('/utility/skills.json')
      .then((res) => {
        const categories = [...new Set(res.data.skills.map(item => item.name))];
        setTech(categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);





  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
      <div className=" mx-auto">

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3 mb-10">
          <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 ring-1 ring-white/10 overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 via-cyan-500/40 to-emerald-500/30 opacity-70"></span>
            <FiPlus className="relative text-xl text-white" />
          </span>
          <span>Add New <span className="text-cyan-400">Project</span></span>
        </h1>

        <form className="relative bg-slate-900/60 p-8 rounded-3xl shadow-2xl border border-white/5 backdrop-blur-xl space-y-8" onSubmit={handleSubmit}>

          {/* GLOW EFFECT */}
          <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-emerald-500/20 blur-3xl opacity-40 rounded-3xl pointer-events-none"></div>

          {/* THUMBNAIL UPLOAD */}
          <div className="relative">
            <label className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <FiImage className="text-cyan-400" /> Project Thumbnail
            </label>

            <div className="mt-3 flex items-center gap-6">
              <div className="h-28 w-40 bg-slate-900/70 border border-white/10 rounded-xl overflow-hidden flex items-center justify-center text-slate-500 text-sm">
                {formData ? (
                  <img src={formData} className="object-cover h-full w-full" />
                ) : (
                  'No Image Selected'
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData(e.target.value)}
                ref={imageRef}
                className="block w-56 text-sm text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 transition"
              />
            </div>
          </div>

          {/* GRID INPUT ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">

            {/* PROJECT NAME */}
            <InputDark
              icon={<FiEdit3 className="text-indigo-400" />}
              label="Project Name"
              name="nameRef"
              placeholder="MegaKart – eCommerce App"
              ref={nameRef}
            />

            {/* CATEGORY */}

            <div className="relative group">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <FiTag className="text-emerald-400" /> Technology
              </label>

              <Select
                name="tech"
                isMulti
                instanceId="Technology-select"
                placeholder="-- Technology Selector --"
                onChange={(data) => {
                  const Tech = data.map((ob) => ob.value)
                  setSelTech(Tech)
                }}
                options={tech?.map((value) => ({
                  value: value,
                  label: value,
                }))}
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#0f172a",      // bg-slate-900
                    borderColor: "#334155",          // slate-600
                    paddingBlock: 4,
                    boxShadow: "none",
                    ":hover": { borderColor: "#38bdf8" }  // cyan-400
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#0f172a",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused
                      ? "#1e293b"                 // slate-800
                      : "transparent",
                    color: "white",
                    cursor: "pointer"
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#94a3b8"                // slate-400
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "white"
                  }),
                  input: (base) => ({
                    ...base,
                    color: "white"
                  }),
                }}
              />
            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="relative group">
            <label className="text-sm font-medium text-slate-300">Description</label>

            <textarea
              name="description"
              rows={3}


              placeholder="A modern dashboard built using Next.js + Tailwind..."
              ref={descriptionRef}
              className="mt-2 w-full rounded-xl bg-slate-950/60 px-4 py-3 border border-white/10 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            ></textarea>
          </div>

          {/* LINKS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <InputDark
              icon={<FiLink className="text-emerald-400" />}
              label="Live Project Link"
              name="link"
              placeholder="https://project-demo.vercel.app/"
              ref={linkRef}
            />

            <InputDark
              icon={<FiGithub className="text-purple-400" />}
              label="GitHub Repository"
              name="github"
              placeholder="https://github.com/user/repo"
              ref={githubRef}
            />
          </div>

          <div className='mt-3 px-4 flex items-center gap-x-3'>
            <input type="checkbox" id='checkbox' ref={activeRef} />
            <label htmlFor="checkbox">Active</label>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="text-right">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-10 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-900 font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.02] transition"
            >
              <FiPlus className="text-lg" /> Create Project Entry
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

/* ======================================
   REUSABLE DARK INPUT COMPONENT
====================================== */
const InputDark = ({ label, name, value, onChange, placeholder, icon, ref }) => (
  <div className="relative group">
    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
      {icon} {label}
    </label>

    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      ref={ref}
      className="mt-2 w-full rounded-xl bg-slate-950/60 px-4 py-3 border border-white/10 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
    />
  </div>
);

export default page;

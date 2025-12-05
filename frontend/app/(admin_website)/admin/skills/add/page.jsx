'use client';
import { Axiosinstance, getCokies } from '@/app/utility/helper';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select'
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

const page = () => {
    const proficiencyRfe = useRef(null)
    const activeRfe = useRef(null)
    const iconRfe = useRef(null)
    const [skills, setSkills] = useState([]);
    const [category, setCategory] = useState([]);
    const [progress, setProgressBar] = useState(10)


    const skillsInsert = (e) => {
        e.preventDefault();
        const proficiency = proficiencyRfe.current.value;
        const active = activeRfe.current.checked ? true : false;
        const icon = iconRfe.current.files[0];
        const token = getCokies('admin_token');
        const formData = new FormData();
        formData.append("skill", e.target.Skills.value);
        formData.append("category", e.target.Category.value);
        formData.append("proficiency", proficiency);
        formData.append("colorCode", e.target.Color.value);
        formData.append("active", active);
        formData.append("icon", icon);
        Axiosinstance.post('/skills/create', formData, {
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
    }
    useEffect(() => {
        axios.get('/utility/skills.json').then((res) => {
            setSkills(res.data.skills)
            setCategory([...new Set(res.data.skills.map(item => item.category))]
            )
        }).catch((error) => {
            console.log(error)
        })
    }, [])



    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
            <div>
                {/* Top header */}
                <header className="mb-8 flex flex-col gap-2">
                    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.26em] text-slate-400">
                        <span className="h-1 w-1 rounded-full bg-emerald-400" />
                        Skill Center
                    </span>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3 mb-4">
                        <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 ring-1 ring-white/10 overflow-hidden">
                            <span className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 via-cyan-500/40 to-emerald-500/30 opacity-70"></span>
                            <FiPlus className="relative text-xl text-white" />
                        </span>
                        <span>Add New <span className="text-cyan-400">Skill</span></span>
                    </h1>
                    <p className="text-sm text-slate-400 max-w-xl">
                        Naye tech stack ko neatly track karo. Skill name, category, level aur color set karke
                        apne dashboard ko consistent rakho.
                    </p>
                </header>

                {/* Form card */}
                <div className="relative">
                    {/* Background glow */}
                    <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-indigo-500/10 to-emerald-500/20 blur-3xl opacity-60" />

                    <form onSubmit={skillsInsert} className="relative bg-slate-900/80 border border-white/5 rounded-3xl p-8 shadow-[0_24px_60px_rgba(15,23,42,0.95)] backdrop-blur-xl space-y-6">
                        {/* Small badge */}
                        <div className="flex items-center justify-between mb-2">
                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-3 py-1 text-[11px] font-medium text-slate-300 ring-1 ring-white/10">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                New Skill Entry
                            </span>
                            <span className="text-[11px] text-slate-500">
                                All fields are <span className="text-emerald-400 font-medium">required</span>
                            </span>
                        </div>

                        {/* Skill Name */}
                        <div className="space-y-2">
                            <label
                                htmlFor="skillName"
                                className="flex items-center justify-between text-xs font-medium text-slate-200"
                            >
                                <span>Skill Name</span>
                                <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                                    e.g. React.js, Python
                                </span>
                            </label>

                            <div className="relative group">
                                <Select
                                    name="Skills"
                                    instanceId="skills-select"
                                    placeholder="-- Skills Selector --"
                                    options={skills?.map((skill) => ({
                                        value: skill.name,
                                        label: skill.name,
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

                        {/* Category */}
                        <div className="space-y-2">
                            <label
                                htmlFor="category"
                                className="flex items-center justify-between text-xs font-medium text-slate-200"
                            >
                                <span>Category</span>
                                <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                                    Frontend / Backend / DB
                                </span>
                            </label>

                            <div className="relative group">
                                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5 group-focus-within:border-indigo-400/70 group-focus-within:shadow-[0_0_0_1px_rgba(129,140,248,0.6)] transition" />
                                <Select
                                    name="Category"
                                    instanceId="Category-select"
                                    placeholder="-- Category Selector --"
                                    options={category?.map((value) => ({
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

                        {/* Proficiency Level */}
                        <div className="space-y-2">
                            <label
                                htmlFor="proficiency"
                                className="flex items-center justify-between text-xs font-medium text-slate-200"
                            >
                                <span>Proficiency Level (0–100%)</span>
                                <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                                    Slider + number
                                </span>
                            </label>

                            <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
                                {/* Range (UI only) */}
                                <div className="relative group col-span-1">
                                    <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5 group-focus-within:border-emerald-400/70 group-focus-within:shadow-[0_0_0_1px_rgba(52,211,153,0.6)] transition" />
                                    <div className="relative rounded-2xl bg-slate-950/60 px-4 py-3">
                                        <input
                                            type="range"
                                            id="proficiencyRange"
                                            name="proficiency"
                                            min="0"
                                            max="100"
                                            ref={proficiencyRfe}
                                            defaultValue={progress}
                                            onChange={(e) => setProgressBar(e.target.value)}
                                            className="w-full accent-emerald-400"

                                        />
                                        <div className="mt-2 flex justify-between text-[11px] text-slate-500">
                                            <span>Beginner</span>
                                            <span>Intermediate</span>
                                            <span>Advanced</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actual input number */}
                                <div className="relative group w-24">
                                    <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5 group-focus-within:border-emerald-400/70 transition" />
                                    <div className="relative rounded-2xl bg-slate-950/60 px-3 py-2.5 flex items-center justify-center">
                                        <input
                                            type="number"
                                            id="proficiency"
                                            name="proficiency"
                                            min="0"
                                            max="100"
                                            ref={proficiencyRfe}
                                            defaultValue={progress}
                                            onChange={(e) => setProgressBar(e.target.value)}
                                            className="w-full bg-transparent border-none text-sm text-center text-slate-50 focus:outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Color for Text  */}
                        <div className="space-y-2">
                            <label
                                htmlFor="color"
                                className="flex items-center justify-between text-xs font-medium text-slate-200"
                            >
                                <span>Text Color</span>
                                <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                                    Tailwind color name
                                </span>
                            </label>

                            <div className="grid gap-3 sm:grid-cols-[2fr,1fr]">
                                {/* Text input */}
                                <div className="relative group">
                                    <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5 group-focus-within:border-cyan-400/70 group-focus-within:shadow-[0_0_0_1px_rgba(34,211,238,0.6)] transition" />
                                    <Select
                                        name="Color"
                                        instanceId="Collor-select"
                                        placeholder="-- Color Selector --"
                                        options={skills?.map((skill) => ({
                                            value: skill.accentText,
                                            label: skill.accentText,
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
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="iconUpload"
                                className="flex items-center justify-between text-xs font-medium text-slate-200"
                            >
                                <span>Icon Upload</span>
                                <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                                    PNG / SVG
                                </span>
                            </label>

                            <div className="grid gap-3 sm:grid-cols-[2fr,1fr]">

                                {/* File input */}
                                <div className="relative group">
                                    {/* Outer border animation */}
                                    <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5 
                group-focus-within:border-cyan-400/70 
                group-focus-within:shadow-[0_0_0_1px_rgba(34,211,238,0.6)] 
                transition" />

                                    {/* Real input */}
                                    <label
                                        htmlFor="iconUpload"
                                        className="flex items-center gap-3 rounded-2xl bg-slate-950/60 px-3.5 py-2.5 cursor-pointer"
                                    >
                                        <span className="text-lg">📁</span>
                                        <span className="text-sm text-slate-300 group-hover:text-slate-100 transition">
                                            Choose icon file…
                                        </span>
                                    </label>

                                    <input
                                        id="iconUpload"
                                        type="file"
                                        ref={iconRfe}
                                        accept=".png,.svg"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => console.log(e.target.files[0])}
                                    />
                                </div>

                            </div>
                        </div>


                        <div className="space-y-2">
                            <label
                                htmlFor="active"
                                className="flex items-center justify-between text-xs font-medium text-slate-200"
                            >
                                <span>Active</span>
                            </label>

                            <div className="grid gap-3 sm:grid-cols-[2fr,1fr]">

                                {/* File input */}
                                <div className="relative group">
                                    {/* Outer border animation */}
                                    <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5 
                group-focus-within:border-cyan-400/70 
                group-focus-within:shadow-[0_0_0_1px_rgba(34,211,238,0.6)] 
                transition" />

                                    {/* Real input */}
                                    <label
                                        className="flex items-center gap-3 rounded-2xl bg-slate-950/60 px-3.5 py-2.5 cursor-pointer"
                                    >
                                        <span className="text-lg"><input ref={activeRfe} type="checkbox" /></span>
                                        <span className="text-sm text-slate-300 group-hover:text-slate-100 transition">
                                            Active Now
                                        </span>
                                    </label>

                                </div>

                            </div>
                        </div>

                        {/* Footer actions */}
                        <div className="pt-4 flex items-center justify-end border-t border-white/5">

                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:from-cyan-400 hover:to-indigo-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950 transition"
                            >
                                <span>Save Skill</span>
                                <span className="text-lg">⬆️</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default page;

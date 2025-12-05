'use client';
import { Axiosinstance } from '@/app/utility/helper';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiFolder, FiTrash, FiEdit } from "react-icons/fi";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const page = () => {
    const [projects, setProjects] = useState([]);
    const [flag, setFlag] = useState(true)
    useEffect(() => {
        Axiosinstance.get('project/get').then((res) => {
            if (res.data.success) {
                setProjects(res.data.data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }, [flag])

    // Dummy handlers
    const handleEdit = (id) => {
        alert(`Editing project ${id} (dummy action)`);
    };

    const handleDelete = (id) => {
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
                Axiosinstance.delete(`/project/delete/${id}`).then((res) => {
                    if (res.data.success) {
                        toast.success(res.data.msg)
                        setFlag(!flag)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        });
    };

    // Stack badge (inner component)
    const StackBadge = ({ tech }) => (
        <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-slate-900/80 text-slate-200 border border-white/5">
            {tech}
        </span>
    );

    // Project Card (inner component)
    const ProjectCard = ({ project, sr }) => {
        const statusStyles =
            project.active === 'Published'
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                : project.active === 'Draft'
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                    : 'bg-slate-500/15 text-slate-300 border-slate-500/40';

        return (
            <article className="group relative rounded-2xl border border-white/5 bg-slate-900/70 overflow-hidden shadow-[0_18px_45px_rgba(15,23,42,0.9)] backdrop-blur-xl">
                {/* Glow bg */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                    <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-emerald-500/20 blur-3xl" />
                </div>

                {/* Thumbnail */}
                <div className="relative h-40 overflow-hidden">
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/projects/${project.thumbnail}`}
                        alt={project.projectname}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/0 to-transparent pointer-events-none" />
                    {/* Status badge on image */}
                    <span
                        className={`absolute top-3 right-3 px-3 py-1 text-[11px] font-semibold rounded-full border ${statusStyles}`}
                    >
                        {project.active}
                    </span>
                </div>

                {/* Content */}
                <div className="relative p-4 space-y-3">
                    {/* Title + type/date */}
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="text-base font-semibold text-slate-50 leading-snug">
                                {project.projectname}
                            </h3>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                                {project.type}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-slate-500 uppercase tracking-[0.14em]">
                                Updated
                            </p>
                            <p className="text-xs text-slate-300">
                                {new Date(`2025-07-28`).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Tech stack */}
                    <div className="pt-2 border-t border-white/5">
                        <p className="text-[11px] text-slate-400 mb-2">Tech Stack</p>
                        <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((tech, index) => (
                                <StackBadge key={index} tech={tech} />
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500">
                            ID: <span className="text-slate-300">{sr + 1}</span>
                        </span>
                        <div className="flex items-center gap-3 text-xs">
                            <button
                                onClick={() => handleEdit(project._id)}
                                className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-100 transition"
                            >
                                <FiEdit className="text-sm" />
                                <span>Edit</span>
                            </button>

                            <button
                                onClick={() => handleDelete(project._id)}
                                className="inline-flex items-center gap-1 text-rose-300 hover:text-rose-100 transition"
                            >
                                <FiTrash className="text-sm" />
                                <span>Delete</span>
                            </button>



                        </div>
                    </div>
                </div>
            </article>
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-2 flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-cyan-400" />
                            Project Manager
                        </p>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 ring-1 ring-white/10 overflow-hidden">
                                <span className="absolute inset-0 bg-gradient-to-br from-cyan-500/40 via-indigo-500/40 to-emerald-500/30 opacity-70"></span>

                                {/* ICON REPLACE HERE */}
                                <FiFolder className="relative text-xl text-slate-100" />

                            </span>

                            <span>
                                My <span className="text-cyan-400">Projects</span>
                            </span>
                        </h1>

                        <p className="mt-2 text-sm text-slate-400 max-w-xl">
                            Manage all your portfolio projects in one place. Cards are
                            dummy-connected, you can later hook them to your backend.
                        </p>
                    </div>

                    {/* Add button */}
                    <div className="flex items-center gap-3">
                        <Link href="projects/add">
                            <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:scale-[1.02] transition">
                                <span className="text-lg">＋</span>
                                <span>Add New Project</span>
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {
                        projects.length == 0
                            ?
                            <div className='bg-red-400 w-full'>
                                No Projects Please a Projects...
                            </div>
                            :
                            projects.map((project, index) => (
                                <ProjectCard key={project._id} project={project} sr={index} />
                            ))

                    }
                </div>
            </div>
        </div>
    );
};

export default page;

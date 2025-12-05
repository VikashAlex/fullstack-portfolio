'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

const navItems = [
    { name: 'Dashboard', icon: '/admin/home.png', to: '/admin' },
    { name: 'Projects', icon: '/admin/project.png', to: '/admin/projects' },
    { name: 'Skills', icon: '/admin/skills.png', to: '/admin/skills' },
    { name: 'Settings', icon: '/admin/setting.png', to: '/admin/settings' },
];


function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
        <div
            className={`flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'}  bg-gray-800 text-white transition-all duration-300 ease-in-out fixed md:relative h-full z-10`}
        >
            <div className="flex items-center justify-center h-20 shadow-md">
                <span className="text-2xl font-extrabold tracking-wider text-cyan-400">
                    {isSidebarOpen ? 'Admin Console' : 'ADM'}
                </span>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.to}
                        className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 group"
                    >
                        <span className={`text-xl ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`}>
                            <img src={item.icon} alt={item.name} className='w-5 h-5' />
                        </span>
                        <span className={`whitespace-nowrap ${isSidebarOpen ? 'block' : 'hidden group-hover:block absolute left-20 bg-gray-700 p-2 rounded-md shadow-lg'}`}>
                            {item.name}
                        </span>
                    </Link>
                ))}
            </nav>

            {/* User Profile/Logout Section */}
            <div className="p-4 border-t border-gray-700 flex justify-between items-center">
                <button className="flex items-center text-gray-400 hover:text-white transition-colors">
                    <span className="text-2xl mr-3"><MdAdminPanelSettings /></span>
                    {isSidebarOpen && <span className="font-medium">Logout</span>}
                </button>

                {
                    isSidebarOpen ? <FaArrowAltCircleLeft size={25} onClick={()=>setIsSidebarOpen(false)} className='cursor-pointer' />: <FaArrowAltCircleRight size={25} onClick={()=>setIsSidebarOpen(true)} className='cursor-pointer' />
                }
            </div>
        </div>
    )
}

export default Sidebar
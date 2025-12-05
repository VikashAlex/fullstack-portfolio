'use client';
import { Axiosinstance, getCokies } from '@/app/utility/helper';
import React, { useEffect, useState } from 'react';
import { FiSave, FiSettings } from "react-icons/fi";
import { toast } from 'react-toastify';


const page = () => {
  const [settings, setSetting] = useState({
    _id: "",
    githubLink: "",
    linkedinLink: "",
    cvUrl: "",
    siteTitle: "",
    contactEmail: "",
    contactPhone: "",
    Experience: "",
    happyUser: "",
  })

  useEffect(() => {
    Axiosinstance.get('setting/get').then((res) => {
      if (res.data.success) {
        setSetting(res.data.data[0])
      }
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const handleSumit = (e) => {
    e.preventDefault()
    const token = getCokies('admin_token')
    Axiosinstance.put(`setting/update/${settings._id}`, settings, {
      headers: {
        Authorization: token
      }
    }).then((res) => {
      if (res.data.success) {
        toast.success(res.data.msg)
      }
    }).catch((err) => {
      console.log(err)
      toast.warning(err.response.data.msg)
    })
  };



  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-2 flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-cyan-400"></span> Control Panel
          </p>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <FiSettings className="text-cyan-400 text-3xl" />
            Website <span className="text-cyan-400">Settings</span>
          </h1>

          <p className="text-sm text-slate-400 max-w-xl mt-2">
            Manage portfolio links, contact preferences, and general metadata.
          </p>
        </div>

        <form
          onSubmit={handleSumit}
          className="grid gap-6 sm:grid-cols-2"
        >

          {/* ==== SECTION 1: Developer Links ==== */}
          <div className="p-6 rounded-2xl relative bg-slate-900/60 border border-white/5 shadow-xl backdrop-blur-xl">
            {/* Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/10 to-emerald-500/20 rounded-2xl blur-2xl opacity-50"></div>

            <div className="relative">
              <h2 className="text-xl font-bold mb-1">Developer Profile Links</h2>
              <p className="text-sm text-slate-400 mb-6">
                Link your coding & networking profiles.
              </p>

              {/* INPUT FIELDS */}
              <div className="space-y-4">

                {/* GitHub */}
                <div>
                  <label className="text-xs font-medium text-slate-300">GitHub Link</label>
                  <div className="relative group">
                    <div className="pointer-events-none absolute inset-0 border border-white/5 rounded-xl group-focus-within:border-cyan-400/70 transition"></div>
                    <input
                      type="url"
                      name="githubLink"
                      value={settings.githubLink}
                      onChange={(e) => setSetting(prev => ({
                        ...prev,
                        githubLink: e.target.value
                      }))}
                      placeholder="https://github.com/..."
                      className="w-full bg-slate-950/60 rounded-xl px-4 py-3 mt-1 text-sm placeholder:text-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="text-xs font-medium text-slate-300">LinkedIn Link</label>
                  <div className="relative group">
                    <div className="pointer-events-none absolute inset-0 border border-white/5 rounded-xl group-focus-within:border-indigo-400/70 transition"></div>
                    <input
                      type="url"
                      name="linkedinLink"
                      value={settings.linkedinLink}
                      onChange={(e) => setSetting(prev => ({
                        ...prev,
                        linkedinLink: e.target.value
                      }))}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full bg-slate-950/60 rounded-xl px-4 py-3 mt-1 text-sm placeholder:text-slate-500 focus:outline-none"
                    />
                  </div>
                </div>



              </div>
            </div>
          </div>


          {/* ==== SECTION 2: Resume & Contact ==== */}
          <div className="p-6 rounded-2xl relative bg-slate-900/60 border border-white/5 shadow-xl backdrop-blur-xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-cyan-500/10 to-purple-500/20 rounded-2xl blur-2xl opacity-50"></div>

            <div className="relative">
              <h2 className="text-xl font-bold mb-1">CV / Resume & Contact</h2>
              <p className="text-sm text-slate-400 mb-6">
                Update CV URL and contact details.
              </p>

              <div className="space-y-4">

                {/* CV URL */}
                <div>
                  <label className="text-xs font-medium text-slate-300">Resume Link</label>
                  <div className="relative group">
                    <input
                      type="url"
                      name="cvUrl"
                      value={settings.cvUrl}
                      placeholder="https://yourdomain.com/resume.pdf"
                      onChange={(e) => setSetting(prev => ({
                        ...prev,
                        cvUrl: e.target.value
                      }))}
                      className="w-full bg-slate-950/60 rounded-xl px-4 py-3 mt-1 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
                    />
                    <p className="text-[10px] mt-2 text-cyan-400">
                      Current: <a href={settings.cvUrl} target="_blank" className="underline">{settings.cvUrl}</a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-medium text-slate-300">Public Email</label>
                  <div className="relative group">
                    <input
                      type="email"
                      name="contactEmail"
                      value={settings.contactEmail}
                      onChange={(e) => setSetting(prev => ({
                        ...prev,
                        contactEmail: e.target.value
                      }))}
                      className="w-full bg-slate-950/60 rounded-xl px-4 py-3 mt-1 text-sm placeholder:text-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs font-medium text-slate-300">Phone</label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="contactPhone"
                      value={settings.contactPhone}
                      onChange={(e) => setSetting(prev => ({
                        ...prev,
                        contactPhone: e.target.value
                      }))}

                      className="w-full bg-slate-950/60 rounded-xl px-4 py-3 mt-1 text-sm placeholder:text-slate-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* ==== SECTION 3: General Website Info ==== */}
          <div className="p-6 rounded-2xl relative bg-slate-900/60 border border-white/5 shadow-xl backdrop-blur-xl col-span-2">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-cyan-500/10 to-emerald-500/20 rounded-2xl blur-2xl opacity-50"></div>

            <div className="relative">
              <h2 className="text-xl font-bold mb-1">General Website Info</h2>
              <p className="text-sm text-slate-400 mb-6">
                Control main title & portfolio identity elements.
              </p>

              <div className="mt-3 grid grid-cols-3 items-center gap-x-3">
                <div>
                  <label className="text-xs font-medium text-slate-300">Portfolio Title</label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="siteTitle"
                      value={settings.siteTitle}
                      onChange={(e) => setSetting(prev => ({
                        ...prev,
                        siteTitle: e.target.value
                      }))}
                      className="w-full bg-slate-950/60 rounded-xl px-4 py-3 mt-1 text-sm placeholder:text-slate-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300">Experience of Years/Month</label>
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder='Experience of Years/Month'
                      name="experience"
                      value={settings.Experience}
                      onChange={(e) => setSetting(prev => ({
                        ...prev,
                        Experience: e.target.value
                      }))}
                      className="w-full bg-slate-950/60 rounded-xl px-4 py-3 mt-1 text-sm placeholder:text-slate-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300">Happy Users</label>
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder='Happy Users'
                      name="happyuser"
                      value={settings.happyUser}
                      onChange={(e) => setSetting(prev => ({
                        ...prev,
                        happyUser: e.target.value
                      }))}
                      className="w-full bg-slate-950/60 rounded-xl px-4 py-3 mt-1 text-sm placeholder:text-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>


          {/* SAVE BUTTON */}
          <div className="col-span-2 text-right flex justify-end mt-4">
            <button
              type="submit"
              className="px-10 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-900 font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition flex items-center gap-2 justify-center"
            >
              <FiSave className="text-xl" />
              Save All Settings
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default page;

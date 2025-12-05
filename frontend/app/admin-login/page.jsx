'use client'
import React from 'react';
import { Axiosinstance } from '../utility/helper';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter()
    const Adminlogihandel = (e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        Axiosinstance.post(`/admin/login`, data).then((res) => {
            if (res.data.success) {
                toast.success(res.data.msg)
                document.cookie = `admin_token=${res.data.token}; path=/; max-age=${60 * 60 * 24}`;
                router.push('/admin')
            }
        }).catch((error) => {
            console.log(error)
            toast.warning(error.response.data.msg)
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 p-4">
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:shadow-cyan-500/50">
                <div className="text-center mb-8">
                    <svg className="w-12 h-12 mx-auto text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
                        Admin Panel Login
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Welcome back! Please enter your credentials.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={Adminlogihandel}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="admin@example.com"
                                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder="••••••••"
                                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                            />
                        </div>
                    </div>


                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-cyan-600 hover:text-cyan-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>


                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-150 ease-in-out"
                        >
                            Sign in as Admin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default page;
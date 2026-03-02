'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '../lib/api';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async () => {
        if (!form.email || !form.password) {
            toast.error('Please fill all fields');
            return;
        }
        setLoading(true);
        try {
            if (isLogin) {
                const response = await authApi.login(form);
                const { accessToken, role } = response.data.data;
                localStorage.setItem('token', accessToken);
                localStorage.setItem('role', role);
                toast.success('Logged in successfully!');
                if (role === 'admin') {
                    router.push('/admin');
                } else {
                    router.push('/');
                }
            } else {
                await authApi.register(form);
                toast.success('Registered successfully! Please login.');
                setIsLogin(true);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded-full" />
                        </div>
                        <span className="font-bold text-2xl text-gray-900">QuickHire</span>
                    </Link>
                    <p className="text-gray-500 mt-2 text-sm">
                        {isLogin ? 'Welcome back! Please login.' : 'Create your account.'}
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

                    {/* Tabs */}
                    <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors
                ${isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors
                ${!isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">

                        {/* Email */}
                        <input
                            type="email"
                            placeholder="admin@quickhire.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm transition-all text-gray-900"
                        />

                        {/* Password */}
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm transition-all text-gray-900"
                        />
                        {/* Submit */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 mt-2"
                        >
                            {loading
                                ? 'Please wait...'
                                : isLogin ? 'Login' : 'Create Account'
                            }
                        </button>

                    </div>


                    {/* Back to home */}
                    <div className="mt-6 text-center">
                        <Link href="/" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                            ← Back to home
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
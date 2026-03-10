'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        setIsLoggedIn(!!token);
        setIsAdmin(role === 'admin');
    }, [pathname]); // re-runs on every page change

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        setIsAdmin(false);
        router.push('/');
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo + Nav Links */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                                <div className="w-3 h-3 bg-white rounded-full" />
                            </div>
                            <span className="font-bold text-xl text-gray-900">QuickHire</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/jobs" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                                Find Jobs
                            </Link>
                            <Link href="/companies" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                                Browse Companies
                            </Link>
                            {isAdmin && (
                                <Link href="/admin" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                                    Admin Panel
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-4">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-4">
                                {isAdmin && (
                                    <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full font-medium">
                                        Admin
                                    </span>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-indigo-600 hover:text-indigo-700 transition-colors font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-indigo-600 hover:text-indigo-700 transition-colors font-semibold"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/login"
                                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
}
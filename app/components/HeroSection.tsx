'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (location) params.set('location', location);
        router.push(`/jobs?${params.toString()}`);
    };

    return (
        <section className="bg-white py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">

                    {/* Left Content */}
                    <div className="flex-1 max-w-xl">
                        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
                            Discover <br /> more than <br />
                            <span className="text-indigo-600">5000+ Jobs</span>
                        </h1>
                        <p className="text-gray-500 mb-8 text-base">
                            Great platform for the job seeker that searching for new career
                            heights and passionate about startups.
                        </p>

                        {/* Search Bar */}
                        <div className="flex flex-col sm:flex-row gap-3 bg-white shadow-lg rounded-xl p-3 border border-gray-100">
                            {/* Job Title Input */}
                            <div className="flex items-center gap-2 flex-1 px-3">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Job title or keyword"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm"
                                />
                            </div>

                            {/* Divider */}
                            <div className="hidden sm:block w-px bg-gray-200" />

                            {/* Location Input */}
                            <div className="flex items-center gap-2 flex-1 px-3">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm"
                                />
                            </div>

                            {/* Search Button */}
                            <button
                                onClick={handleSearch}
                                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap"
                            >
                                Search my job
                            </button>
                        </div>

                        {/* Popular Tags */}
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            <span className="text-gray-500 text-sm">Popular:</span>
                            {['UI Designer', 'UX Researcher', 'Android', 'Admin'].map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => {
                                        setSearch(tag);
                                        router.push(`/jobs?search=${tag}`);
                                    }}
                                    className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors"
                                >
                                    {tag},
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="flex-1 flex justify-center">
                        <div className="relative w-80 h-80 bg-indigo-50 rounded-full flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-6xl mb-2">👨‍💼</div>
                                <p className="text-indigo-600 font-semibold">Find Your Dream Job</p>
                            </div>
                            {/* Decorative circles */}
                            <div className="absolute top-4 right-4 w-12 h-12 bg-indigo-100 rounded-full opacity-60" />
                            <div className="absolute bottom-8 left-4 w-8 h-8 bg-indigo-200 rounded-full opacity-60" />
                        </div>
                    </div>

                </div>

                {/* Companies */}
                <div className="mt-16 border-t pt-10">
                    <p className="text-gray-400 text-sm mb-6">Companies we helped grow</p>
                    <div className="flex flex-wrap items-center gap-8 opacity-60">
                        {['Vodafone', 'Intel', 'TESLA', 'AMD', 'Talkit'].map((company) => (
                            <span key={company} className="text-gray-500 font-bold text-lg tracking-wider">
                                {company}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
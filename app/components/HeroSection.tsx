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
        <section className="bg-gray-50 py-20 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">

                    {/* Left Content */}
                    <div className="flex-1 max-w-xl">
                        <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Discover <br />
                            more than <br />
                            <span className="text-indigo-500 relative inline-block">
                                5000+ Jobs
                                {/* Blue underline */}
                                <svg
                                    className="absolute -bottom-3 left-0 w-full"
                                    viewBox="0 0 300 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2 8.5C50 3 100 1 150 3.5C200 6 250 8 298 5"
                                        stroke="#3B82F6"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                        </h1>

                        <p className="text-gray-500 mb-10 text-base mt-8">
                            Great platform for the job seeker that searching for <br />
                            new career heights and passionate about startups.
                        </p>

                        {/* Search Bar */}
                        <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                            {/* Job Title Input */}
                            <div className="flex items-center gap-2 flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-200">
                                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Job title or keyword"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm bg-transparent"
                                />
                            </div>

                            {/* Location Input */}
                            <div className="flex items-center gap-2 flex-1 px-4 py-3 border-b sm:border-b-0 border-gray-200">
                                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Florence, Italy"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm bg-transparent"
                                />
                                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {/* Search Button */}
                            <button
                                onClick={handleSearch}
                                className="bg-indigo-600 text-white px-8 py-3 font-semibold hover:bg-indigo-700 transition-colors whitespace-nowrap"
                            >
                                Search my job
                            </button>
                        </div>

                        {/* Popular Tags */}
                        <div className="mt-5 flex flex-wrap items-center gap-2">
                            <span className="text-gray-500 text-sm">Popular :</span>
                            {['UI Designer', 'UX Researcher', 'Android', 'Admin'].map((tag, index) => (
                                <button
                                    key={tag}
                                    onClick={() => router.push(`/jobs?search=${tag}`)}
                                    className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                                >
                                    {tag}{index < 3 ? ',' : ''}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right — Person Image */}
                    <div className="flex-1 justify-end relative hidden md:flex">
                        <div className="relative w-full max-w-lg flex items-center justify-center">

                            {/* Geometric background lines */}
                            <svg
                                className="absolute top-0 right-0 w-full h-full opacity-30 z-0"
                                viewBox="0 0 400 450"
                                fill="none"
                            >
                                <rect x="120" y="30" width="220" height="220" rx="4" stroke="#818CF8" strokeWidth="1" transform="rotate(10 220 140)" />
                                <rect x="150" y="60" width="180" height="180" rx="4" stroke="#818CF8" strokeWidth="1" transform="rotate(10 220 140)" />
                                <rect x="90" y="10" width="260" height="260" rx="4" stroke="#C7D2FE" strokeWidth="0.5" transform="rotate(10 220 140)" />
                            </svg>

                            {/* SVG Person Illustration */}
                            <svg
                                className="relative z-10 w-80 h-auto"
                                viewBox="0 0 400 500"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Body */}
                                <rect x="130" y="220" width="140" height="180" rx="20" fill="#4F46E5" />
                                {/* Shirt collar */}
                                <path d="M175 220 L200 260 L225 220" fill="white" opacity="0.3" />
                                {/* Head */}
                                <circle cx="200" cy="160" r="60" fill="#FBBF24" />
                                {/* Hair */}
                                <ellipse cx="200" cy="108" rx="55" ry="20" fill="#1F2937" />
                                {/* Eyes */}
                                <circle cx="182" cy="155" r="6" fill="white" />
                                <circle cx="218" cy="155" r="6" fill="white" />
                                <circle cx="184" cy="157" r="3" fill="#1F2937" />
                                <circle cx="220" cy="157" r="3" fill="#1F2937" />
                                {/* Smile */}
                                <path d="M183 175 Q200 190 217 175" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />
                                {/* Left Arm pointing */}
                                <path d="M130 240 Q80 220 50 200" stroke="#FBBF24" strokeWidth="28" strokeLinecap="round" />
                                {/* Right Arm */}
                                <path d="M270 240 Q300 260 290 290" stroke="#FBBF24" strokeWidth="28" strokeLinecap="round" />
                                {/* Legs */}
                                <rect x="150" y="390" width="40" height="80" rx="10" fill="#1F2937" />
                                <rect x="210" y="390" width="40" height="80" rx="10" fill="#1F2937" />
                                {/* Shoes */}
                                <ellipse cx="170" cy="468" rx="30" ry="12" fill="#111827" />
                                <ellipse cx="230" cy="468" rx="30" ry="12" fill="#111827" />

                                {/* Floating card 1 */}
                                <rect x="20" y="180" width="100" height="50" rx="10" fill="white" filter="url(#shadow)" />
                                <circle cx="45" cy="205" r="12" fill="#EEF2FF" />
                                <rect x="65" y="196" width="45" height="6" rx="3" fill="#E5E7EB" />
                                <rect x="65" y="208" width="35" height="5" rx="3" fill="#E5E7EB" />

                                {/* Floating card 2 */}
                                <rect x="280" y="150" width="110" height="55" rx="10" fill="white" filter="url(#shadow)" />
                                <circle cx="305" cy="178" r="12" fill="#EEF2FF" />
                                <rect x="325" y="168" width="50" height="6" rx="3" fill="#E5E7EB" />
                                <rect x="325" y="180" width="40" height="5" rx="3" fill="#E5E7EB" />

                                {/* Badge */}
                                <rect x="260" y="300" width="120" height="40" rx="20" fill="#4F46E5" />
                                <text x="320" y="325" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">5000+ Jobs</text>

                                <defs>
                                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.1" />
                                    </filter>
                                </defs>
                            </svg>

                        </div>
                    </div>
                </div>

                {/* Companies */}
                {/* Companies */}
                <div className="mt-16 pt-10 border-t border-gray-200">
                    <p className="text-gray-400 text-sm mb-8">Companies we helped grow</p>
                    <div className="flex items-center justify-between w-full">

                        {/* Vodafone */}
                        <div className="flex items-center gap-2 text-gray-300">
                            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-gray-300">
                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4c1.38 0 2.5 1.12 2.5 2.5S13.38 9 12 9 9.5 7.88 9.5 6.5 10.62 4 12 4zm0 14c-3.31 0-6-1.343-6-3v-1c0-1.657 2.69-3 6-3s6 1.343 6 3v1c0 1.657-2.69 3-6 3z" />
                            </svg>
                            <span className="font-black text-2xl tracking-wide">vodafone</span>
                        </div>

                        {/* Intel */}
                        <div className="text-gray-300">
                            <span className="font-black text-2xl tracking-wide">intel.</span>
                        </div>

                        {/* Tesla */}
                        <div className="text-gray-300">
                            <span className="font-black text-2xl tracking-[0.25em]">TESLA</span>
                        </div>

                        {/* AMD */}
                        <div className="flex items-center text-gray-300">
                            <span className="font-black text-2xl tracking-wide">AMD</span>
                            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-gray-300 ml-0.5">
                                <path d="M24 24H12L0 12 12 0h12v12L12 12z" />
                            </svg>
                        </div>

                        {/* Talkit */}
                        <div className="text-gray-300">
                            <span className="font-black text-2xl tracking-wide">Talkit</span>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
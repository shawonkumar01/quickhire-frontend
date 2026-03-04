'use client';

import { useEffect, useState } from 'react';
import { jobsApi } from '../lib/api';
import { Job } from '../types';
import Link from 'next/link';
import Footer from '../components/Footer';

interface Company {
    name: string;
    jobs: Job[];
    category: string;
    location: string;
}

export default function CompaniesPage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await jobsApi.getAll();
                const jobs: Job[] = response.data.data;

                // Group jobs by company
                const companyMap: Record<string, Company> = {};
                jobs.forEach((job) => {
                    if (!companyMap[job.company]) {
                        companyMap[job.company] = {
                            name: job.company,
                            jobs: [],
                            category: job.category,
                            location: job.location,
                        };
                    }
                    companyMap[job.company].jobs.push(job);
                });

                setCompanies(Object.values(companyMap));
            } catch (error) {
                console.error('Failed to fetch companies:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCompanies();
    }, []);

    const categoryIcons: Record<string, string> = {
        Marketing: '📢',
        Design: '🎨',
        Business: '💼',
        Engineering: '⚙️',
        Technology: '💻',
        Finance: '💰',
        Sales: '📊',
        'Human Resource': '👥',
    };

    const categoryColors: Record<string, string> = {
        Marketing: 'bg-green-100 text-green-700',
        Design: 'bg-pink-100 text-pink-700',
        Business: 'bg-orange-100 text-orange-700',
        Engineering: 'bg-blue-100 text-blue-700',
        Technology: 'bg-purple-100 text-purple-700',
        Finance: 'bg-yellow-100 text-yellow-700',
        Sales: 'bg-red-100 text-red-700',
        'Human Resource': 'bg-teal-100 text-teal-700',
    };

    const filtered = companies.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <div className="bg-white border-b border-gray-200 py-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Browse <span className="text-indigo-600">Companies</span>
                    </h1>
                    <p className="text-gray-500 mb-6">
                        Discover great companies hiring right now
                    </p>

                    {/* Search */}
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-3 max-w-md shadow-sm">
                        <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search companies..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full outline-none text-gray-900 placeholder-gray-400 text-sm bg-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-10">

                {/* Results count */}
                <p className="text-gray-500 text-sm mb-6">
                    Showing <span className="font-semibold text-gray-900">{filtered.length}</span> companies
                </p>

                {/* Loading */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl p-6 animate-pulse border border-gray-200">
                                <div className="w-16 h-16 bg-gray-200 rounded-xl mb-4" />
                                <div className="h-4 bg-gray-200 rounded mb-2 w-2/3" />
                                <div className="h-3 bg-gray-200 rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Companies Grid */}
                {!loading && filtered.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((company) => (
                            <div
                                key={company.name}
                                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all group"
                            >
                                {/* Company Logo */}
                                <div className="w-16 h-16 bg-indigo-50 rounded-xl flex items-center justify-center text-3xl mb-4">
                                    {categoryIcons[company.category] || '🏢'}
                                </div>

                                {/* Company Info */}
                                <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-indigo-600 transition-colors">
                                    {company.name}
                                </h3>
                                <p className="text-gray-500 text-sm mb-1">📍 {company.location}</p>

                                {/* Category */}
                                <span className={`text-xs px-3 py-1 rounded-full font-medium ${categoryColors[company.category] || 'bg-gray-100 text-gray-600'}`}>
                                    {company.category}
                                </span>

                                {/* Jobs count */}
                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <p className="text-sm text-gray-500">
                                        <span className="font-semibold text-gray-900">{company.jobs.length}</span> open positions
                                    </p>
                                    <Link
                                        href={`/jobs?search=${encodeURIComponent(company.name)}`}
                                        className="text-xs text-indigo-600 font-semibold hover:underline"
                                    >
                                        View Jobs →
                                    </Link>
                                </div>

                                {/* Job titles preview */}
                                <div className="mt-3 space-y-1">
                                    {company.jobs.slice(0, 2).map((job) => (
                                        <Link
                                            key={job.id}
                                            href={`/jobs/${job.id}`}
                                            className="block text-xs text-gray-500 hover:text-indigo-600 transition-colors truncate"
                                        >
                                            • {job.title}
                                        </Link>
                                    ))}
                                    {company.jobs.length > 2 && (
                                        <p className="text-xs text-gray-400">
                                            +{company.jobs.length - 2} more
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty */}
                {!loading && filtered.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-5xl mb-4">🏢</p>
                        <p className="text-gray-500 text-lg font-medium">No companies found</p>
                        <p className="text-gray-400 text-sm mt-2">Try a different search</p>
                    </div>
                )}

            </div>

            <Footer />
        </div>
    );
}
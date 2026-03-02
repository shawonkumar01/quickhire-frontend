'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jobsApi } from '../lib/api';
import { Job } from '../types';
import Link from 'next/link';

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

export default function LatestJobsSection() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await jobsApi.getAll();
                setJobs(response.data.data.slice(0, 8));
            } catch (error) {
                console.error('Failed to fetch jobs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Latest <span className="text-indigo-600">jobs open</span>
                    </h2>
                    <button
                        onClick={() => router.push('/jobs')}
                        className="text-indigo-600 hover:underline text-sm font-medium"
                    >
                        Show all jobs →
                    </button>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-5 animate-pulse flex gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0" />
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
                                    <div className="h-3 bg-gray-200 rounded mb-2 w-1/2" />
                                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Jobs List — 2 columns */}
                {!loading && jobs.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {jobs.map((job) => {
                            const colorClass = categoryColors[job.category] || 'bg-gray-100 text-gray-700';
                            const icon = categoryIcons[job.category] || '💼';

                            return (
                                <Link key={job.id} href={`/jobs/${job.id}`}>
                                    <div className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group">

                                        {/* Icon */}
                                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                                            {icon}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors truncate">
                                                {job.title}
                                            </h3>
                                            <p className="text-gray-500 text-xs truncate">
                                                {job.company} • {job.location}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">
                                                    {job.jobType || 'Full Time'}
                                                </span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colorClass}`}>
                                                    {job.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <div className="text-gray-300 group-hover:text-indigo-600 transition-colors text-xl">
                                            →
                                        </div>

                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* Empty State */}
                {!loading && jobs.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-4xl mb-4">💼</p>
                        <p className="text-gray-500 text-lg">No jobs posted yet</p>
                    </div>
                )}

            </div>
        </section>
    );
}
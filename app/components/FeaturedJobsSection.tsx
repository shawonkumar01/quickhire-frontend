'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jobsApi } from '../lib/api';
import { Job } from '../types';
import JobCard from './JobCard';

export default function FeaturedJobsSection() {
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
        <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Featured <span className="text-indigo-600">jobs</span>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl p-5 animate-pulse">
                                <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4" />
                                <div className="h-4 bg-gray-200 rounded mb-2" />
                                <div className="h-3 bg-gray-200 rounded mb-2 w-2/3" />
                                <div className="h-3 bg-gray-200 rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Jobs Grid */}
                {!loading && jobs.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {jobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && jobs.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-4xl mb-4">💼</p>
                        <p className="text-gray-500 text-lg">No jobs posted yet</p>
                        <p className="text-gray-400 text-sm mt-2">Check back later for new opportunities</p>
                    </div>
                )}

            </div>
        </section>
    );
}
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { jobsApi } from '../lib/api';
import { Job } from '../types';
import JobCard from '../components/JobCard';
import Footer from '../components/Footer';

const categories = ['All', 'Design', 'Sales', 'Marketing', 'Finance', 'Technology', 'Engineering', 'Business', 'Human Resource'];
const locations = ['All', 'Dhaka', 'Chittagong', 'Sylhet', 'Remote'];
const jobTypes = ['All', 'full-time', 'part-time', 'remote'];

export default function JobsPage() {
    const searchParams = useSearchParams();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [category, setCategory] = useState(searchParams.get('category') || 'All');
    const [location, setLocation] = useState(searchParams.get('location') || 'All');
    const [jobType, setJobType] = useState('All');

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const params: any = {};
            if (search) params.search = search;
            if (category && category !== 'All') params.category = category;
            if (location && location !== 'All') params.location = location;
            const response = await jobsApi.getAll(params);
            let data = response.data.data;
            if (jobType !== 'All') {
                data = data.filter((job: Job) => job.jobType === jobType);
            }
            setJobs(data);
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [category, location]);

    const handleSearch = () => fetchJobs();

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Page Header */}
            <div className="bg-white border-b border-gray-200 py-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Find your <span className="text-indigo-600">dream job</span>
                    </h1>
                    <p className="text-gray-500">Find your next career at companies like HubSpot, Nike, and Dropbox</p>

                    {/* Search Bar */}
                    <div className="flex flex-col sm:flex-row gap-0 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mt-6 max-w-3xl">
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
                        <button
                            onClick={handleSearch}
                            className="bg-indigo-600 text-white px-8 py-3 font-semibold hover:bg-indigo-700 transition-colors"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <div className="w-full md:w-64 shrink-0">

                        {/* Category Filter */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
                            <h3 className="font-semibold text-gray-900 mb-4">Category</h3>
                            <div className="space-y-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                      ${category === cat
                                                ? 'bg-indigo-50 text-indigo-600 font-semibold'
                                                : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Location Filter */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
                            <h3 className="font-semibold text-gray-900 mb-4">Location</h3>
                            <div className="space-y-2">
                                {locations.map((loc) => (
                                    <button
                                        key={loc}
                                        onClick={() => setLocation(loc)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                      ${location === loc
                                                ? 'bg-indigo-50 text-indigo-600 font-semibold'
                                                : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {loc}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Job Type Filter */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <h3 className="font-semibold text-gray-900 mb-4">Job Type</h3>
                            <div className="space-y-2">
                                {jobTypes.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setJobType(type)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                      ${jobType === type
                                                ? 'bg-indigo-50 text-indigo-600 font-semibold'
                                                : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Jobs Grid */}
                    <div className="flex-1">

                        {/* Results count */}
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-500 text-sm">
                                Showing <span className="font-semibold text-gray-900">{jobs.length}</span> jobs
                                {search && <span> for "<span className="text-indigo-600">{search}</span>"</span>}
                                {category !== 'All' && <span> in <span className="text-indigo-600">{category}</span></span>}
                            </p>
                        </div>

                        {/* Loading */}
                        {loading && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-xl p-5 animate-pulse">
                                        <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4" />
                                        <div className="h-4 bg-gray-200 rounded mb-2" />
                                        <div className="h-3 bg-gray-200 rounded mb-2 w-2/3" />
                                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Jobs */}
                        {!loading && jobs.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {jobs.map((job) => (
                                    <JobCard key={job.id} job={job} />
                                ))}
                            </div>
                        )}

                        {/* Empty */}
                        {!loading && jobs.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-5xl mb-4">🔍</p>
                                <p className="text-gray-500 text-lg font-medium">No jobs found</p>
                                <p className="text-gray-400 text-sm mt-2">Try different keywords or filters</p>
                                <button
                                    onClick={() => { setSearch(''); setCategory('All'); setLocation('All'); setJobType('All'); }}
                                    className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jobsApi, applicationsApi } from '../lib/api';
import { Job, Application } from '../types';
import toast from 'react-hot-toast';
import Footer from '../components/Footer';

export default function AdminPage() {
    const router = useRouter();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        title: '',
        company: '',
        location: '',
        category: '',
        description: '',
        salary: '',
        jobType: 'full-time',
    });

    const categories = ['Design', 'Sales', 'Marketing', 'Finance', 'Technology', 'Engineering', 'Business', 'Human Resource'];
    const jobTypes = ['full-time', 'part-time', 'remote', 'contract'];

    useEffect(() => {
        const role = localStorage.getItem('role');
        const token = localStorage.getItem('token');
        if (!token || role !== 'admin') {
            toast.error('Admin access required');
            router.push('/login');
            return;
        }
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [jobsRes, appsRes] = await Promise.all([
                jobsApi.getAll(),
                applicationsApi.getAll(),
            ]);
            setJobs(jobsRes.data.data);
            setApplications(appsRes.data.data);
        } catch (error) {
            toast.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateJob = async () => {
        if (!form.title || !form.company || !form.location || !form.category || !form.description) {
            toast.error('Please fill all required fields');
            return;
        }
        setSubmitting(true);
        try {
            await jobsApi.create(form);
            toast.success('Job created successfully!');
            setShowForm(false);
            setForm({ title: '', company: '', location: '', category: '', description: '', salary: '', jobType: 'full-time' });
            fetchData();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Failed to create job');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteJob = async (id: number, title: string) => {
        if (!confirm(`Delete "${title}"?`)) return;
        try {
            await jobsApi.delete(id);
            toast.success('Job deleted!');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete job');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Admin Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                        <p className="text-gray-500 text-sm">Manage your job listings and applications</p>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                        + Post New Job
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <p className="text-gray-500 text-sm mb-1">Total Jobs</p>
                        <p className="text-3xl font-black text-indigo-600">{jobs.length}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <p className="text-gray-500 text-sm mb-1">Total Applications</p>
                        <p className="text-3xl font-black text-green-600">{applications.length}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <p className="text-gray-500 text-sm mb-1">Active Categories</p>
                        <p className="text-3xl font-black text-orange-600">
                            {new Set(jobs.map((j) => j.category)).size}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('jobs')}
                        className={`px-5 py-2 rounded-lg font-semibold text-sm transition-colors ${activeTab === 'jobs'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'
                            }`}
                    >
                        Jobs ({jobs.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('applications')}
                        className={`px-5 py-2 rounded-lg font-semibold text-sm transition-colors ${activeTab === 'applications'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'
                            }`}
                    >
                        Applications ({applications.length})
                    </button>
                </div>

                {/* Jobs Tab */}
                {activeTab === 'jobs' && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Job</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {jobs.map((job) => (
                                    <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-gray-900 text-sm">{job.title}</p>
                                            <p className="text-gray-500 text-xs">{job.company}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full font-medium">
                                                {job.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{job.location}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{job.jobType}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(job.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => router.push(`/jobs/${job.id}`)}
                                                    className="text-xs px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteJob(job.id, job.title)}
                                                    className="text-xs px-3 py-1.5 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {jobs.length === 0 && (
                            <div className="text-center py-16">
                                <p className="text-4xl mb-3">💼</p>
                                <p className="text-gray-500">No jobs posted yet</p>
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
                                >
                                    Post First Job
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Applications Tab */}
                {activeTab === 'applications' && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Applicant</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Job ID</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Resume</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Cover Note</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-gray-900 text-sm">{app.name}</p>
                                            <p className="text-gray-500 text-xs">{app.email}</p>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full font-medium">
                                                Job #{app.job_id}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <a
                                                href={app.resume_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-indigo-600 hover:underline"
                                            >
                                                View Resume →
                                            </a>
                                        </td>

                                        <td className="px-6 py-4">
                                            <p className="text-xs text-gray-500 max-w-xs truncate">
                                                {app.cover_note || "—"}
                                            </p>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(app.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {applications.length === 0 && (
                            <div className="text-center py-16">
                                <p className="text-4xl mb-3">📋</p>
                                <p className="text-gray-500">No applications yet</p>
                            </div>
                        )}
                    </div>
                )}

            </div>

            {/* Create Job Modal */}
            {
                showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Post New Job</h2>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="text-gray-400 hover:text-gray-600 text-2xl"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Job Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Frontend Developer"
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 text-sm text-gray-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Company <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Qtec Solution Ltd"
                                        value={form.company}
                                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 text-sm text-gray-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Location <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Dhaka, Bangladesh"
                                        value={form.location}
                                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 text-sm text-gray-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 text-sm text-gray-900"
                                    >
                                        <option value="">Select category</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Job Type
                                    </label>
                                    <select
                                        value={form.jobType}
                                        onChange={(e) => setForm({ ...form, jobType: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 text-sm text-gray-900"
                                    >
                                        {jobTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Salary (optional)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 50,000 - 80,000 BDT"
                                        value={form.salary}
                                        onChange={(e) => setForm({ ...form, salary: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 text-sm text-gray-900"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        placeholder="Describe the job role, responsibilities and requirements..."
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 text-sm text-gray-900 resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateJob}
                                    disabled={submitting}
                                    className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
                                >
                                    {submitting ? 'Creating...' : 'Create Job'}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            <Footer />
        </div >
    );
}
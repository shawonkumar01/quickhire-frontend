'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { jobsApi, applicationsApi } from '../../lib/api';
import { Job } from '../../types';
import Footer from '../../components/Footer';
import toast from 'react-hot-toast';

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

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    resume_link: '',
    cover_note: '',
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await jobsApi.getOne(Number(id));
        setJob(response.data.data);
      } catch (error) {
        toast.error('Job not found');
        router.push('/jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!form.name || !form.email || !form.resume_link) {
      toast.error('Please fill all required fields');
      return;
    }
    setApplying(true);
    try {
      await applicationsApi.submit({
        job_id: Number(id),
        ...form,
      });
      toast.success('Application submitted successfully!');
      setShowForm(false);
      setForm({ name: '', email: '', resume_link: '', cover_note: '' });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!job) return null;

  const icon = categoryIcons[job.category] || '💼';
  const colorClass = categoryColors[job.category] || 'bg-gray-100 text-gray-700';

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-4 text-sm"
          >
            ← Back to jobs
          </button>
          <p className="text-gray-400 text-sm">
            Home → Jobs → <span className="text-gray-700">{job.title}</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left — Job Details */}
          <div className="flex-1">

            {/* Job Header Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-indigo-50 rounded-xl flex items-center justify-center text-3xl">
                    {icon}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                    <p className="text-gray-500">{job.company}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors whitespace-nowrap"
                >
                  Apply Now →
                </button>
              </div>

              {/* Tags Row */}
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  📍 {job.location}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${colorClass}`}>
                  {job.category}
                </span>
                <span className="text-xs px-3 py-1 rounded-full font-medium bg-indigo-50 text-indigo-600">
                  {job.jobType || 'Full Time'}
                </span>
                {job.salary && (
                  <span className="text-xs px-3 py-1 rounded-full font-medium bg-green-50 text-green-600">
                    💰 {job.salary}
                  </span>
                )}
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setShowForm(true)}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Apply For This Job →
                </button>
              </div>
            </div>

          </div>

          {/* Right — Job Summary */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-6">Job Overview</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Date Posted</p>
                    <p className="text-sm font-medium text-gray-700">
                      {new Date(job.created_at).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Location</p>
                    <p className="text-sm font-medium text-gray-700">{job.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">💼</span>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Job Type</p>
                    <p className="text-sm font-medium text-gray-700">{job.jobType || 'Full Time'}</p>
                  </div>
                </div>

                {job.salary && (
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Salary</p>
                      <p className="text-sm font-medium text-gray-700">{job.salary}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <span className="text-2xl">🏢</span>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Company</p>
                    <p className="text-sm font-medium text-gray-700">{job.company}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">📂</span>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Category</p>
                    <p className="text-sm font-medium text-gray-700">{job.category}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowForm(true)}
                className="w-full mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Apply Now →
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Apply Now Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Apply for {job.title}</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              {/* Resume Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resume Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/your-resume"
                  value={form.resume_link}
                  onChange={(e) => setForm({ ...form, resume_link: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              {/* Cover Note */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Note
                </label>
                <textarea
                  placeholder="Tell us why you are a great fit..."
                  value={form.cover_note}
                  onChange={(e) => setForm({ ...form, cover_note: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 text-sm resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  disabled={applying}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
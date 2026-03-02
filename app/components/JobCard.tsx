import Link from 'next/link';
import { Job } from '../types';

interface JobCardProps {
    job: Job;
}

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

export default function JobCard({ job }: JobCardProps) {
    const colorClass = categoryColors[job.category] || 'bg-gray-100 text-gray-700';
    const icon = categoryIcons[job.category] || '💼';

    return (
        <Link href={`/jobs/${job.id}`}>
            <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all cursor-pointer group">

                {/* Top Row */}
                <div className="flex justify-between items-start mb-4">
                    {/* Company Logo */}
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-2xl">
                        {icon}
                    </div>
                    {/* Job Type Badge */}
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
                        {job.jobType || 'Full Time'}
                    </span>
                </div>

                {/* Job Info */}
                <h3 className="font-semibold text-gray-900 text-base mb-1 group-hover:text-indigo-600 transition-colors">
                    {job.title}
                </h3>
                <p className="text-gray-500 text-sm mb-1">{job.company}</p>
                <p className="text-gray-400 text-sm mb-3">📍 {job.location}</p>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {job.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${colorClass}`}>
                        {job.category}
                    </span>
                    {job.salary && (
                        <span className="text-xs px-3 py-1 rounded-full font-medium bg-gray-100 text-gray-600">
                            {job.salary}
                        </span>
                    )}
                </div>

            </div>
        </Link>
    );
}
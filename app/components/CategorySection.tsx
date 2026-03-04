'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jobsApi } from '../lib/api';
import { Job } from '../types';

const categoryList = [
  { name: 'Design', icon: '🎨' },
  { name: 'Sales', icon: '📊' },
  { name: 'Marketing', icon: '📢' },
  { name: 'Finance', icon: '💰' },
  { name: 'Technology', icon: '💻' },
  { name: 'Engineering', icon: '⚙️' },
  { name: 'Business', icon: '💼' },
  { name: 'Human Resource', icon: '👥' },
];

export default function CategorySection() {
  const router = useRouter();
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await jobsApi.getAll();
        const jobs: Job[] = response.data.data;

        const counts: Record<string, number> = {};
        jobs.forEach((job) => {
          counts[job.category] = (counts[job.category] || 0) + 1;
        });

        setCategoryCounts(counts);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Explore by <span className="text-indigo-600">category</span>
          </h2>
          <button
            onClick={() => router.push('/jobs')}
            className="text-indigo-600 hover:underline text-sm font-medium flex items-center gap-1"
          >
            Show all jobs →
          </button>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categoryList.map((cat, index) => {
            const count = categoryCounts[cat.name] || 0;
            return (
              <button
                key={cat.name}
                onClick={() => router.push(`/jobs?category=${cat.name}`)}
                className={`p-6 rounded-xl border text-left transition-all hover:shadow-md group
                  ${index === 2
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-800 border-gray-200 hover:border-indigo-300'
                  }`}
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className={`font-semibold text-base mb-1 
                  ${index === 2 ? 'text-white' : 'text-gray-900'}`}>
                  {cat.name}
                </h3>
                <p className={`text-sm flex items-center gap-1
                  ${index === 2 ? 'text-indigo-200' : 'text-gray-500'}`}>
                  {loading ? '...' : `${count} jobs available`} →
                </p>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
'use client';

import { useRouter } from 'next/navigation';

const categories = [
    { name: 'Design', icon: '🎨', jobs: 235 },
    { name: 'Sales', icon: '📊', jobs: 756 },
    { name: 'Marketing', icon: '📢', jobs: 140 },
    { name: 'Finance', icon: '💰', jobs: 325 },
    { name: 'Technology', icon: '💻', jobs: 436 },
    { name: 'Engineering', icon: '⚙️', jobs: 542 },
    { name: 'Business', icon: '💼', jobs: 211 },
    { name: 'Human Resource', icon: '👥', jobs: 346 },
];

export default function CategorySection() {
    const router = useRouter();

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
                    {categories.map((cat, index) => (
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
                                {cat.jobs} jobs available →
                            </p>
                        </button>
                    ))}
                </div>

            </div>
        </section>
    );
}
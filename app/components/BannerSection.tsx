import Link from 'next/link';

export default function BannerSection() {
    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="bg-indigo-600 rounded-2xl overflow-hidden flex flex-col md:flex-row items-center">

                    {/* Left Content */}
                    <div className="flex-1 p-12">
                        <h2 className="text-4xl font-black text-white leading-tight mb-4">
                            Start posting <br /> jobs today
                        </h2>
                        <p className="text-indigo-200 mb-8 text-base">
                            Start posting jobs for only $10.
                        </p>
                        <Link
                            href="/login"
                            className="inline-block px-6 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-colors"
                        >
                            Sign Up For Free
                        </Link>
                    </div>

                    {/* Right — Dashboard Preview */}
                    <div className="flex-1 flex justify-end items-end p-6 relative">
                        {/* Dashboard mockup */}
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-4 transform translate-y-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-800">QuickHire</span>
                                </div>
                                <button className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-lg font-medium">
                                    + Post a job
                                </button>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <div className="bg-indigo-500 rounded-lg p-2 text-center">
                                    <p className="text-white font-black text-lg">76</p>
                                    <p className="text-indigo-200 text-xs">Candidates</p>
                                </div>
                                <div className="bg-teal-500 rounded-lg p-2 text-center">
                                    <p className="text-white font-black text-lg">3</p>
                                    <p className="text-teal-200 text-xs">Scheduled</p>
                                </div>
                                <div className="bg-blue-400 rounded-lg p-2 text-center">
                                    <p className="text-white font-black text-lg">24</p>
                                    <p className="text-blue-100 text-xs">Messages</p>
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                <p className="text-xs font-semibold text-gray-600 mb-2">Job statistics</p>
                                <div className="flex items-end gap-1 h-16">
                                    {[40, 65, 45, 80, 55, 70, 45, 60].map((h, i) => (
                                        <div key={i} className="flex-1 flex flex-col gap-0.5 items-center">
                                            <div
                                                className="w-full rounded-sm bg-indigo-400 opacity-60"
                                                style={{ height: `${h * 0.4}px` }}
                                            />
                                            <div
                                                className="w-full rounded-sm bg-yellow-400"
                                                style={{ height: `${h * 0.25}px` }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Stats */}
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-xs text-gray-500">Job Views</p>
                                    <p className="text-sm font-black text-gray-800">2,342</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Job Applied</p>
                                    <p className="text-sm font-black text-gray-800">654</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Job Open</p>
                                    <p className="text-sm font-black text-gray-800">12</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
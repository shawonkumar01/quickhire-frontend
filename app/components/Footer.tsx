import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                                <div className="w-3 h-3 bg-white rounded-full" />
                            </div>
                            <span className="font-bold text-xl text-white">QuickHire</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Great platform for the job seeker that passionate about startups. Find your dream job easier.
                        </p>
                    </div>

                    {/* About */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">About</h4>
                        <ul className="space-y-3 text-sm">
                            {['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy'].map((item) => (
                                <li key={item}>
                                    <Link href="/" className="hover:text-white transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Resources</h4>
                        <ul className="space-y-3 text-sm">
                            {['Help Docs', 'Guide', 'Updates', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link href="/" className="hover:text-white transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-semibold mb-3">Get job notifications</h4>
                        <p className="text-sm mb-6 leading-relaxed">
                            The latest job news, articles, sent to your inbox weekly.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="flex-1 px-4 py-3 rounded-lg bg-transparent border border-gray-600 text-white text-sm outline-none focus:border-indigo-500 placeholder-gray-500"
                            />
                            <button className="px-5 py-3 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">2026 @ QuickHire. All rights reserved.</p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4">
                        {/* Facebook */}
                        <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                            <svg className="w-4 h-4 fill-gray-400" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                            </svg>
                        </a>
                        {/* Instagram */}
                        <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                            <svg className="w-4 h-4 fill-none stroke-gray-400" viewBox="0 0 24 24" strokeWidth={2}>
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                            </svg>
                        </a>
                        {/* Globe */}
                        <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                            <svg className="w-4 h-4 fill-none stroke-gray-400" viewBox="0 0 24 24" strokeWidth={2}>
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                            </svg>
                        </a>
                        {/* LinkedIn */}
                        <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                            <svg className="w-4 h-4 fill-gray-400" viewBox="0 0 24 24">
                                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                        </a>
                        {/* Twitter */}
                        <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                            <svg className="w-4 h-4 fill-gray-400" viewBox="0 0 24 24">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
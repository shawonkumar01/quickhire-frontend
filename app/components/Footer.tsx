import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">Q</span>
                            </div>
                            <span className="font-bold text-xl text-white">QuickHire</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Great platform for the job seeker that passionate about startups.
                            Find your dream job easier.
                        </p>
                    </div>

                    {/* About */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">About</h4>
                        <ul className="space-y-2 text-sm">
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
                        <h4 className="text-white font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm">
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
                        <h4 className="text-white font-semibold mb-2">Get job notifications</h4>
                        <p className="text-sm mb-4">
                            The latest job news, articles, sent to your inbox weekly.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm outline-none focus:border-indigo-500"
                            />
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div className="border-t border-gray-800 pt-6 text-sm text-center">
                    <p>2021 © QuickHire. All rights reserved.</p>
                </div>

            </div>
        </footer>
    );
}
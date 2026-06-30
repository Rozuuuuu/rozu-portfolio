const socials = [
    { label: 'GitHub', href: 'https://github.com/Rozuuuuu' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lloyd-rosales-a72b9730b/' },
    { label: 'Instagram', href: 'https://www.instagram.com/7lydros/?hl=en' },
];

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-black w-full border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-14">
                <div className="grid gap-10 md:grid-cols-3">
                    {/* Brand + availability */}
                    <div>
                        <div className="font-headline font-black text-xl text-black dark:text-white">
                            Lloyd C. Rosales
                        </div>
                        <p className="mt-3 max-w-xs text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-body">
                            Full-stack &amp; AI-integration developer building for web, mobile, and automation.
                        </p>
                        <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-black dark:text-white">
                            <span className="w-2 h-2 rounded-full bg-black dark:bg-white animate-pulse" />
                            Open to work
                        </span>
                    </div>

                    {/* Contact information */}
                    <div>
                        <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-4">
                            Contact
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a
                                    href="mailto:code.with.lloyd@gmail.com"
                                    className="inline-flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
                                >
                                    <span className="material-symbols-outlined text-black dark:text-white text-lg">alternate_email</span>
                                    code.with.lloyd@gmail.com
                                </a>
                            </li>
                            <li className="inline-flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
                                <span className="material-symbols-outlined text-black dark:text-white text-lg">location_on</span>
                                Cebu City, Philippines
                            </li>
                        </ul>
                    </div>

                    {/* Elsewhere */}
                    <div>
                        <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-4">
                            Elsewhere
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {socials.map(({ label, href }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
                                    >
                                        {label}
                                        <span className="material-symbols-outlined text-sm">arrow_outward</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="font-['Public_Sans'] text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
                        © 2026 Lloyd C. Rosales. All rights reserved.
                    </p>
                    <p className="font-['Public_Sans'] text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
                        Built with React · Vite · Tailwind
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

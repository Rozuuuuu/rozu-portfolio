import SharedNav from '../components/SharedNav';
import { SharedFooter } from '../components/SharedFooter';
import PageTransition from '../components/PageTransition';

const AchievementsPage = () => (
    <PageTransition>
        <div className="bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors duration-300">
            <SharedNav />

            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-6 md:px-8 mb-20">
                    <div className="relative overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-900 p-12 md:p-20 border border-stone-200 dark:border-stone-800">
                        <div className="relative z-10 max-w-2xl">
                            <span className="font-label text-primary dark:text-red-400 font-bold uppercase tracking-widest text-xs mb-4 block">Milestones & Recognition</span>
                            <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 text-stone-900 dark:text-stone-50">
                                Honoring the <span className="text-primary dark:text-red-400 italic">Grind.</span>
                            </h1>
                            <p className="font-body text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
                                A curated showcase of competitive victories, academic excellence, and professional accolades that define my journey as a technical innovator.
                            </p>
                        </div>
                        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    </div>
                </section>

                {/* Bento Grid */}
                <section className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                        {/* Major Win 1: Global Hackathon */}
                        <div className="md:col-span-8 group">
                            <div className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden h-full flex flex-col md:flex-row shadow-md dark:shadow-black/40">
                                <div className="md:w-1/2 relative overflow-hidden min-h-[280px]">
                                    <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCssxh5ITV4KV0MXWdcylcSSLLLMPuT1ZIr9NyWlznlzyZCshujcsMzFyCHR6-VkMVFtC_foFFkupLTuzd6HaK5sprAq2bTFdvvMrqF5NC2sV95tarCGsh2dTTDh1cCuoRvHVyF4ppDPRpmu79x4hA7AWgZC-6e07dgb_9pcOnbvzdV7yI2PZmfYt0EAPRKVqbLuTcvHOhzDLcSnrn-j1ViQFM75se1yUKtb-lylwm0-WqLySRLf61veddpgIJ7PpmRagpUbCE38PX3"
                                        alt="Global AI Innovation Hackathon" />
                                    <div className="absolute inset-0 bg-red-900/20 mix-blend-multiply"></div>
                                </div>
                                <div className="md:w-1/2 p-10 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="material-symbols-outlined text-primary dark:text-red-400">trophy</span>
                                        <span className="text-primary dark:text-red-400 font-bold text-xs uppercase tracking-widest">First Place</span>
                                    </div>
                                    <h2 className="font-headline text-3xl font-extrabold tracking-tight mb-4 text-stone-900 dark:text-stone-50">Global AI Innovation Hackathon</h2>
                                    <p className="text-stone-600 dark:text-stone-300 mb-6 text-sm leading-relaxed">
                                        Led a cross-functional team of 4 to develop a generative AI solution for sustainable urban planning. Outperformed 250+ teams internationally.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">GenAI</span>
                                        <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Sustainability</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Academic Honor */}
                        <div className="md:col-span-4 group">
                            <div className="bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-10 h-full flex flex-col justify-between hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors duration-300">
                                <div>
                                    <span className="material-symbols-outlined text-primary dark:text-red-400 text-4xl mb-6 block">school</span>
                                    <h3 className="font-headline text-2xl font-bold tracking-tight mb-4 text-stone-900 dark:text-stone-50">Dean's List of Excellence</h3>
                                    <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                                        Awarded for maintaining a perfect 4.0 GPA across consecutive semesters, demonstrating rigorous analytical discipline and academic commitment.
                                    </p>
                                </div>
                                <div className="mt-8 border-t border-stone-300 dark:border-stone-600 pt-6">
                                    <span className="text-[10px] font-bold text-primary dark:text-red-400 uppercase tracking-widest">Academic Year 2023-24</span>
                                </div>
                            </div>
                        </div>

                        {/* Open Source Contributor */}
                        <div className="md:col-span-4 group">
                            <div className="rounded-xl p-10 h-full text-white shadow-lg shadow-red-900/30" style={{ background: 'linear-gradient(135deg, #bc000a 0%, #e61919 100%)' }}>
                                <span className="material-symbols-outlined text-4xl mb-6 block text-white">terminal</span>
                                <h3 className="font-headline text-2xl font-bold tracking-tight mb-4 text-white">Top 5% Contributor</h3>
                                <p className="text-red-100 text-sm leading-relaxed mb-8">
                                    Recognized by the community for impactful contributions to major React-based frameworks, fixing critical security vulnerabilities and optimizing bundle sizes.
                                </p>
                                <div className="flex items-center gap-2 text-white">
                                    <span className="material-symbols-outlined text-sm">stars</span>
                                    <span className="text-xs font-bold uppercase tracking-widest">Open Source Award</span>
                                </div>
                            </div>
                        </div>

                        {/* Design Award */}
                        <div className="md:col-span-8 group">
                            <div className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden h-full flex flex-col md:flex-row-reverse shadow-md dark:shadow-black/40">
                                <div className="md:w-1/2 relative overflow-hidden min-h-[280px]">
                                    <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNKLTS3E4y88KuWuaOPjrYxZKRXlbW0pq9-iYEZGqJH_o7v1AxMs2Wg6sxc_4bccJE6QRjZwwkQ7Ge8PEN7tEtTowIGRoZSHCEiFNEsOt5STqrvRPYWR-QVpnRehLbWIsqrDBe6vvLmlG-e9Bj1YdDOvgCMsrXGljqMQJ7-kVuRVsyR_AfsIpfoOQg9bCDZQvpF7JumBxgpQ1ixfytjBoC2v4c2FTZs-S7_nNvKNfGJBUTLN6rI5mnzL3h9csRmWe299Pf4DvU_1Sy"
                                        alt="Awwwards Honorable Mention" />
                                </div>
                                <div className="md:w-1/2 p-10 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">palette</span>
                                        <span className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest">Excellence in UI/UX</span>
                                    </div>
                                    <h2 className="font-headline text-3xl font-extrabold tracking-tight mb-4 text-stone-900 dark:text-stone-50">Awwwards Honorable Mention</h2>
                                    <p className="text-stone-600 dark:text-stone-300 mb-6 text-sm leading-relaxed">
                                        Received recognition for the "Kinetic Portfolio" redesign, noted for its innovative use of typography, whitespace, and seamless editorial-style transitions.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-50 dark:bg-stone-700 border border-red-200 dark:border-stone-600 text-primary dark:text-red-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Visual Design</span>
                                        <span className="bg-red-50 dark:bg-stone-700 border border-red-200 dark:border-stone-600 text-primary dark:text-red-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Interaction</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Small Accomplishments */}
                        <div className="md:col-span-12">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                {[
                                    { title: 'Google Cloud Certified', desc: 'Professional Cloud Architect certification validating expertise in scalable cloud infrastructure.' },
                                    { title: 'Patent Pending #1283-A', desc: 'Inventor of a novel algorithm for low-latency peer-to-peer data synchronization in mesh networks.' },
                                    { title: 'Regional Math Olympiad', desc: 'Silver medalist in the advanced logic and algorithmic problem-solving category.' },
                                ].map(({ title, desc }) => (
                                    <div key={title} className="p-8 border-l-4 border-primary bg-stone-100 dark:bg-stone-800 rounded-r-xl border border-l-primary border-stone-200 dark:border-stone-700 dark:border-l-primary">
                                        <h4 className="font-headline font-bold text-lg mb-2 text-stone-900 dark:text-stone-50">{title}</h4>
                                        <p className="text-sm text-stone-600 dark:text-stone-400">{desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="max-w-7xl mx-auto px-6 md:px-8 mt-32 text-center">
                    <div className="bg-stone-900 dark:bg-stone-800 text-white rounded-xl py-16 px-8 relative overflow-hidden border border-stone-700">
                        <div className="relative z-10">
                            <h2 className="font-headline text-4xl font-black mb-6 tracking-tight text-white">
                                Looking to build the next <span className="text-red-400 italic">Winning</span> project?
                            </h2>
                            <p className="text-stone-400 mb-10 max-w-xl mx-auto">
                                I'm currently open for high-impact collaborations and architectural consultations.
                            </p>
                            <button className="text-white font-bold px-10 py-4 rounded-lg tracking-tight hover:scale-105 transition-transform shadow-lg shadow-red-900/30" style={{ background: 'linear-gradient(135deg, #bc000a 0%, #e61919 100%)' }}>
                                Let's Work Together
                            </button>
                        </div>
                        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#bc000a 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    </div>
                </section>
            </main>

            <SharedFooter />
        </div>
    </PageTransition>
);

export default AchievementsPage;

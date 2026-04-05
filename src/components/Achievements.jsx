import { Link } from 'react-router-dom';

const Achievements = () => {
    const items = [
        {
            label: 'Hackathon',
            title: '3rd Place in HackEstate',
            overlay: 'bg-primary/10',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXRCQzxJc4G-TZGBTUm05e7jPVafCkD7kCGx0pUiTyYOzG_FeM_7n-SSC_6sJ6GMZaH3W4O61hw-VrKnBDQ9caUtFAhOKCIylPIwGJiSeeDJaXdnMKP5HozT5PkvAcfroe-SZ8AGq6k1Ue6XQHmfbZOBgb5DuJVyxT1YkY_pihbXkaXxfU8AG8x1nr0jGl5LZdWb5aVLWQz8VP-qPgpRmv49xVENTBJguaRkklqiCfrb3dBOQwvCw8Ku53dKriznZOQNnNWVouVtFR',
        },
        {
            label: 'USPF 2023',
            title: '2nd Place in Hackathon Competition',
            overlay: 'bg-tertiary/10',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMRr9iIkqVuE2Xc_9yqDPgTox3m6mxkvZINn3WJJ6r56sloYjPdW-bkfkMCgYKG2oRyQPgGV0_zQKObJysHl49U3Yts_GazmyOlSy0Slib8d3B51oUNE6nkoIRQARjdnGq3YhvFrv6IeYzXg6yFDbGgzGegayYNbM8Cc0p7ti93coR0O1WIgGUhnEIJjqM6mBQfk2P1WcwVdJMutcCn6-qj1Amry_vv9vaXsGyYlmmU9pqFFHsdPEURQDz_ZfpIyl0mVkWSpj47Qhw',
        },
        {
            label: 'Innovation',
            title: 'Best in Logo & Most Promising',
            overlay: 'bg-primary-container/10',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-MHtuKtY1qVIpWCjNZS8rvrF7SBxKb53kObNpzq7ydUBgumTFrsQiXJL4aTp8IvivsBRj0fgHzqO96iMABnzc5uxlSt2MiVXF40bg2t6hIpftlLRBYJWBqZhDLwo4GlBHErAEBE20Z8pMMOhwQEMn0ck7XfK_ZvMzzEQpXGyj_xfE_4UgyWslgBkSdSvc0J9hkZA_vOLh6Oka9GnYYs-3w2JV8jkGjE1NbekkeeEa0AfBElLeLewxViKpOmFGvNOtLLQ9s2keYcDT',
        },
    ];

    return (
        <section className="py-24 bg-[#fff0ee] dark:bg-stone-900 transition-colors duration-300" id="achievements">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                {/* Header */}
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Accolades</span>
                        <h2 className="text-4xl font-black tracking-tight mt-2 text-stone-900 dark:text-white">Achievements</h2>
                        <p className="text-stone-500 dark:text-stone-400 mt-3">Recognition of technical excellence and competitive innovation.</p>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {items.map(({ label, title, img, overlay }) => (
                        <div key={title} className="bg-white dark:bg-stone-800 rounded-xl overflow-hidden group border border-[#fddbd6] dark:border-stone-700 hover:border-primary/40 dark:hover:border-primary/40 transition-colors duration-300 shadow-md dark:shadow-black/20">
                            {/* Image */}
                            <div className="h-48 bg-[#fddbd6] dark:bg-stone-700 relative overflow-hidden">
                                <img
                                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                                    src={img}
                                    alt={title}
                                />
                                <div className={`absolute inset-0 ${overlay} mix-blend-overlay`}></div>
                            </div>
                            {/* Content */}
                            <div className="p-8">
                                <div className="text-primary text-xs uppercase tracking-widest font-bold mb-2">{label}</div>
                                <h3 className="text-xl font-black text-stone-900 dark:text-white leading-snug">{title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show More */}
                <div className="flex justify-center mt-12">
                    <Link
                        to="/achievements"
                        className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[#bc000a]/40 hover:border-primary bg-white dark:bg-stone-800 text-primary dark:text-red-400 hover:bg-primary hover:text-white font-bold text-sm uppercase tracking-widest rounded-lg transition-all duration-300 group"
                    >
                        View All Achievements
                        <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Achievements;

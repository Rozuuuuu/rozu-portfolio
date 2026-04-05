const TechnicalArsenal = () => {
    return (
        <section className="bg-surface-container-low dark:bg-stone-900 py-24 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">The Engine</span>
                        <h2 className="text-4xl font-black tracking-tight mt-2 dark:text-stone-100">Technical Arsenal</h2>
                    </div>
                </div>
                <div className="grid md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px]">
                    <div className="md:col-span-2 md:row-span-2 bg-surface-container-lowest dark:bg-stone-800 p-8 rounded-lg border border-outline-variant/15 dark:border-stone-700 flex flex-col justify-between">
                        <span className="material-symbols-outlined text-primary text-4xl">terminal</span>
                        <div>
                            <h3 className="text-2xl font-black mb-4 dark:text-stone-100">Core Architecture</h3>
                            <p className="text-on-surface-variant dark:text-stone-400 mb-6">Expertise in building scalable microservices and resilient cloud infrastructure using modern paradigms.</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-surface-container dark:bg-stone-700 text-primary rounded-full text-xs font-bold">Node.js</span>
                                <span className="px-3 py-1 bg-surface-container dark:bg-stone-700 text-primary rounded-full text-xs font-bold">TypeScript</span>
                                <span className="px-3 py-1 bg-surface-container dark:bg-stone-700 text-primary rounded-full text-xs font-bold">GoLang</span>
                                <span className="px-3 py-1 bg-surface-container dark:bg-stone-700 text-primary rounded-full text-xs font-bold">GraphQL</span>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2 bg-surface-container-highest dark:bg-stone-700 p-8 rounded-lg flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-black mb-2 dark:text-stone-100">Frontend Mastery</h3>
                            <p className="text-sm text-on-surface-variant dark:text-stone-400">Kinetic interfaces & state management.</p>
                        </div>
                        <div className="flex -space-x-2">
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">React</div>
                            <div className="w-12 h-12 rounded-full bg-tertiary flex items-center justify-center text-white font-bold text-xs">Next</div>
                            <div className="w-12 h-12 rounded-full bg-on-surface dark:bg-stone-600 flex items-center justify-center text-white font-bold text-xs">TW</div>
                        </div>
                    </div>
                    <div className="bg-surface-container-lowest dark:bg-stone-800 p-8 rounded-lg border border-outline-variant/15 dark:border-stone-700 flex flex-col justify-center text-center">
                        <span className="material-symbols-outlined text-primary text-3xl mb-3">cloud</span>
                        <h3 className="font-bold text-sm uppercase tracking-widest dark:text-stone-200">Cloud Ops</h3>
                        <p className="text-xs text-on-surface-variant dark:text-stone-400 mt-2">AWS, GCP, Docker</p>
                    </div>
                    <div className="bg-surface-container dark:bg-stone-700 p-8 rounded-lg flex flex-col justify-center text-center">
                        <span className="material-symbols-outlined text-tertiary text-3xl mb-3">database</span>
                        <h3 className="font-bold text-sm uppercase tracking-widest dark:text-stone-200">Storage</h3>
                        <p className="text-xs text-on-surface-variant dark:text-stone-400 mt-2">PostgreSQL, Redis</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechnicalArsenal;

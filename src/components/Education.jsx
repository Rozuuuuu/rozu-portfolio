import ScrollReveal from './ScrollReveal';

const Education = () => {
    return (
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-8" id="education">
            <ScrollReveal className="grid md:grid-cols-2 gap-16">
                {/* Academic Foundation */}
                <div>
                    <div className="mb-12">
                        <span className="text-black dark:text-white font-bold tracking-[0.3em] uppercase text-xs">Pedigree</span>
                        <h2 className="text-4xl font-black tracking-tight mt-2 dark:text-stone-100">Academic Foundation</h2>
                    </div>
                    <div className="space-y-8">
                        <div className="border-l-4 border-primary pl-6">
                            <h3 className="text-xl font-black dark:text-stone-100">M.Sc. in Computer Science</h3>
                            <p className="text-on-surface-variant dark:text-stone-400 font-medium">Stanford University, 2015</p>
                            <p className="text-sm mt-2 text-on-surface-variant/80 dark:text-stone-500">Specialization in Distributed Systems and Algorithmic Efficiency.</p>
                        </div>
                        <div className="border-l-4 border-outline-variant dark:border-stone-600 pl-6">
                            <h3 className="text-xl font-black dark:text-stone-100">B.Sc. in Software Engineering</h3>
                            <p className="text-on-surface-variant dark:text-stone-400 font-medium">University of Washington, 2013</p>
                        </div>
                    </div>
                </div>
                {/* Certifications */}
                <div>
                    <div className="mb-12">
                        <span className="text-black dark:text-white font-bold tracking-[0.3em] uppercase text-xs">Credentials</span>
                        <h2 className="text-4xl font-black tracking-tight mt-2 dark:text-stone-100">Certifications</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {['AWS Solutions Architect', 'Google Cloud Professional', 'Meta Lead Engineer', 'Docker Certified Assoc.'].map((cert) => (
                            <div key={cert} className="bg-surface-container dark:bg-stone-800 p-6 rounded-lg text-center">
                                <span className="material-symbols-outlined text-black dark:text-white mb-2 block">verified</span>
                                <h4 className="font-bold text-sm dark:text-stone-200">{cert}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Education;

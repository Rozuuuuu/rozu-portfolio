const Contact = () => {
    return (
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-8" id="contact">
            <div className="bg-on-surface dark:bg-stone-900 text-surface dark:text-stone-100 rounded-2xl p-8 md:p-20 overflow-hidden relative border dark:border-stone-700">
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">Let's build the <br /> <span className="text-primary">Next Big Thing</span> together.</h2>
                        <p className="text-surface/70 dark:text-stone-400 text-lg mb-8">Currently available for select architectural consulting and high-impact partnerships.</p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-primary">alternate_email</span>
                                <span className="font-medium">hello@lloydrosales.dev</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                                <span className="font-medium">Seattle, WA / Remote</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-surface/10 dark:bg-white/5 p-8 rounded-xl backdrop-blur-md">
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <input className="w-full bg-surface/5 dark:bg-white/5 border border-white/10 rounded-lg p-4 text-surface dark:text-stone-100 placeholder:text-surface/40 dark:placeholder:text-stone-500 focus:ring-2 focus:ring-primary outline-none" placeholder="Name" type="text" />
                            <input className="w-full bg-surface/5 dark:bg-white/5 border border-white/10 rounded-lg p-4 text-surface dark:text-stone-100 placeholder:text-surface/40 dark:placeholder:text-stone-500 focus:ring-2 focus:ring-primary outline-none" placeholder="Email" type="email" />
                            <textarea className="w-full bg-surface/5 dark:bg-white/5 border border-white/10 rounded-lg p-4 text-surface dark:text-stone-100 placeholder:text-surface/40 dark:placeholder:text-stone-500 focus:ring-2 focus:ring-primary outline-none" placeholder="Your Message" rows="4"></textarea>
                            <button className="w-full py-4 bg-primary text-white font-black rounded-lg uppercase tracking-widest text-sm hover:bg-primary-container transition-colors">Send Inquiry</button>
                        </form>
                    </div>
                </div>
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary opacity-20 rounded-full blur-[100px]"></div>
            </div>
        </section>
    );
};

export default Contact;

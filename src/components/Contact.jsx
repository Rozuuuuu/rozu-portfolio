import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        setErrorMessage("");

        const formData = new FormData(e.target);
        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

        if (!accessKey) {
            setSubmitStatus('error');
            setErrorMessage("Access Key is missing. Please configure VITE_WEB3FORMS_ACCESS_KEY in .env");
            setIsSubmitting(false);
            return;
        }

        formData.append("access_key", accessKey);
        formData.append("subject", "New Landing Page Inquiry from Portfolio");
        formData.append("from_name", "Lloyd's Portfolio");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setSubmitStatus('success');
                e.target.reset();
            } else {
                setSubmitStatus('error');
                setErrorMessage(data.message || "Something went wrong.");
            }
        } catch (err) {
            console.error("Submission error:", err);
            setSubmitStatus('error');
            setErrorMessage("Connection error.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-8" id="contact">
            <ScrollReveal className="bg-on-surface dark:bg-stone-900 text-surface dark:text-stone-100 rounded-2xl p-8 md:p-20 overflow-hidden relative border dark:border-stone-700">
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">Let's build the <br /> <span className="text-black dark:text-white">Next Big Thing</span> together.</h2>
                        <p className="text-surface/70 dark:text-stone-400 text-lg mb-8">Currently available for select architectural consulting and high-impact partnerships.</p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-black dark:text-white">alternate_email</span>
                                <span className="font-medium">code.with.lloyd@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-black dark:text-white">location_on</span>
                                <span className="font-medium">Cebu City, Philippines</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-surface/10 dark:bg-white/5 p-8 rounded-xl backdrop-blur-md">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <input 
                                className="w-full bg-surface/5 dark:bg-white/5 border border-white/10 rounded-lg p-4 text-surface dark:text-stone-100 placeholder:text-surface/40 dark:placeholder:text-stone-500 focus:ring-2 focus:ring-primary outline-none" 
                                placeholder="Name" 
                                type="text" 
                                name="name"
                                required
                            />
                            <input 
                                className="w-full bg-surface/5 dark:bg-white/5 border border-white/10 rounded-lg p-4 text-surface dark:text-stone-100 placeholder:text-surface/40 dark:placeholder:text-stone-500 focus:ring-2 focus:ring-primary outline-none" 
                                placeholder="Email" 
                                type="email" 
                                name="email"
                                required
                            />
                            <textarea 
                                className="w-full bg-surface/5 dark:bg-white/5 border border-white/10 rounded-lg p-4 text-surface dark:text-stone-100 placeholder:text-surface/40 dark:placeholder:text-stone-500 focus:ring-2 focus:ring-primary outline-none resize-none" 
                                placeholder="Your Message" 
                                rows="4"
                                name="message"
                                required
                            ></textarea>
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-primary text-white font-black rounded-lg uppercase tracking-widest text-sm hover:bg-primary-container transition-colors disabled:opacity-55 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Sending..." : "Send Inquiry"}
                            </button>

                            {submitStatus === 'success' && (
                                <div className="p-4 bg-stone-800/80 border border-emerald-500/30 rounded-lg flex items-center gap-3 text-xs text-stone-200 font-mono animate-pulse mt-4">
                                    <span className="material-symbols-outlined text-emerald-400">check_circle</span>
                                    <span>Inquiry sent! Thank you.</span>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="p-4 bg-stone-850/80 border border-red-500/30 rounded-lg flex items-center gap-3 text-xs text-red-300 font-mono mt-4">
                                    <span className="material-symbols-outlined text-red-400">error</span>
                                    <span>{errorMessage}</span>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary opacity-20 rounded-full blur-[100px]"></div>
            </ScrollReveal>
        </section>
    );
};

export default Contact;

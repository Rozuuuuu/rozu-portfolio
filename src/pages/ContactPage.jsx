import { useState } from 'react';
import { SharedFooter } from '../components/SharedFooter';
import PageTransition from '../components/PageTransition';
import SocialCards from '../components/SocialCards';
import SEO from '../components/SEO';

const ContactPage = () => {
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
            setErrorMessage("Web3Forms Access Key is missing. Please configure VITE_WEB3FORMS_ACCESS_KEY in your environment.");
            setIsSubmitting(false);
            return;
        }

        formData.append("access_key", accessKey);
        formData.append("subject", "New Contact Inquiry from Portfolio");
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
                setErrorMessage(data.message || "Something went wrong. Please try again later.");
            }
        } catch (err) {
            console.error("Submission error:", err);
            setSubmitStatus('error');
            setErrorMessage("Connection error. Please check your network and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PageTransition>
            <SEO 
                title="Contact - Lloyd C. Rosales" 
                description="Get in touch for freelance opportunities, full-time roles, or high-impact collaborations." 
                path="/contact" 
            />
            <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors duration-300">
                <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-8">
                    {/* Hero Section */}
                    <div className="mb-20 text-center max-w-3xl mx-auto">
                        <span className="font-label text-black dark:text-white font-bold uppercase tracking-widest text-xs mb-4 block">Get In Touch</span>
                        <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 text-black dark:text-white">
                            Let's build the <span className="text-neutral-400 dark:text-neutral-500 italic">Next Big Thing</span> together.
                        </h1>
                        <p className="font-body text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                            Open to full-time software roles, internships, and freelance projects. Have an idea or a role in mind? I'd love to hear about it.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-start mb-20 bg-neutral-50 dark:bg-neutral-950 p-8 md:p-12 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl dark:shadow-black/20">
                        {/* Philosophy & Picture */}
                        <div className="flex flex-col gap-16 md:pl-6 pt-6">
                            <div className="flex justify-center md:justify-start w-full mx-auto md:mx-0">
                                <SocialCards />
                            </div>
                            
                            <div className="space-y-4 pt-4 px-4 md:px-0">
                                <div className="flex items-center gap-4 text-black dark:text-white">
                                    <span className="material-symbols-outlined text-black dark:text-white">alternate_email</span>
                                    <span className="font-medium">code.with.lloyd@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-4 text-black dark:text-white">
                                    <span className="material-symbols-outlined text-black dark:text-white">location_on</span>
                                    <span className="font-medium">Cebu City, Philippines</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-md">
                            <h3 className="font-headline text-2xl font-bold tracking-tight mb-6 text-black dark:text-white">Send an Inquiry</h3>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <input 
                                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all" 
                                    placeholder="Your Name" 
                                    type="text" 
                                    name="name"
                                    required
                                />
                                <input 
                                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all" 
                                    placeholder="Your Email" 
                                    type="email" 
                                    name="email"
                                    required
                                />
                                <textarea 
                                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all resize-none" 
                                    placeholder="Tell me about your project..." 
                                    rows="5"
                                    name="message"
                                    required
                                ></textarea>
                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg uppercase tracking-widest text-sm hover:scale-[1.02] shadow-lg shadow-black/20 dark:shadow-white/10 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>
                                
                                {submitStatus === 'success' && (
                                    <div className="p-4 bg-neutral-100 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg flex items-center gap-3 text-xs text-neutral-800 dark:text-neutral-200 font-mono animate-pulse mt-4">
                                        <span className="material-symbols-outlined text-green-500">check_circle</span>
                                        <span>Message sent! Thank you for getting in touch.</span>
                                    </div>
                                )}
                                
                                {submitStatus === 'error' && (
                                    <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-lg flex items-center gap-3 text-xs text-red-700 dark:text-red-400 font-mono mt-4">
                                        <span className="material-symbols-outlined text-red-500">error</span>
                                        <span>{errorMessage}</span>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </main>

                <SharedFooter />
            </div>
        </PageTransition>
    );
};

export default ContactPage;

import { useState } from 'react';
import SharedNav from '../components/SharedNav';
import { SharedFooter } from '../components/SharedFooter';
import PageTransition from '../components/PageTransition';

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const ContactPage = () => {
    // status: 'idle' | 'sending' | 'success' | 'error'
    const [status, setStatus] = useState('idle');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!ACCESS_KEY) {
            setStatus('error');
            setFeedback('The contact form is not configured yet. Please email me directly.');
            return;
        }

        setStatus('sending');
        setFeedback('');

        const formData = new FormData(e.target);
        formData.append('access_key', ACCESS_KEY);
        formData.append('subject', 'New message from your portfolio');

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: formData,
            });
            const data = await res.json();

            if (data.success) {
                setStatus('success');
                setFeedback("Thanks for reaching out — I'll get back to you soon.");
                e.target.reset();
            } else {
                setStatus('error');
                setFeedback(data.message || 'Something went wrong. Please try again or email me directly.');
            }
        } catch {
            setStatus('error');
            setFeedback('Network error. Please try again or email me directly.');
        }
    };

    return (
        <PageTransition>
            <div className="bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors duration-300">
                <SharedNav />

                <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-8">
                    {/* Hero Section */}
                    <div className="mb-20 text-center max-w-3xl mx-auto">
                        <span className="font-label text-primary dark:text-red-400 font-bold uppercase tracking-widest text-xs mb-4 block">Get In Touch</span>
                        <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 text-stone-900 dark:text-stone-50">
                            Let's build the <span className="text-primary dark:text-red-400 italic">Next Big Thing</span> together.
                        </h1>
                        <p className="font-body text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
                            Currently available for select architectural consulting and high-impact partnerships.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-start mb-20 bg-stone-50 dark:bg-stone-900 p-8 md:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl dark:shadow-black/20">
                        {/* Philosophy & Picture */}
                        <div className="flex flex-col gap-16 md:pl-6 pt-6">
                            <div className="relative max-w-fit mx-auto md:mx-0">
                                <div className="aspect-square w-64 md:w-80 rounded-2xl overflow-hidden relative group">
                                    <img 
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                                        src="/lloyd-pic.png" 
                                        alt="Lloyd"
                                    />
                                    <div className="absolute inset-0 bg-[#bc000a]/5 dark:bg-red-500/5 mix-blend-multiply pointer-events-none"></div>
                                </div>
                                <div className="absolute -bottom-6 -left-6 bg-[#ffffff] dark:bg-stone-900 border border-stone-100 dark:border-stone-800 p-6 rounded-xl shadow-xl max-w-[240px] z-10">
                                    <p className="font-label text-xs font-bold uppercase text-[#bc000a] dark:text-red-400 tracking-widest mb-2">Philosophy</p>
                                    <p className="font-body text-sm font-medium italic text-[#291714] dark:text-stone-300 leading-snug">
                                        "Performance is the baseline. Soul is the differentiator."
                                    </p>
                                </div>
                            </div>
                            
                            <div className="space-y-4 pt-4 px-4 md:px-0">
                                <div className="flex items-center gap-4 text-stone-800 dark:text-stone-200">
                                    <span className="material-symbols-outlined text-primary dark:text-red-400">alternate_email</span>
                                    <span className="font-medium">code.with.lloyd@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-4 text-stone-800 dark:text-stone-200">
                                    <span className="material-symbols-outlined text-primary dark:text-red-400">location_on</span>
                                    <span className="font-medium">Cebu City, Philippines</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white dark:bg-stone-800 p-8 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-md">
                            <h3 className="font-headline text-2xl font-bold tracking-tight mb-6 text-stone-900 dark:text-stone-50">Send an Inquiry</h3>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                {/* Honeypot field for spam bots (must stay hidden) */}
                                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

                                <label htmlFor="contact-name" className="sr-only">Your Name</label>
                                <input
                                    id="contact-name"
                                    name="name"
                                    required
                                    className="w-full bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-700 rounded-lg p-4 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:ring-2 focus:ring-primary outline-none transition-all"
                                    placeholder="Your Name"
                                    type="text"
                                />
                                <label htmlFor="contact-email" className="sr-only">Your Email</label>
                                <input
                                    id="contact-email"
                                    name="email"
                                    required
                                    className="w-full bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-700 rounded-lg p-4 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:ring-2 focus:ring-primary outline-none transition-all"
                                    placeholder="Your Email"
                                    type="email"
                                />
                                <label htmlFor="contact-message" className="sr-only">Your Message</label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    required
                                    className="w-full bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-700 rounded-lg p-4 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                                    placeholder="Tell me about your project..."
                                    rows="5"
                                ></textarea>
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full py-4 bg-primary text-white font-bold rounded-lg uppercase tracking-widest text-sm hover:scale-[1.02] shadow-lg shadow-red-900/20 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                                </button>

                                {feedback && (
                                    <p
                                        role="status"
                                        aria-live="polite"
                                        className={`text-sm font-medium ${status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-primary dark:text-red-400'}`}
                                    >
                                        {feedback}
                                    </p>
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

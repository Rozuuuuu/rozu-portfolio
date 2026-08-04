import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { SharedFooter } from '../components/SharedFooter';
import SEO from '../components/SEO';
import Icon from '../components/Icon';

const NotFoundPage = () => (
    <PageTransition>
        <SEO
            title="Page Not Found - Lloyd C. Rosales"
            description="The page you're looking for doesn't exist."
            path="/404"
        />
        <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col transition-colors duration-300">
            <main className="flex-1 flex items-center justify-center px-6 pt-24 pb-24">
                <div className="text-center max-w-xl">
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500 mb-6">
                        {'// ERROR_404'}
                    </p>
                    <h1 className="font-headline text-6xl md:text-6xl font-black tracking-tighter leading-none mb-6">
                        Page not{' '}
                        <span className="font-serif italic text-neutral-400 dark:text-neutral-500">found.</span>
                    </h1>
                    <p className="font-body text-neutral-600 dark:text-neutral-300 leading-relaxed mb-10">
                        The route you requested doesn't exist — it may have been moved, renamed, or never shipped.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-mono text-sm font-bold tracking-wide hover:opacity-90 active:scale-95 transition-all duration-200"
                        >
                            <Icon name="arrow_back" className="text-base" />
                            Back to Home
                        </Link>
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white px-6 py-3 rounded-lg font-mono text-sm font-bold tracking-wide hover:border-black dark:hover:border-white transition-all duration-200"
                        >
                            View Projects
                        </Link>
                    </div>
                </div>
            </main>
            <SharedFooter />
        </div>
    </PageTransition>
);

export default NotFoundPage;

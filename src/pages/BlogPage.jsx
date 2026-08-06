import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { SharedFooter } from '../components/SharedFooter';
import SEO from '../components/SEO';
import Icon from '../components/Icon';
import BlogCard from '../components/BlogCard';
import { blogPosts } from '../data/blogData';

const BlogPage = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const posts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <PageTransition>
            <SEO
                title="Blog - Lloyd C. Rosales"
                description="Problem-solving journals and case studies from Lloyd Rosales — architecture decisions, lessons from shipping AI-integrated products, and deep dives."
                path="/blog"
            />
            <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors duration-300">
                <main className="pt-24 pb-20 px-6 md:px-8 max-w-3xl mx-auto">
                    {/* Header */}
                    <header className="mb-10">
                        <span className="text-black dark:text-white font-bold tracking-[0.3em] uppercase text-xs font-mono">
                            Writing
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mt-2 text-black dark:text-white font-headline">
                            Blog
                        </h1>
                        <p className="mt-4 text-neutral-500 dark:text-neutral-400 text-sm md:text-base leading-relaxed max-w-xl">
                            Case studies and problem-solving journals — architecture decisions, bugs worth remembering, and lessons from shipping real projects.
                        </p>
                    </header>

                    {posts.length === 0 ? (
                        <div className="flex flex-col items-center text-center rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 py-16 px-6">
                            <div className="w-14 h-14 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mb-6">
                                <Icon name="draw" className="text-black dark:text-white text-2xl" />
                            </div>
                            <h2 className="text-2xl font-black tracking-tight text-black dark:text-white font-headline">
                                Coming Soon
                            </h2>
                            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md">
                                Write-ups are on the way. Check back shortly.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {posts.map((post) => (
                                <BlogCard key={post.title} post={post} />
                            ))}
                        </div>
                    )}

                    <div className="mt-12">
                        <Link to="/about" className="inline-flex items-center gap-2 text-sm font-mono font-bold text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                            <Icon name="arrow_back" className="text-base" /> Back to About
                        </Link>
                    </div>
                </main>
                <SharedFooter />
            </div>
        </PageTransition>
    );
};

export default BlogPage;

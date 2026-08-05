import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import PageTransition from '../components/PageTransition';
import { SharedFooter } from '../components/SharedFooter';
import SEO from '../components/SEO';
import Icon from '../components/Icon';
import { blogPosts } from '../data/blogData';

/* Markdown element → styled component map (keeps the monochrome editorial look). */
const mdComponents = {
    h2: (props) => <h2 className="text-2xl font-black tracking-tight mt-10 mb-3 text-black dark:text-white font-headline" {...props} />,
    h3: (props) => <h3 className="text-lg font-bold tracking-tight mt-8 mb-2 text-black dark:text-white" {...props} />,
    p: (props) => <p className="my-4 leading-relaxed text-[15px] text-neutral-700 dark:text-neutral-300" {...props} />,
    ul: (props) => <ul className="my-4 space-y-2 list-disc pl-5 text-[15px] text-neutral-700 dark:text-neutral-300" {...props} />,
    ol: (props) => <ol className="my-4 space-y-2 list-decimal pl-5 text-[15px] text-neutral-700 dark:text-neutral-300" {...props} />,
    li: (props) => <li className="leading-relaxed" {...props} />,
    strong: (props) => <strong className="font-bold text-black dark:text-white" {...props} />,
    em: (props) => <em className="italic" {...props} />,
    a: (props) => <a className="underline decoration-neutral-400 underline-offset-2 hover:text-black dark:hover:text-white transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
    blockquote: (props) => <blockquote className="border-l-2 border-black dark:border-white pl-4 italic my-6 text-neutral-600 dark:text-neutral-300" {...props} />,
    hr: () => <hr className="my-8 border-neutral-200 dark:border-neutral-800" />,
    // `code` and `pre` are intentionally not overridden — they're styled via the
    // .md-body CSS below so rehype-highlight's syntax spans render correctly.
};

/* Inline code + fenced code blocks with a restrained dark syntax theme
   (highlight.js class names via rehype-highlight). Code blocks stay dark in
   both light and dark page modes, matching the site's editorial feel. */
const codeStyles = `
    .md-body :not(pre) > code {
        font-family: 'Geist Mono', ui-monospace, monospace;
        font-size: 0.85em;
        background: #f5f5f5;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        padding: 0.1em 0.4em;
        color: #111;
    }
    .dark .md-body :not(pre) > code { background: #171717; border-color: #262626; color: #f5f5f5; }
    .md-body pre {
        margin: 1.5rem 0;
        overflow-x: auto;
        border-radius: 0.6rem;
        background: #0a0a0a;
        border: 1px solid #262626;
        padding: 1rem 1.15rem;
    }
    .md-body pre code {
        font-family: 'Geist Mono', ui-monospace, monospace;
        font-size: 0.82rem;
        line-height: 1.7;
        color: #e5e5e5;
        background: none;
        padding: 0;
    }
    /* highlight.js tokens — soft palette, readable on near-black */
    .md-body .hljs-comment, .md-body .hljs-quote { color: #6b7280; font-style: italic; }
    .md-body .hljs-keyword, .md-body .hljs-selector-tag, .md-body .hljs-literal, .md-body .hljs-doctag { color: #7dd3fc; }
    .md-body .hljs-string, .md-body .hljs-regexp, .md-body .hljs-addition { color: #86efac; }
    .md-body .hljs-number, .md-body .hljs-symbol, .md-body .hljs-bullet { color: #fca5a5; }
    .md-body .hljs-title, .md-body .hljs-title.function_, .md-body .hljs-section, .md-body .hljs-name { color: #fde68a; }
    .md-body .hljs-attr, .md-body .hljs-attribute, .md-body .hljs-variable, .md-body .hljs-template-variable { color: #d8b4fe; }
    .md-body .hljs-built_in, .md-body .hljs-class .hljs-title, .md-body .hljs-type { color: #f0abfc; }
    .md-body .hljs-meta { color: #9ca3af; }
    .md-body .hljs-emphasis { font-style: italic; }
    .md-body .hljs-strong { font-weight: 700; }
`;

const BlogPostPage = () => {
    const { slug } = useParams();
    const post = blogPosts.find((p) => p.slug === slug);

    useEffect(() => { window.scrollTo(0, 0); }, [slug]);

    if (!post) {
        return (
            <PageTransition>
                <SEO title="Post Not Found - Lloyd C. Rosales" description="This article could not be found." path={`/blog/${slug || ''}`} />
                <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col items-center justify-center px-6 text-center">
                    <h1 className="text-3xl font-black tracking-tight font-headline">Post not found</h1>
                    <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">This article doesn’t exist or has moved.</p>
                    <Link to="/about?tab=blog" className="mt-8 inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 px-5 py-2.5 rounded-lg font-mono text-sm font-bold tracking-wide hover:border-black dark:hover:border-white transition-all">
                        <Icon name="arrow_back" className="text-base" /> Back to Blog
                    </Link>
                </div>
            </PageTransition>
        );
    }

    const dateLabel = post.date
        ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        : null;

    return (
        <PageTransition>
            <SEO title={`${post.title} - Lloyd C. Rosales`} description={post.excerpt} path={`/blog/${post.slug}`} />
            <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors duration-300">
                <main className="pt-24 pb-20 px-6 md:px-8 max-w-3xl mx-auto">
                    <Link to="/about?tab=blog" className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                        <Icon name="arrow_back" className="text-sm" /> Back to Blog
                    </Link>

                    {/* Header */}
                    <header className="mt-8">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                            {post.category && (
                                <span className="inline-block rounded-full bg-black dark:bg-white px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest text-white dark:text-black">
                                    {post.category}
                                </span>
                            )}
                            {(dateLabel || post.readingTime) && (
                                <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                                    {dateLabel}{dateLabel && post.readingTime ? ' · ' : ''}{post.readingTime}
                                </span>
                            )}
                        </div>
                        <h1 className="mt-4 text-3xl md:text-4xl font-black tracking-tight text-black dark:text-white font-headline leading-tight">
                            {post.title}
                        </h1>
                        {post.tags?.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {post.tags.map((t) => (
                                    <span key={t} className="text-[10px] font-bold uppercase tracking-widest bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded px-2 py-1">
                                        #{t}
                                    </span>
                                ))}
                            </div>
                        )}
                    </header>

                    <hr className="my-8 border-neutral-200 dark:border-neutral-800" />

                    {/* Body */}
                    <style>{codeStyles}</style>
                    <article className="md-body">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={mdComponents}>
                            {post.content || '_This article is coming soon._'}
                        </ReactMarkdown>
                    </article>

                    {/* Associated links */}
                    {(post.live || post.repo) && (
                        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-neutral-200 dark:border-neutral-800 pt-6">
                            {post.live && (
                                <a href={post.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs font-bold uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all">
                                    <Icon name="open_in_new" className="text-sm" /> View Live Project
                                </a>
                            )}
                            {post.repo && (
                                <a href={post.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:border-black dark:hover:border-white transition-all">
                                    <Icon name="github" className="text-sm" /> View Code
                                </a>
                            )}
                        </div>
                    )}

                    {/* Footer nav */}
                    <div className="mt-12">
                        <Link to="/about?tab=blog" className="inline-flex items-center gap-2 text-sm font-mono font-bold text-black dark:text-white hover:opacity-70 transition-opacity">
                            <Icon name="arrow_back" className="text-base" /> More articles
                        </Link>
                    </div>
                </main>
                <SharedFooter />
            </div>
        </PageTransition>
    );
};

export default BlogPostPage;

import { Link } from 'react-router-dom';
import Icon from './Icon';

/**
 * A single blog post card — used by both the About → Blog tab and the
 * dedicated /blog index page. Links to the in-site article (/blog/:slug) or
 * an external `url`, and surfaces category, date, reading time, excerpt,
 * key takeaways, tags, and Read More / Live / Code actions.
 */
const BlogCard = ({ post }) => {
    const href = post.slug ? `/blog/${post.slug}` : post.url;
    const isExternal = /^https?:/.test(href || '');
    const dateLabel = post.date
        ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        : null;

    return (
        <article className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 transition-colors duration-300 hover:border-neutral-400 dark:hover:border-neutral-600">
            {/* Meta: category · date · reading time */}
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

            {/* Title */}
            <h3 className="mt-3 text-xl font-black tracking-tight text-black dark:text-white font-headline leading-snug">
                {href ? (
                    isExternal ? (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-2 underline-offset-4 decoration-black/40 dark:decoration-white/40">{post.title}</a>
                    ) : (
                        <Link to={href} className="hover:underline decoration-2 underline-offset-4 decoration-black/40 dark:decoration-white/40">{post.title}</Link>
                    )
                ) : post.title}
            </h3>

            {/* Excerpt */}
            {post.excerpt && (
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {post.excerpt}
                </p>
            )}

            {/* Key takeaways */}
            {post.takeaways?.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                    {post.takeaways.map((t, i) => (
                        <li key={i} className="flex gap-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                            <Icon name="check_circle" className="mt-0.5 shrink-0 text-black dark:text-white text-sm" />
                            <span>{t}</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* Topic tags */}
            {post.tags?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                        <span key={t} className="text-[10px] font-bold uppercase tracking-widest bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded px-2 py-1">
                            #{t}
                        </span>
                    ))}
                </div>
            )}

            {/* Actions */}
            {(href || post.live || post.repo) && (
                <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-neutral-200 dark:border-neutral-800 pt-4">
                    {href && (
                        isExternal ? (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs font-bold uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all">
                                Read More <Icon name="arrow_outward" className="text-sm" />
                            </a>
                        ) : (
                            <Link to={href} className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs font-bold uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all">
                                Read More <Icon name="arrow_forward" className="text-sm" />
                            </Link>
                        )
                    )}
                    {post.live && (
                        <a href={post.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:border-black dark:hover:border-white transition-all">
                            <Icon name="open_in_new" className="text-sm" /> Live
                        </a>
                    )}
                    {post.repo && (
                        <a href={post.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:border-black dark:hover:border-white transition-all">
                            <Icon name="github" className="text-sm" /> Code
                        </a>
                    )}
                </div>
            )}
        </article>
    );
};

export default BlogCard;

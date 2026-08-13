import Icon from './Icon';

/**
 * Renders "Live Demo" and "Code" buttons for a project.
 * Each button only appears when its URL is provided, so empty
 * link fields never produce dead links. Returns null if neither exists.
 */
const ProjectLinks = ({ live, repo, docs = [], className = '' }) => {
    if (!live && !repo && (!docs || docs.length === 0)) return null;

    return (
        <div className={`flex flex-wrap gap-3 ${className}`}>
            {live && (
                <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs font-bold uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all"
                >
                    <Icon name="open_in_new" className="text-sm" />
                    Live Demo
                </a>
            )}
            {repo && (
                <a
                    href={repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:border-black dark:hover:border-white transition-all"
                >
                    <Icon name="github" className="text-sm" />
                    Code
                </a>
            )}
            {/* Documentation / module links (e.g. course or roadmap write-ups) */}
            {docs?.map((doc) => (
                <a
                    key={doc.url}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:border-black dark:hover:border-white transition-all"
                >
                    <Icon name="open_in_new" className="text-sm" />
                    {doc.label}
                </a>
            ))}
        </div>
    );
};

export default ProjectLinks;

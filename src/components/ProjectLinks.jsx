/**
 * Renders "Live Demo" and "Code" buttons for a project.
 * Each button only appears when its URL is provided, so empty
 * link fields never produce dead links. Returns null if neither exists.
 */
const ProjectLinks = ({ live, repo, className = '' }) => {
    if (!live && !repo) return null;

    return (
        <div className={`flex flex-wrap gap-3 ${className}`}>
            {live && (
                <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs font-bold uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all"
                >
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
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
                    <i className="fa-brands fa-github text-sm" aria-hidden="true"></i>
                    Code
                </a>
            )}
        </div>
    );
};

export default ProjectLinks;

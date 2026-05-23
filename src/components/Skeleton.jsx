/**
 * Skeleton UI Components
 * 
 * Content-aware skeleton loaders that mirror the exact geometry
 * of loaded content to prevent layout shifts (CLS).
 */

/* ─── Base Skeleton Block ─── */
const SkeletonBlock = ({ className = '', style = {} }) => (
    <div
        className={`animate-skeleton bg-neutral-200 dark:bg-neutral-800 rounded ${className}`}
        style={style}
    />
);

/* ─── Project Card Skeleton ─── */
export const ProjectCardSkeleton = () => (
    <div className="bg-white dark:bg-neutral-900 rounded-lg overflow-hidden flex flex-col h-full border border-neutral-200 dark:border-neutral-800">
        {/* Image slot */}
        <SkeletonBlock className="h-64 rounded-none" />
        {/* Content */}
        <div className="p-8 flex-grow flex flex-col gap-3">
            {/* Title */}
            <SkeletonBlock className="h-6 w-3/4" />
            {/* Description lines */}
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-5/6" />
            <SkeletonBlock className="h-4 w-2/3" />
        </div>
    </div>
);

/* ─── Featured Projects Section Skeleton ─── */
export const FeaturedProjectsSkeleton = () => (
    <section className="py-24 max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-8">
            <SkeletonBlock className="h-3 w-24 mb-3" />
            <SkeletonBlock className="h-10 w-64" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[0, 1, 2].map(i => (
                <ProjectCardSkeleton key={i} />
            ))}
        </div>
    </section>
);

/* ─── Technical Impact Metric Skeleton ─── */
const MetricCardSkeleton = () => (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 h-full">
        {/* Icon + label */}
        <div className="flex items-center gap-2 mb-6">
            <SkeletonBlock className="w-5 h-5 rounded-full" />
            <SkeletonBlock className="h-3 w-24" />
        </div>
        {/* Big number */}
        <SkeletonBlock className="h-14 w-24 mb-4" />
        {/* Detail */}
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-3/4 mt-2" />
    </div>
);

/* ─── Technical Impact Section Skeleton ─── */
export const TechnicalImpactSkeleton = () => (
    <section className="py-24 max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-16">
            <SkeletonBlock className="h-3 w-28 mb-3" />
            <SkeletonBlock className="h-10 w-56 mb-4" />
            <SkeletonBlock className="h-4 w-96 max-w-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map(i => (
                <MetricCardSkeleton key={i} />
            ))}
        </div>
    </section>
);

/* ─── Hero Skeleton (Optimistic UI) ─── */
export const HeroSkeleton = () => (
    <header className="min-h-screen lg:min-h-[80vh] flex items-center justify-center px-6 md:px-8 max-w-7xl mx-auto pt-32 pb-16 lg:pt-0 lg:pb-0">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            {/* Text side */}
            <div className="flex-1 flex flex-col items-center lg:items-start space-y-6">
                <SkeletonBlock className="h-10 w-72 mb-2" />
                <SkeletonBlock className="h-16 w-96 max-w-full" />
                <SkeletonBlock className="h-4 w-56 mt-2" />
                <SkeletonBlock className="h-12 w-48 mt-4 rounded-lg" />
            </div>
            {/* Photo side */}
            <div className="flex-shrink-0">
                <SkeletonBlock className="w-72 h-72 md:w-80 md:h-80 rounded-2xl" />
            </div>
        </div>
    </header>
);

/* ─── Generic Page Loader ─── */
export const PageSkeleton = () => (
    <div className="min-h-screen bg-white dark:bg-black">
        <HeroSkeleton />
    </div>
);

/* ─── Objectives Skeleton ─── */
export const ObjectivesSkeleton = () => (
    <section className="py-24 max-w-7xl mx-auto px-6 md:px-8 border-t border-neutral-200 dark:border-neutral-900">
        <div className="mb-16">
            <SkeletonBlock className="h-4 w-32 mb-4" />
            <SkeletonBlock className="h-10 w-64 max-w-full" />
        </div>
        <div className="space-y-6">
            {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col md:flex-row gap-6 p-8 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800">
                    <div className="md:w-1/3">
                        <SkeletonBlock className="h-6 w-3/4 mb-3" />
                        <SkeletonBlock className="h-4 w-full" />
                    </div>
                    <div className="md:w-2/3 space-y-3">
                        <SkeletonBlock className="h-4 w-full" />
                        <SkeletonBlock className="h-4 w-5/6" />
                    </div>
                </div>
            ))}
        </div>
    </section>
);

/* ─── About Page Skeleton ─── */
export const AboutSkeleton = () => (
    <div className="pt-28 pb-20 px-6 md:px-8 max-w-4xl mx-auto min-h-screen">
        <SkeletonBlock className="h-4 w-24 mb-6 mx-auto" />
        <SkeletonBlock className="h-12 w-3/4 mb-10 mx-auto" />
        <div className="aspect-[21/9] w-full rounded-3xl mb-16 bg-neutral-200 dark:bg-neutral-900 animate-skeleton" />
        <div className="space-y-6">
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-11/12" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-5/6" />
        </div>
    </div>
);

export default SkeletonBlock;

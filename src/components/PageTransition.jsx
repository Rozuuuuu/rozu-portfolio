// [PERF FIX 5] Framer Motion LazyMotion optimization
import { m } from 'framer-motion';

const pageVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } },
};

const PageTransition = ({ children }) => (
    <m.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ overflow: 'clip' }}
    >
        {children}
    </m.div>
);

export default PageTransition;

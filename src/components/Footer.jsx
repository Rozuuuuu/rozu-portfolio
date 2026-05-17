import ScrollReveal from './ScrollReveal';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-black w-full border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
            <ScrollReveal className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6 md:px-8 py-12 gap-6">
                <div className="font-headline font-bold text-black dark:text-white">
                    Rozu
                </div>
                <p className="font-['Public_Sans'] text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
                    © 2026 Rozu Portfolio. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <a className="font-['Public_Sans'] text-xs uppercase tracking-widest text-black dark:text-white underline decoration-2 underline-offset-4 transition-all ease-in-out duration-200 hover:text-neutral-500" href="https://github.com/Rozuuuuu" target="_blank" rel="noopener noreferrer" >GitHub</a>
                    <a className="font-['Public_Sans'] text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-500 hover:text-black dark:hover:text-white underline decoration-2 underline-offset-4 transition-all ease-in-out duration-200" href="https://www.linkedin.com/in/lloyd-rosales-a72b9730b/" target="_blank" rel="noopener noreferrer" >LinkedIn</a>
                    <a className="font-['Public_Sans'] text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-500 hover:text-black dark:hover:text-white underline decoration-2 underline-offset-4 transition-all ease-in-out duration-200" href="mailto:code.with.lloyd@gmail.com" target="_blank" rel="noopener noreferrer" >Email</a>
                </div>
            </ScrollReveal>
        </footer>
    );
};

export default Footer;

import { useEffect, useState } from 'react';
import { DarkModeContext } from './DarkModeContextBase';

export const DarkModeProvider = ({ children }) => {
    const [dark, setDark] = useState(() => {
        const stored = localStorage.getItem('theme');
        if (stored) return stored === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (dark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [dark]);

    return (
        <DarkModeContext.Provider value={{ dark, setDark, toggle: () => setDark(d => !d) }}>
            {children}
        </DarkModeContext.Provider>
    );
};

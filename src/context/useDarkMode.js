import { useContext } from 'react';
import { DarkModeContext } from './DarkModeContextBase';

export const useDarkMode = () => useContext(DarkModeContext);

import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import '../components/css/ThemeToggle.css';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Переключить тему">
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
}
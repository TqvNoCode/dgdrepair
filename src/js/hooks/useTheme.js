import { useState, useEffect } from 'react';

const STORAGE_KEY = 'gdgrepair_theme';

/**
 * Custom hook for managing Dark/Light theme mode with localStorage persistence
 * Default theme is 'dark' as specified in design requirements
 * @returns {{ theme: 'dark'|'light', toggleTheme: () => void, isDark: boolean }}
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch (e) {
      // Fallback if localStorage is inaccessible
    }
    // Default to Dark Tech theme
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    root.setAttribute('data-theme', theme);

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // Ignore localStorage write error if blocked in privacy mode
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  };
}

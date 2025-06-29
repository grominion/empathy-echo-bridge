
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('echo-theme');
    return (stored as Theme) || 'light';
  });

  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const updateTheme = () => {
        const isDark = mediaQuery.matches;
        setActualTheme(isDark ? 'dark' : 'light');
        root.classList.toggle('dark', isDark);
      };
      
      updateTheme();
      mediaQuery.addEventListener('change', updateTheme);
      
      return () => mediaQuery.removeEventListener('change', updateTheme);
    } else {
      const isDark = theme === 'dark';
      setActualTheme(isDark ? 'dark' : 'light');
      root.classList.toggle('dark', isDark);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('echo-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

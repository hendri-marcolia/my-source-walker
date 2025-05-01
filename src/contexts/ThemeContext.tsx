import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  glow: string;
}

interface Theme {
  name: string;
  colors: ThemeColors;
  assets: {
    backgrounds: {
      main: string;
    };
  };
}

const defaultTheme: Theme = {
  name: 'default',
  colors: {
    primary: '#4a5568',
    secondary: '#2d3748',
    accent: '#4299e1',
    background: '#ffffff',
    foreground: '#1a202c',
    muted: '#e2e8f0',
    border: '#cbd5e0',
    glow: 'rgba(66, 153, 225, 0.5)',
  },
  assets: {
    backgrounds: {
      main: 'none',
    },
  },
};

const ThemeContext = createContext<{
  currentTheme: Theme;
  setTheme: (name: string) => void;
  availableThemes: string[];
}>({
  currentTheme: defaultTheme,
  setTheme: () => {},
  availableThemes: ['default'],
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);

  const setTheme = (name: string) => {
    setCurrentTheme(defaultTheme); // For now, just use default theme
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, availableThemes: ['default'] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
} 
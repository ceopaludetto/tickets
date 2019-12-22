import React, { useState, createContext } from 'react';
import { Helmet } from 'react-helmet-async';

const enum Theme {
  Dark = 'dark',
  Light = 'light',
}

interface ThemeChangerProps {
  children?: React.ReactNode;
}

type ThemeChangerContextProps = {
  setTheme(): React.Dispatch<React.SetStateAction<Theme>>;
} | null;

export const ThemeChangerContext = createContext<ThemeChangerContextProps>(null);

export function ThemeChanger({ children }: ThemeChangerProps) {
  const [currentTheme, setTheme] = useState(Theme.Light);

  return (
    <>
      <ThemeChangerContext.Provider value={{ setTheme } as ThemeChangerContextProps}>
        <>
          <Helmet htmlAttributes={{ 'data-theme': currentTheme }} />
          {children}
        </>
      </ThemeChangerContext.Provider>
    </>
  );
}

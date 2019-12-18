import React, { useState, useMemo, createContext } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { get, merge } from 'lodash';

import { theme as baseTheme } from '@/client/providers/theme';

const enum Modes {
  light = 'light',
  dark = 'dark',
}

const getTheme = (mode: Modes) =>
  merge({}, baseTheme, {
    colors: get(baseTheme.colors.modes, mode, baseTheme.colors),
  });

interface ThemeChangerProps {
  children?: React.ReactNode;
}

interface ThemeChangerContextProps {
  setThemeMode: React.Dispatch<React.SetStateAction<Modes>>;
}

export const ThemeChangerContext = createContext<ThemeChangerContextProps>({
  setThemeMode: () => {},
});

export function ThemeChanger({ children }: ThemeChangerProps) {
  const [mode, setMode] = useState(Modes.dark);
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <ThemeChangerContext.Provider value={{ setThemeMode: setMode }}>{children}</ThemeChangerContext.Provider>
    </ThemeProvider>
  );
}

import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { useEffectOnce } from 'react-use';

import { theme } from '@/client/providers/theme';

interface ThemeChanger {
  children?: React.ReactNode;
}

export function ThemeChanger({ children }: ThemeChanger) {
  useEffectOnce(() => {
    const jss = document.querySelector('#ssr');
    if (jss && jss.parentNode) jss.parentNode.removeChild(jss);
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

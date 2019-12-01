import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { useEffectOnce } from 'react-use';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import ptBR from 'date-fns/locale/pt-BR';
import DateFnsUtils from '@date-io/date-fns';

import { theme } from '@/client/providers/theme';

interface ProvidersProps {
  children?: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffectOnce(() => {
    const jss = document.querySelector('#ssr');
    if (jss && jss.parentNode) jss.parentNode.removeChild(jss);
  });

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
        <>{children}</>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

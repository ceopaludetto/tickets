import { createGlobalStyle } from 'styled-components';
import { reboot } from 'styled-reboot';

import { mapBackground, mapContrastText } from '@/client/styles/maps';

const RebootCss = reboot();

export const GlobalStyle = createGlobalStyle`
  ${RebootCss}

  body {
    background-color: ${mapBackground};
    color: ${mapContrastText};
  }
`;

import { createGlobalStyle } from 'styled-components';
import { reboot } from 'styled-reboot';

import { MapBackgroundDarken, MapContrastText } from '@/client/styles/maps';

const RebootCss = reboot();

export const GlobalStyle = createGlobalStyle`
  ${RebootCss}

  body {
    background-color: ${MapBackgroundDarken};
    color: ${MapContrastText};
  }
`;

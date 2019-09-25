import { createGlobalStyle } from 'styled-components';
import { reboot } from 'styled-reboot';

import { mapBackground, mapContrastText } from '@/client/styles/maps';
import { Theme } from '@/client/providers/theme';

export const GlobalStyle = createGlobalStyle`
  ${reboot()}
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    background-color: ${mapBackground};
    color: ${mapContrastText};
    font-family: ${props => (props.theme as Theme).typography.fontFamily}
  }
`;

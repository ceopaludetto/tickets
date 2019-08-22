import { createGlobalStyle } from 'styled-components';

import { Theme } from '@/client/providers/theme';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  body {
    background-color: ${props => (props.theme as Theme).colors.background}
  }
`;

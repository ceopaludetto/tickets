import { createGlobalStyle } from 'styled-components';

import { MapBackgroundDarken } from '@/client/styles/maps';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    font-weight: 400;
    line-height: 1.42857142857143;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    text-decoration-skip-ink: auto;
  }

  body {
    background-color: ${MapBackgroundDarken}
  }
`;

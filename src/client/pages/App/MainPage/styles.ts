import styled, { createGlobalStyle } from 'styled-components';

import { mapBackground } from '@/client/styles/maps';

export const Main = styled.div`
  margin-left: 250px;
  padding: 0 1rem;
  background-color: ${mapBackground};
`;

export const GlobalBackground = createGlobalStyle`
  body {
    background-color: ${mapBackground}!important;
  }
`;

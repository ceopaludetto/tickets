import styled, { createGlobalStyle } from 'styled-components';

import { MapBackgroundDarken } from '@/client/styles/maps';

export const Content = styled.div`
  padding: 0 1rem;
  margin-left: 250px;
  background-color: ${MapBackgroundDarken};
`;

export const GlobalBackground = createGlobalStyle`
  body {
    background-color: ${MapBackgroundDarken}!important;
  }
`;

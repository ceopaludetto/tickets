import styled from 'styled-components';

import { MapBackground, MapBorder } from '@/client/styles/maps';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  position: fixed;
  width: 250px;
  background-color: ${MapBackground};
  border-right: 1px solid ${MapBorder};
`;

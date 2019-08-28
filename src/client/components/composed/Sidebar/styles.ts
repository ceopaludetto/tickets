import styled from 'styled-components';

import { MapBackground } from '@/client/styles/maps';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  position: fixed;
  width: 250px;
  background-color: ${MapBackground};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
`;

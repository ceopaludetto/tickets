import styled from 'styled-components';

import { mapBorder } from '@/client/styles/maps';

export const Container = styled.div`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  overflow: hidden;
  border: 2px solid ${mapBorder};
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 50%;
`;

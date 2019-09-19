import styled from 'styled-components';

import { mapBorder } from '@/client/styles/maps';

export const TabBar = styled.div`
  display: flex;
  border-bottom: 2px solid ${mapBorder};
`;

export { TabBarItem } from './item';

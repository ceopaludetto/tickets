import styled from 'styled-components';

import { MapBorder } from '@/client/styles/maps';

export const TabBar = styled.div`
  display: flex;
  border-bottom: 1px solid ${MapBorder};
`;

export { TabBarItem } from './item';

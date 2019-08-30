import styled from 'styled-components';

import { MapBorder } from '@/client/styles/maps';

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${MapBorder};
  margin: 1.5rem 0;
`;

import styled from 'styled-components';

import { radius } from '@/client/styles/utils';
import { mapSidebar, mapBorder, mapContrastText } from '@/client/styles/maps';

export const Alert = styled.div`
  padding: 1rem;
  background-color: ${mapSidebar};
  border: 2px solid ${mapBorder};
  color: ${mapContrastText};
  border-radius: ${radius(1.5)};
  margin-bottom: 1rem;
`;

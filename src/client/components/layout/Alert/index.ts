import styled from 'styled-components';

import { radius } from '@/client/styles/utils';
import {
  MapBackground,
  MapBorder,
  MapContrastText,
} from '@/client/styles/maps';

export const Alert = styled.div`
  padding: 1rem;
  background-color: ${MapBackground};
  border: 2px solid ${MapBorder};
  color: ${MapContrastText};
  border-radius: ${radius(1.5)};
  margin-bottom: 1rem;
`;

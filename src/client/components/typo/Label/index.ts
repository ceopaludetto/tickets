import styled from 'styled-components';

import { mapMuted } from '@/client/styles/maps';

export const Label = styled.label`
  font-size: 0.85rem;
  display: inline-block;
  margin-bottom: 0.35rem;
  font-weight: 500;
  color: ${mapMuted};
`;

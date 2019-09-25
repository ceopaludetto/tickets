import styled from 'styled-components';

import { mapMuted, fontWeight } from '@/client/styles/maps';

export const Label = styled.label`
  font-size: 0.9rem;
  display: inline-block;
  text-transform: capitalize;
  margin-bottom: 0.35rem;
  font-weight: ${fontWeight('medium')};
  color: ${mapMuted};
`;

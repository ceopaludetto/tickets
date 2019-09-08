import styled from 'styled-components';

import { constantColor } from '@/client/styles/utils';

export const Label = styled.label`
  font-size: 0.85rem;
  display: inline-block;
  margin-bottom: 0.35rem;
  font-weight: 600;
  color: ${constantColor('label')};
`;

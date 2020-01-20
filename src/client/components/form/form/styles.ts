import styled from 'styled-components';
import { theme } from 'styled-tools';

export const Error = styled.span`
  color: ${theme('colors.danger.main')};
  font-size: 1rem;
  display: block;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

import styled from 'styled-components';
import { theme } from 'styled-tools';

export const Container = styled.label`
  color: ${theme('colors.background.contrast')};
  font-size: ${theme('font.sizes.sm')};
  letter-spacing: 1.25px;
`;

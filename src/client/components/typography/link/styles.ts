import { Link } from 'react-router-dom';

import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { getThemeColor } from '@/client/utils/styles';

import { LinkProps } from './index.dto';

export const Container = styled(Link)<LinkProps>`
  font-size: 1rem;
  ${ifProp(
    'gutterBottom',
    css`
      margin-bottom: 1rem;
    `
  )} 
  color: ${getThemeColor('main')};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: ${getThemeColor('hover')};
  }
`;

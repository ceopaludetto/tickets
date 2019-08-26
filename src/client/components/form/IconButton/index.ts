import styled from 'styled-components';

import { MapBorder, MapContrastText } from '@/client/styles/utils';

export const IconButton = styled.button`
  border-radius: 50%;
  padding: 0.5rem;
  background-color: transparent;
  border: none;
  display: inline-flex;
  align-items: center;
  transition: background-color 125ms ease-in-out;
  color: ${MapContrastText};
  cursor: pointer;
  &:hover,
  &:focus {
    outline: none;
    background-color: ${MapBorder};
  }
`;

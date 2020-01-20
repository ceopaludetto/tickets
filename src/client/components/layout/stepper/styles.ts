import styled, { css } from 'styled-components';
import { ifProp, theme } from 'styled-tools';

export const Container = styled.div`
  display: flex;
  margin: 0 -1rem;
  align-items: center;
  padding: 0.5rem 0 1.5rem;
`;

export const Text = styled.span`
  font-size: 1.25rem;
  color: ${theme('colors.disabledText.main')};
`;

export const Icon = styled.div`
  padding-right: 0.5rem;
  display: flex;
  color: ${theme('colors.disabledText.main')};
`;

export const Divider = styled.div<{ active: boolean }>`
  height: 2px;
  border-radius: 6px;
  flex: 1;
  background-color: ${theme('colors.disabledText.main')};
  ${ifProp(
    'active',
    css`
      background-color: ${theme('colors.primary.main')};
    `
  )}
`;

export const Item = styled.div<{ active: boolean }>`
  cursor: pointer;
  display: flex;
  padding: 0 1rem;
  align-items: center;
  &:focus {
    outline: none;
  }
  ${ifProp(
    'active',
    css`
      ${Text} {
        color: ${theme('colors.primary.main')};
      }
      ${Icon} {
        color: ${theme('colors.primary.main')};
      }
    `
  )}
`;

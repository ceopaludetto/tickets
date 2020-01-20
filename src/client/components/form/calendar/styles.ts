import { motion } from 'framer-motion';
import styled from 'styled-components';
import { theme } from 'styled-tools';

import { Paper } from '@/client/components/layout';

import { Button } from '../button';

export const Container = styled(Paper)`
  max-width: 400px;
  width: 100%;
`;

export const ButtonLike = styled.div`
  font-weight: ${theme('font.weights.medium')};
  letter-spacing: 1.25px;
  text-transform: capitalize;
`;

export const Week = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.675rem !important;
  text-align: center;
`;

export const WeekItem = styled(ButtonLike)`
  font-size: ${theme('font.sizes.xs')};
  padding-bottom: 0.25rem;
  color: ${theme('colors.secondary.main')};
`;

export const WeekButton = styled(Button)`
  padding: 0.65rem 0 !important;
  width: 100%;
`;

export const StyledButton = styled.button`
  font-size: ${theme('font.sizes.sm')};
  color: ${theme('colors.primary.main')};
  width: 100%;
  border: none;
  background-color: transparent;
  padding: 0.675rem 0;
  transition: color 100ms ease-in-out, font-size 100ms ease-in-out;
  cursor: pointer;
  &:active,
  &:focus {
    color: ${theme('colors.secondary.main')};
  }
  &:focus {
    outline: none;
  }
  &.active {
    font-size: ${theme('font.sizes.lg')};
    padding: 0.875rem 0;
    color: ${theme('colors.secondary.main')};
  }
`;

export const NoPaddingButton = styled(Button)`
  padding: 0;
`;

export const ShowingDate = styled(NoPaddingButton)`
  font-size: ${theme('font.sizes.lg')};
`;

export const HiddenButton = styled(WeekButton)`
  padding: calc(1rem + 2.39px) 0 !important;
  cursor: default !important;
`;

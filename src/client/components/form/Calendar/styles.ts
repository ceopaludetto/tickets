import styled, { css } from 'styled-components';

import { radius, color } from '@/client/styles/utils';
import {
  mapBackground,
  mapBorder,
  mapContrastText,
  mapLabel,
  mapMuted,
  darklizer,
  readableDarklizer,
} from '@/client/styles/maps';

export const Footer = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  margin-top: 2px;
  z-index: 50;
  padding: 1rem;
  flex-direction: column;
  border: 2px solid ${mapBorder};
  background-color: ${mapBackground};
  border-radius: ${radius()};
  min-width: 300px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.75rem;
`;

export const DayBody = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto;
  grid-auto-rows: minmax(33px, auto);
  grid-gap: 0.25rem;
`;

export const MonthBody = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, minmax(33px, auto));
  grid-gap: 0.5rem;
`;

export const WeekDay = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
  font-weight: 600;
  color: ${mapMuted};
`;

export const Day = styled.button`
  border: none;
  background-color: transparent;
  border-radius: ${radius()};
  font-size: 0.9rem;
  color: ${mapContrastText};
  transition: background-color 150ms ease-in-out;
  &:not(:disabled):hover {
    background-color: ${mapBorder};
  }
  &:disabled {
    color: ${mapLabel}!important;
  }
  &:focus {
    outline: none;
  }
  &.active {
    ${color(
      'primary',
      ({ main }) =>
        css`
          background-color: ${darklizer(main)}!important;
          color: ${readableDarklizer(main)};
        `
    )}
  }
`;

export const HeaderButton = styled.button`
  border-radius: ${radius()};
  color: ${mapContrastText};
  border: none;
  background-color: transparent;
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: capitalize;
  transition: color 150ms ease-in-out, background-color 150ms ease-in-out;
  color: ${mapLabel};
  &:not(:disabled):hover {
    background-color: ${mapBorder};
    color: ${mapContrastText};
  }
  &:focus {
    outline: none;
  }
  &.active {
    color: ${mapContrastText}!important;
  }
`;

export const WeekOrYearButton = styled(HeaderButton)`
  font-size: 1rem;
  color: ${mapContrastText};
  &:disabled {
    color: ${mapLabel};
  }
  &.active {
    ${color(
      'primary',
      ({ main }) =>
        css`
          background-color: ${darklizer(main)}!important;
          color: ${readableDarklizer(main)}!important;
        `
    )}
  }
`;

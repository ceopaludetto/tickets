import styled, { css } from 'styled-components';

import {
  radius,
  constantColor,
  color,
  readableColor,
} from '@/client/styles/utils';
import {
  MapBackground,
  MapBorder,
  MapContrastText,
} from '@/client/styles/maps';

export const Footer = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  margin-top: 2px;
  z-index: 50;
  padding: 1rem;
  flex-direction: column;
  border: 2px solid ${MapBorder};
  background-color: ${MapBackground};
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

export const YearBody = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-gap: 0.5rem;
  overflow-y: auto;
  max-height: 200px;
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
  color: ${constantColor('label')};
`;

export const Day = styled.button`
  border: none;
  background-color: transparent;
  border-radius: ${radius()};
  color: ${MapContrastText};
  transition: background-color 150ms ease-in-out;
  &:not(:disabled):hover {
    background-color: ${MapBorder};
  }
  &:disabled {
    color: ${constantColor('label')}!important;
  }
  &:focus {
    outline: none;
  }
  &.active {
    ${color(
      'primary',
      ({ main }) =>
        css`
          background-color: ${main}!important;
          color: ${readableColor(main)};
        `
    )}
  }
`;

export const HeaderButton = styled.button`
  border-radius: ${radius()};
  color: ${MapContrastText};
  border: none;
  background-color: transparent;
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: capitalize;
  transition: color 150ms ease-in-out, background-color 150ms ease-in-out;
  color: ${constantColor('label')};
  &:not(:disabled):hover {
    background-color: ${MapBorder};
    color: ${MapContrastText};
  }
  &:focus {
    outline: none;
  }
  &.active {
    color: ${MapContrastText}!important;
  }
`;

export const WeekOrYearButton = styled(HeaderButton)`
  font-size: 1rem;
  color: ${MapContrastText};
  &:disabled {
    color: ${constantColor('label')};
  }
  &.active {
    ${color(
      'primary',
      ({ main }) =>
        css`
          background-color: ${main}!important;
          color: ${readableColor(main)}!important;
        `
    )}
  }
`;

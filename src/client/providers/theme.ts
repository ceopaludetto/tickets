import { lighten, darken, readableColor, parseToRgb } from 'polished';

const PRIMARY = '#3B60E4';
const DANGER = '#FDCA40';
const ERROR = '#DF2935';
const BLACK = '#080708';
const WHITE = '#FFF';

const BACKGROUND = '#f9fbfd';
const BACKGROUND_DARK = '#303030';

export const enum Mode {
  Light = 'LIGHT',
  Dark = 'DARK',
}

export const theme = {
  mode: Mode.Light,
  grid: 12,
  radius: '6px',
  colors: {
    primary: {
      light: lighten(0.05, PRIMARY),
      main: PRIMARY,
      darken: darken(0.05, PRIMARY),
      text: readableColor(PRIMARY),
      rgb: parseToRgb(PRIMARY),
    },
    danger: {
      light: lighten(0.05, DANGER),
      main: DANGER,
      darken: darken(0.05, DANGER),
      text: readableColor(DANGER),
      rgb: parseToRgb(DANGER),
    },
    error: {
      light: lighten(0.05, ERROR),
      main: ERROR,
      darken: darken(0.05, ERROR),
      text: readableColor(ERROR),
      rgb: parseToRgb(ERROR),
    },
    black: {
      light: lighten(0.05, BLACK),
      main: BLACK,
      darken: darken(0.05, BLACK),
      text: readableColor(BLACK),
      rgb: parseToRgb(BLACK),
    },
    white: WHITE,
    background: BACKGROUND,
    backgroundDark: BACKGROUND_DARK,
  },
};

export const gridTheme = {
  row: {
    padding: 16,
  },
  col: {
    padding: 16,
  },
  container: {
    padding: 16,
  },
};

export type Theme = typeof theme;

import { lighten, darken, readableColor } from 'polished';

const PRIMARY = '#2c7be5';
const DANGER = '#FDCA40';
const ERROR = '#DF2935';
const BLACK = '#080708';
const WHITE = '#FFF';

const BACKGROUND = '#fafbfc';
const BACKGROUND_DARK = '#303030';
const BORDER = '#dfe1e6';
const BORDER_DARK = '#212121';

const LABEL = '#6b778c';

export const enum Mode {
  Light = 'LIGHT',
  Dark = 'DARK',
}

export const theme = {
  mode: Mode.Light,
  grid: 12,
  radius: 3,
  colors: {
    primary: {
      lighten: lighten(0.05, PRIMARY),
      main: PRIMARY,
      darken: darken(0.05, PRIMARY),
      text: readableColor(PRIMARY),
    },
    danger: {
      lighten: lighten(0.05, DANGER),
      main: DANGER,
      darken: darken(0.05, DANGER),
      text: readableColor(DANGER),
    },
    error: {
      lighten: lighten(0.05, ERROR),
      main: ERROR,
      darken: darken(0.05, ERROR),
      text: readableColor(ERROR),
    },
    black: BLACK,
    white: WHITE,
    label: LABEL,
    background: {
      lighten: lighten(0.025, BACKGROUND),
      main: BACKGROUND,
      darken: darken(0.025, BACKGROUND),
      text: readableColor(BACKGROUND),
    },
    backgroundDark: {
      lighten: lighten(0.025, BACKGROUND_DARK),
      main: BACKGROUND_DARK,
      darken: darken(0.025, BACKGROUND_DARK),
      text: readableColor(BACKGROUND_DARK),
    },
    border: BORDER,
    borderDark: BORDER_DARK,
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

import { lighten, darken, parseToRgb } from 'polished';

import {
  PRIMARY,
  DANGER,
  ERROR,
  LABEL,
  BLACK,
  WHITE,
  BACKGROUND,
  BACKGROUND_DARK,
  BORDER,
  BORDER_DARK,
  LABEL_DARK,
  MUTED,
  MUTED_DARK,
  SIDEBAR,
  SIDEBAR_DARK,
} from '@/client/styles/constants';

export function readableColor(c: string) {
  const { red, green, blue } = parseToRgb(c);
  const yiq = (red * 299 + green * 587 + blue * 114) / 1000;

  if (yiq >= 150) {
    return '#000';
  }

  return '#fff';
}

export const enum Mode {
  Light = 'LIGHT',
  Dark = 'DARK',
}

export const theme = {
  mode: Mode.Light,
  grid: 12,
  radius: 4,
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
    labelDark: LABEL_DARK,
    background: BACKGROUND,
    backgroundDark: BACKGROUND_DARK,
    sidebar: SIDEBAR,
    sidebarDark: SIDEBAR_DARK,
    border: BORDER,
    borderDark: BORDER_DARK,
    muted: MUTED,
    mutedDark: MUTED_DARK,
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

export type Theme = typeof theme & {
  [index: string]: Partial<typeof theme>;
};

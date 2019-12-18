import { lighten, darken } from 'polished';

import { colorYIQ, toRGBA } from '@/client/utils/styles';

export const theme = {
  colors: {
    modes: {
      light: {},
      dark: {
        primary: {
          main: '#2e9aff',
          light: lighten(0.05, '#2e9aff'),
          dark: darken(0.05, '#2e9aff'),
          darkest: darken(0.075, '#2e9aff'),
          contrast: colorYIQ('#2e9aff'),
          opacity: [toRGBA('#2e9aff', 0.2), toRGBA('#2e9aff', 0.3)],
        },
        secondary: {
          main: '#2e9aff',
          light: lighten(0.05, '#2e9aff'),
          dark: darken(0.05, '#2e9aff'),
          darkest: darken(0.075, '#2e9aff'),
          contrast: colorYIQ('#2e9aff'),
          opacity: [toRGBA('#2e9aff', 0.2), toRGBA('#2e9aff', 0.3)],
        },
        danger: {
          main: '#2e9aff',
          light: lighten(0.05, '#2e9aff'),
          dark: darken(0.05, '#2e9aff'),
          darkest: darken(0.075, '#2e9aff'),
          contrast: colorYIQ('#2e9aff'),
          opacity: [toRGBA('#2e9aff', 0.2), toRGBA('#2e9aff', 0.3)],
        },
        background: {
          main: '#303030',
          light: lighten(0.05, '#303030'),
          dark: darken(0.05, '#303030'),
          darkest: darken(0.075, '#303030'),
          contrast: colorYIQ('#303030'),
          opacity: [toRGBA('#303030', 0.2), toRGBA('#303030', 0.3)],
        },
        divider: {
          main: '#1a1a1a',
          light: lighten(0.05, '#1a1a1a'),
          dark: darken(0.05, '#1a1a1a'),
          darkest: darken(0.075, '#1a1a1a'),
          contrast: colorYIQ('#1a1a1a'),
          opacity: [toRGBA('#1a1a1a', 0.2), toRGBA('#1a1a1a', 0.3)],
        },
        active: {
          main: '#eeeeee',
          light: lighten(0.05, '#eeeeee'),
          dark: darken(0.05, '#eeeeee'),
          darkest: darken(0.075, '#eeeeee'),
          contrast: colorYIQ('#eeeeee'),
          opacity: [toRGBA('#eeeeee', 0.2), toRGBA('#eeeeee', 0.3)],
        },
        border: {
          main: '#2a2a2a',
          light: lighten(0.05, '#2a2a2a'),
          dark: darken(0.05, '#2a2a2a'),
          darkest: darken(0.075, '#2a2a2a'),
          contrast: colorYIQ('#2a2a2a'),
          opacity: [toRGBA('#2a2a2a', 0.2), toRGBA('#2a2a2a', 0.3)],
        },
      },
    },
  },
};

export type Theme = typeof theme;

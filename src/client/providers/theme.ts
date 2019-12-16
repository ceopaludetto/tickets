import { lighten, darken } from 'polished';
import { RgbColor } from 'polished/lib/types/color';

import { colorYIQ } from '@/client/utils/color.yiq';

export const theme = {
  colors: {
    primary: { main: '#2e9aff', light: lighten(2.5, '#2e9aff'), dark: darken(2.5, '#2e9aff') },
    secondary: { main: '#2e9aff', light: lighten(2.5, '#2e9aff'), dark: darken(2.5, '#2e9aff') },
    danger: { main: '#2e9aff', light: lighten(2.5, '#2e9aff'), dark: darken(2.5, '#2e9aff') },
    getContrastText: (color: string | RgbColor) => colorYIQ(color, '#000', '#FFF'),
  },
  shape: {
    radius: 6,
  },
  breakpoints: {
    xs: 0,
    sm: 540,
    md: 768,
    lg: 992,
    xl: 1200,
  },
};

export type Theme = typeof theme;

import { getColors } from '@/client/utils/styles';
import { ThemeType, ColorType } from '@/client/utils/styles.dto';

const colors: ColorType = {
  [ThemeType.Light]: {
    primary: '#1e1e24',
    secondary: '#1976d2',
    background: '#fafafa',
    paper: '#ffffff',
    danger: '#ef3054',
    disabled: 'rgba(0, 0, 0, 0.12)',
    disabledText: 'rgba(0, 0, 0, 0.26)',
  },
  [ThemeType.Dark]: {
    primary: '#f7f7f2',
    secondary: '#42a5f5',
    background: '#2a2a2a',
    paper: '#303030',
    danger: '#ef3054',
    disabled: 'rgba(255, 255, 255, 0.12)',
    disabledText: 'rgba(255, 255, 255, 0.3)',
  },
};

export const genTheme = (mode: ThemeType = ThemeType.Light) => ({
  mode,
  shape: {
    radius: '6px',
  },
  layout: {
    gutter: '1rem',
    columns: 12,
  },
  font: {
    defaultSize: '16px',
    family: '"Roboto"',
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
    },
    sizes: {
      xs: '0.875rem',
      sm: '1rem',
      md: '1.25rem',
      lg: '1.5rem',
      xl: '2rem',
    },
  },
  breakpoints: {
    xs: 0,
    sm: 552,
    md: 768,
    lg: 992,
    xl: 1200,
  },
  colors: {
    ...getColors(colors, mode),
  },
});

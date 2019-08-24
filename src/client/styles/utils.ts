import { ThemedStyledProps } from 'styled-components';
import theme from 'styled-theming';

import { Mode, Theme } from '@/client/providers/theme';

export const MapBorder = theme('mode', {
  [Mode.Light]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.border,
  [Mode.Dark]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.borderDark,
});

export const MapBackground = theme('mode', {
  [Mode.Light]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.background.main,
  [Mode.Dark]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.backgroundDark.main,
});

export const MapBackgroundDarken = theme('mode', {
  [Mode.Light]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.background.darken,
  [Mode.Dark]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.backgroundDark.darken,
});

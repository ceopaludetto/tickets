/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const MapBackgroundInverted = theme('mode', {
  [Mode.Light]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.backgroundDark.main,
  [Mode.Dark]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.background.main,
});

export const MapBackgroundDarken = theme('mode', {
  [Mode.Light]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.background.darken,
  [Mode.Dark]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.backgroundDark.darken,
});

export const MapContrastText = theme('mode', {
  [Mode.Light]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.black,
  [Mode.Dark]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.white,
});

export const MapFocus = theme('mode', {
  [Mode.Light]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.white,
  [Mode.Dark]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.borderDark,
});

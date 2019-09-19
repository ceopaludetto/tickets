/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemedStyledProps } from 'styled-components';
import { lighten } from 'polished';
import theme from 'styled-theming';

import { Mode, Theme, readableColor } from '@/client/providers/theme';

export const mapBorder = theme('mode', {
  [Mode.Light]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.border,
  [Mode.Dark]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.borderDark,
});

export const mapBackground = theme('mode', {
  [Mode.Light]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.background,
  [Mode.Dark]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.backgroundDark,
});

export const mapBackgroundInverted = theme('mode', {
  [Mode.Light]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.backgroundDark,
  [Mode.Dark]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.background,
});

export const mapContrastText = theme('mode', {
  [Mode.Light]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.black,
  [Mode.Dark]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.white,
});

export const mapLabel = theme('mode', {
  [Mode.Light]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.label,
  [Mode.Dark]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.labelDark,
});

export const mapMuted = theme('mode', {
  [Mode.Light]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.muted,
  [Mode.Dark]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.mutedDark,
});

export const mapSidebar = theme('mode', {
  [Mode.Light]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.sidebar,
  [Mode.Dark]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.sidebarDark,
});

export const darklizer = (c: string) =>
  theme('mode', {
    [Mode.Light]: c,
    [Mode.Dark]: lighten(0.05, c),
  });

export const readableDarklizer = (c: string) =>
  theme('mode', {
    [Mode.Light]: readableColor(c),
    [Mode.Dark]: readableColor(lighten(0.05, c)),
  });

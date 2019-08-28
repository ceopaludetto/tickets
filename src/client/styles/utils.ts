/* eslint-disable security/detect-object-injection, @typescript-eslint/no-explicit-any */
import { ThemedStyledProps } from 'styled-components';

import { Theme } from '@/client/providers/theme';

export type ColorMap<T> = keyof T;

export type Filtered = 'black' | 'white' | 'label' | 'border' | 'borderDark';

export type ReturnColor = {
  [K in keyof Theme['colors']['primary']]: Theme['colors']['primary'][K];
};

export const color = (
  variant: ColorMap<Omit<Theme['colors'], Filtered>>,
  cb: (c: ReturnColor) => any
) => (props: ThemedStyledProps<{}, {}>): ReturnColor | any => {
  if (cb) {
    return cb((props.theme as Theme).colors[variant]);
  }

  return (props.theme as Theme).colors[variant];
};

export const constantColor = (
  variant: ColorMap<Pick<Theme['colors'], Filtered>>
) => (props: ThemedStyledProps<{}, {}>): string =>
  (props.theme as Theme).colors[variant];

export const radius = (multiply: number = 1) => (
  props: ThemedStyledProps<{}, {}>
): number => (props.theme as Theme).radius * multiply;

export const mode = (props: ThemedStyledProps<{}, {}>) =>
  (props.theme as Theme).mode;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemedStyledProps } from 'styled-components';
import { rgba as polishedRGBA, parseToRgb } from 'polished';

import { Theme } from '@/client/providers/theme';

export type ColorMap<T> = keyof T;

export type Filtered = 'black' | 'white' | 'label' | 'border' | 'borderDark';

export type ReturnColor = {
  [K in keyof Theme['colors']['primary']]: Theme['colors']['primary'][K];
};

export const color = <T>(
  variant: ColorMap<Omit<Theme['colors'], Filtered>>,
  cb: (c: ReturnColor, props: ThemedStyledProps<T, {}>) => any
) => (props: ThemedStyledProps<T, {}>): ReturnColor | any => {
  if (cb) {
    return cb((props.theme as Theme).colors[variant], props);
  }

  return (props.theme as Theme).colors[variant];
};

export const constantColor = (
  variant: ColorMap<Pick<Theme['colors'], Filtered>>
) => (props: ThemedStyledProps<{}, {}>): string =>
  (props.theme as Theme).colors[variant];

export const radius = (multiply: number = 1) => (
  props: ThemedStyledProps<{}, {}>
): string => `${(props.theme as Theme).radius * multiply}px`;

export const mode = (props: ThemedStyledProps<{}, {}>) =>
  (props.theme as Theme).mode;

interface ColorToRGB {
  red: number;
  blue: number;
  green: number;
}

export const rgba = (c: ColorToRGB | string, amount: number) => {
  if ((c as ColorToRGB).red) {
    return polishedRGBA(
      (c as ColorToRGB).red,
      (c as ColorToRGB).green,
      (c as ColorToRGB).blue,
      amount
    );
  }

  const rgb = parseToRgb(c as string);
  return polishedRGBA(rgb.red, rgb.green, rgb.blue, amount);
};

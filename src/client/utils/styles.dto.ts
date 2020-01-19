export const enum ThemeType {
  Light = 'LIGHT',
  Dark = 'DARK',
}

export interface ColorDefinitions {
  [index: string]: string;
  primary: string;
  secondary: string;
  background: string;
  paper: string;
  danger: string;
  disabled: string;
  disabledText: string;
}

export type ColorType = {
  [ThemeType.Light]: ColorDefinitions;
  [ThemeType.Dark]: ColorDefinitions;
};

export interface ActionType<T> {
  type: T;
  payload: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type ReducerType<S, T> = (state: S | undefined, action: ActionType<T>) => S;

export type CreatorType<T> = {
  [index: string]: (...args: any[]) => ActionType<T>; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export interface ColorLevels {
  main: string;
  light: string;
  dark: string;
  darkest: string;
  contrast: string;
}

export interface Colors {
  primary: ColorLevels;
  secondary: ColorLevels;
  danger: ColorLevels;
  background: ColorLevels;
  divider: ColorLevels;
  active: ColorLevels;
  border: ColorLevels;
}

export interface Theme {
  colors: Colors;
}

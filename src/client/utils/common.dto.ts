export interface ActionType<T> {
  type: T;
  payload: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type ReducerType<S, T> = (state: S | undefined, action: ActionType<T>) => S;

export type CreatorType<T> = {
  [index: string]: (...args: any[]) => ActionType<T>; // eslint-disable-line @typescript-eslint/no-explicit-any
};

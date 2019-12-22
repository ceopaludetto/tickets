export interface ActionType<T> {
  type: T;
  payload: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type ReducerType<S, T> = (state: S | undefined, action: ActionType<T>) => S;

export type CreatorType<T> = {
  [index: string]: (...args: any[]) => ActionType<T>; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export type ElementProps<
  E extends keyof JSX.IntrinsicElements | React.ComponentType<any> // eslint-disable-line @typescript-eslint/no-explicit-any
> = E extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[E] : React.ComponentProps<E>;

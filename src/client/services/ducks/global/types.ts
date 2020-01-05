export const enum GlobalTypes {
  PAGE_REQUEST = '@global:PAGE_LOAD',
  PAGE_SUCCESS = '@global:PAGE_SUCCESS',
  PAGE_FAILURE = '@global:PAGE_FAILURE',
}

export interface GlobalState {
  readonly error: boolean;
  readonly loading: boolean;
  readonly success: boolean;
}

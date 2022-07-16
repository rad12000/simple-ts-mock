export type BasicMethod = (...args: unknown[]) => unknown;
export type MethodOrNeverReturnType<T> = T extends BasicMethod
  ? ReturnType<T>
  : never;
export type FieldOrNeverReturnType<T> = T extends BasicMethod ? never : T;

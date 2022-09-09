export type BasicMethod = (...args: any[]) => any;
export type NonMethodType<T> = T extends BasicMethod ? never : T;

export type ObjectMember<Base> = {
  [Key in keyof Base]: Base[Key];
};

// Method only types
type FlagIncludedTypes<Base, Type> = {
  [Key in keyof Base]: Base[Key] extends Type ? Key : never;
};
type AllowedNames<Base, Type> = FlagIncludedTypes<Base, Type>[keyof Base];
type AllowType<Base, Type> = Pick<Base, AllowedNames<Base, Type>>;
export type InstanceMethods<T> = AllowType<T, BasicMethod>;

// Field only types
type FlagExcludedTypes<Base, Type> = {
  [Key in keyof Base]: Base[Key] extends Type ? never : Key;
};
type AllowedKeys<Base, Type> = FlagExcludedTypes<Base, Type>[keyof Base];
type OmitType<Base, Type> = Pick<Base, AllowedKeys<Base, Type>>;
export type InstanceFields<T> = OmitType<T, BasicMethod>;

export type ObjectInstance = Record<
  string,
  { value: unknown; active: boolean }
>;

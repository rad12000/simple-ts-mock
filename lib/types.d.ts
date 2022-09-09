export declare type BasicMethod = (...args: any[]) => any;
export declare type NonMethodType<T> = T extends BasicMethod ? never : T;
export declare type ObjectMember<Base> = {
    [Key in keyof Base]: Base[Key];
};
declare type FlagIncludedTypes<Base, Type> = {
    [Key in keyof Base]: Base[Key] extends Type ? Key : never;
};
declare type AllowedNames<Base, Type> = FlagIncludedTypes<Base, Type>[keyof Base];
declare type AllowType<Base, Type> = Pick<Base, AllowedNames<Base, Type>>;
export declare type InstanceMethods<T> = AllowType<T, BasicMethod>;
declare type FlagExcludedTypes<Base, Type> = {
    [Key in keyof Base]: Base[Key] extends Type ? never : Key;
};
declare type AllowedKeys<Base, Type> = FlagExcludedTypes<Base, Type>[keyof Base];
declare type OmitType<Base, Type> = Pick<Base, AllowedKeys<Base, Type>>;
export declare type InstanceFields<T> = OmitType<T, BasicMethod>;
export declare type ObjectInstance = Record<string, {
    value: unknown;
    active: boolean;
}>;
export {};

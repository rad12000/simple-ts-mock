import { ConfigureReturn, ConfigureValue } from "./configurables";
declare class Mock<T> {
    private readonly propertyConfigMap;
    private readonly _object;
    constructor();
    getCallCount: (property: keyof T) => number;
    resetCallCount(): void;
    object(): T;
    setupMethod<K extends keyof T>(methodName: K): ConfigureReturn<T, K>;
    setupField<K extends keyof T>(fieldName: K): ConfigureValue<T, K>;
}
export { Mock };

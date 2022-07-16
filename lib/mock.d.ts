import { ConfigureReturn, ConfigureValue } from "./configureables";
declare class Mock<T> {
    private readonly propertyConfigMap;
    private readonly _object;
    constructor();
    calledCount: (method: keyof T) => number;
    clearCalls: () => void;
    object: () => T;
    setupMethod<K extends keyof T>(methodName: K): ConfigureReturn<T, K>;
    setupField<K extends keyof T>(fieldName: K): ConfigureValue<T, K>;
}
export { Mock };

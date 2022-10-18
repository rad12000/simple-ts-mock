import { ConfigurableMock } from "./configurables";
declare class Mock<T> {
    private readonly propertyConfigMap;
    private readonly _object;
    constructor();
    getCallCount<R>(configure: (instance: T) => R): number;
    resetCallCount(): void;
    object(): T;
    setup<R>(configure: (instance: T) => R): ConfigurableMock<R>;
}
export { Mock };

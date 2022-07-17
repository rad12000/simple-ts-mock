import { FieldOrNeverReturnType } from "../types";
import { ConfigureableMock } from "./configureable-mock.interface";
export declare class ConfigureValue<T, K extends keyof T> implements ConfigureableMock {
    private memberAccessedCount;
    private readonly property;
    private readonly objectInstance;
    constructor(objectInstance: T, propertyName: K);
    set(value: FieldOrNeverReturnType<T[K]>, retain?: boolean): void;
    getCallCount(): number;
    resetCallCount(): void;
}

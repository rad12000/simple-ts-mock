import { MethodOrNeverReturnType } from "../types";
import { ConfigureableMock } from "./configureable-mock.interface";
export declare class ConfigureReturn<T, K extends keyof T> implements ConfigureableMock {
    private methodCallsCount;
    private readonly property;
    private readonly objectInstance;
    constructor(objectInstance: T, property: K);
    returns(value: MethodOrNeverReturnType<T[K]>, retain?: boolean): void;
    returnsAsync(value: Awaited<MethodOrNeverReturnType<T[K]>>, retain?: boolean): void;
    throws(error: Error, retain?: boolean): void;
    throwsAsync(error: Error, retain?: boolean): void;
    getCallCount: () => number;
    resetCallCount: () => void;
}

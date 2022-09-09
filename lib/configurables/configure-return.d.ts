import { ObjectInstance } from "../types";
import { ConfigureableMock } from "./configurable-mock.interface";
export declare class ConfigureReturn<R> implements ConfigureableMock<R> {
    private methodCallsCount;
    private readonly propertyName;
    private readonly objectInstance;
    private readonly params;
    constructor(objectInstance: ObjectInstance, propertyName: string, params: unknown[]);
    returns(value: R, retain?: boolean): void;
    returnsAsync(value: Awaited<R>, retain?: boolean): void;
    throws(error: Error, retain?: boolean): void;
    throwsAsync(error: Error, retain?: boolean): void;
    getCallCount: () => number;
    resetCallCount: () => void;
    private wrapMethod;
}

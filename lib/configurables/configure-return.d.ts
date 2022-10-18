import { ObjectInstance } from "../types";
import { ConfigurableMock, MockReturns, MockThrows } from "./interfaces";
export declare class ConfigureReturn<R> implements ConfigurableMock<R> {
    private methodCallsCount;
    private readonly propertyName;
    private readonly objectInstance;
    private readonly params;
    private callbackFunc?;
    actualParams?: unknown[];
    constructor(objectInstance: ObjectInstance, propertyName: string, params: unknown[]);
    callback<T extends unknown[]>(func: (...args: T) => void): MockReturns<R> & MockThrows;
    returns(value: R, retain?: boolean): void;
    returnsAsync(value: Awaited<R>, retain?: boolean): void;
    throws(error: Error, retain?: boolean): void;
    throwsAsync(error: Error, retain?: boolean): void;
    getCallCount: () => number;
    resetCallCount: () => void;
    private wrapMethod;
}

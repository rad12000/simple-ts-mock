import { ObjectInstance } from "../types";
import { ConfigurableMock, MockReturns, MockThrows } from "./interfaces";
export declare class ConfigureValue<R> implements ConfigurableMock<R> {
    private memberAccessedCount;
    private readonly propertyName;
    private readonly objectInstance;
    constructor(objectInstance: ObjectInstance, propertyName: string);
    callback<T extends unknown[]>(_: (...args: T) => void): MockReturns<R> & MockThrows;
    returns(value: R, retain?: boolean | undefined): void;
    returnsAsync(value: Awaited<R>, retain?: boolean | undefined): void;
    throws(error: Error, retain?: boolean | undefined): void;
    throwsAsync(error: Error, retain?: boolean | undefined): void;
    getCallCount(): number;
    resetCallCount(): void;
}

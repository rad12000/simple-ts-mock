import { ObjectInstance } from "../types";
import { ConfigureableMock } from "./configurable-mock.interface";
export declare class ConfigureValue<R> implements ConfigureableMock<R> {
    private memberAccessedCount;
    private readonly propertyName;
    private readonly objectInstance;
    constructor(objectInstance: ObjectInstance, propertyName: string);
    returns(value: R, retain?: boolean | undefined): void;
    returnsAsync(value: Awaited<R>, retain?: boolean | undefined): void;
    throws(error: Error, retain?: boolean | undefined): void;
    throwsAsync(error: Error, retain?: boolean | undefined): void;
    getCallCount(): number;
    resetCallCount(): void;
}

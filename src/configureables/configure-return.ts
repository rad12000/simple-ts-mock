import { MethodOrNeverReturnType } from "../types";
import { ConfigureableMock } from "./configureable-mock.interface";

export class ConfigureReturn<T, K extends keyof T>
    implements ConfigureableMock
{
    private methodCallsCount: number;

    private readonly property: K;
    private readonly objectInstance: T;

    constructor(objectInstance: T, property: K) {
        this.objectInstance = objectInstance;
        this.property = property;
        this.methodCallsCount = 0;
    }

    /**
     * Configures the return value for the given method.
     * @param value The value to return.
     * @param retain A boolean which determines if the mocked return value
     * should be kept for future calls. Default: false.
     */
    returns(value: MethodOrNeverReturnType<T[K]>, retain = false): void {
        const propertyValueWrapper = () => {
            this.methodCallsCount++;
            if (!retain) {
                (this.objectInstance[this.property] as unknown) = null;
            }
            return value;
        };

        (this.objectInstance[this.property] as unknown) = propertyValueWrapper;
    }

    /**
     * Configures the return value for the given method.
     * @param value The value to return.
     * @param retain A boolean which determines if the mocked return value
     * should be kept for future calls. Default: false.
     */
    returnsAsync(
        value: Awaited<MethodOrNeverReturnType<T[K]>>,
        retain = false
    ): void {
        const propertyValueWrapper = async () => {
            this.methodCallsCount++;
            if (!retain) {
                (this.objectInstance[this.property] as unknown) = null;
            }
            return value;
        };

        (this.objectInstance[this.property] as unknown) = propertyValueWrapper;
    }

    /**
     * Configures an error to be thrown by the given method.
     * @param error The error to be thrown.
     * @param retain A boolean which determines if the mocked return value
     * should be kept for future calls. Default: false.
     */
    throws(error: Error, retain = false): void {
        const propertyValueWrapper = () => {
            this.methodCallsCount++;
            if (!retain) {
                (this.objectInstance[this.property] as unknown) = null;
            }

            throw error;
        };

        (this.objectInstance[this.property] as unknown) = propertyValueWrapper;
    }

    /**
     * Configures an error to be thrown by the given method.
     * @param error The error to be thrown.
     * @param retain A boolean which determines if the mocked return value
     * should be kept for future calls. Default: false.
     */
    throwsAsync(error: Error, retain = false): void {
        const propertyValueWrapper = async () => {
            this.methodCallsCount++;
            if (!retain) {
                (this.objectInstance[this.property] as unknown) = null;
            }

            throw error;
        };

        (this.objectInstance[this.property] as unknown) = propertyValueWrapper;
    }

    getCallCount = (): number => this.methodCallsCount;

    resetCallCount = (): void => {
        this.methodCallsCount = 0;
    };
}

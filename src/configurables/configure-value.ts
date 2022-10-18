import { ObjectInstance } from "../types";
import { ConfigurableValue, MockReturns, MockThrows } from "./interfaces";

export class ConfigureValue<R> implements ConfigurableValue<R> {
    private memberAccessedCount: number;

    private readonly propertyName: string;
    private readonly objectInstance: ObjectInstance;

    constructor(objectInstance: ObjectInstance, propertyName: string) {
        this.objectInstance = objectInstance;
        this.propertyName = propertyName;
        this.memberAccessedCount = 0;

        // Initial setup
        Object.defineProperty(this.objectInstance, this.propertyName, {
            get: () => {
                this.memberAccessedCount++;
            },
            configurable: true,
        });
    }

    callback<T extends unknown[]>(
        _: (...args: T) => void
    ): MockReturns<R> & MockThrows {
        throw new Error(
            "Callbacks may only be used when configuring method calls, not fields!"
        );
    }

    returns(value: R, retain?: boolean | undefined): void {
        const privateKey = `_${this.propertyName.toString()}`;

        // Set the private value
        this.objectInstance[privateKey] = { value, active: true };
        Object.defineProperty(this.objectInstance, this.propertyName, {
            get: () => {
                this.memberAccessedCount++;
                let configuredObj = this.objectInstance[privateKey];
                let { value: returnValue, active } = configuredObj;

                if (!active) {
                    delete this.objectInstance[privateKey];

                    return;
                }

                if (!retain) {
                    configuredObj.active = false;
                }

                return returnValue;
            },
            set: (val) => {
                this.objectInstance[privateKey].value = val;
            },
            configurable: true,
        });
    }

    returnsAsync(value: Awaited<R>, retain?: boolean | undefined): void {
        const privateKey = `_${this.propertyName.toString()}`;

        // Set the private value
        this.objectInstance[privateKey] = { value, active: true };
        Object.defineProperty(this.objectInstance, this.propertyName, {
            get: () => {
                this.memberAccessedCount++;
                let configuredObj = this.objectInstance[privateKey];
                let { value: returnValue, active } = configuredObj;

                if (!active) {
                    delete this.objectInstance[privateKey];

                    return;
                }

                if (!retain) {
                    configuredObj.active = false;
                }

                return Promise.resolve(returnValue);
            },
            set: (val) => {
                this.objectInstance[privateKey].value = val;
            },
            configurable: true,
        });
    }

    throws(error: Error, retain?: boolean | undefined): void {
        const privateKey = `_${this.propertyName.toString()}`;

        Object.defineProperty(this.objectInstance, this.propertyName, {
            get: () => {
                this.memberAccessedCount++;
                throw error;
            },
            configurable: true,
        });
    }

    throwsAsync(error: Error, retain?: boolean | undefined): void {
        Object.defineProperty(this.objectInstance, this.propertyName, {
            get: async () => {
                this.memberAccessedCount++;
                throw error;
            },
            configurable: true,
        });
    }

    getCallCount(): number {
        return this.memberAccessedCount;
    }

    resetCallCount(): void {
        this.memberAccessedCount = 0;
    }
}

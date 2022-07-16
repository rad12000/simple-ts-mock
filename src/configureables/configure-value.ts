import { FieldOrNeverReturnType } from "../types";
import { ConfigureableMock } from "./configureable-mock.interface";

export class ConfigureValue<T, K extends keyof T> implements ConfigureableMock {
    private memberAccessedCount: number;

    private readonly property: K;
    private readonly objectInstance: T;

    constructor(objectInstance: T, propertyName: K) {
        this.objectInstance = objectInstance;
        this.property = propertyName;
        this.memberAccessedCount = 0;
    }

    /**
     * Sets value for the given field..
     * @param value The value to return.
     * @param retain A boolean which determines if the mocked return value
     * should be kept for future calls. Default: false.
     */
    set(value: FieldOrNeverReturnType<T[K]>, retain = false): void {
        const obj = this.objectInstance as Record<string, unknown>;
        const privateKey = `_${this.property.toString()}`;
        obj[privateKey] = value;
        Object.defineProperty(this.objectInstance, this.property, {
            get: () => {
                this.memberAccessedCount++;

                let returnValue = obj[privateKey];
                if (!retain) {
                    if (typeof obj[privateKey] === "object") {
                        returnValue = Array.isArray(obj[privateKey])
                            ? [...(obj[privateKey] as [])]
                            : { ...(obj[privateKey] as object) };
                    }

                    obj[privateKey] = null;
                }

                return returnValue;
            },
            set: (val) => {
                obj[privateKey] = val;
            },
        });
    }

    getCallCount(): number {
        return this.memberAccessedCount;
    }

    resetCallCount(): void {
        this.memberAccessedCount = 0;
    }
}

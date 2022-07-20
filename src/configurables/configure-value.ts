import { ConfigureableMock } from "./configurable-mock.interface";

export class ConfigureValue<R> implements ConfigureableMock<R> {
    private memberAccessedCount: number;

    private readonly propertyName: string;
    private readonly objectInstance: Record<string, unknown>;

    constructor(objectInstance: Record<string, unknown>, propertyName: string) {
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

    returns(value: R, retain?: boolean | undefined): void {
        const privateKey = `_${this.propertyName.toString()}`;

        // Set the private value
        this.objectInstance[privateKey] = value;
        Object.defineProperty(this.objectInstance, this.propertyName, {
            get: () => {
                this.memberAccessedCount++;

                let returnValue = this.objectInstance[privateKey];
                if (!retain) {
                    if (
                        this.objectInstance[privateKey] !== null &&
                        typeof this.objectInstance[privateKey] === "object"
                    ) {
                        returnValue = Array.isArray(
                            this.objectInstance[privateKey]
                        )
                            ? [...(this.objectInstance[privateKey] as [])]
                            : {
                                  ...(this.objectInstance[
                                      privateKey
                                  ] as object),
                              };
                    }

                    this.objectInstance[privateKey] = null;
                }

                return returnValue;
            },
            set: (val) => {
                this.objectInstance[privateKey] = val;
            },
            configurable: true,
        });
    }

    returnsAsync(value: Awaited<R>, retain?: boolean | undefined): void {
        const privateKey = `_${this.propertyName.toString()}`;

        // Set the private value
        this.objectInstance[privateKey] = value;
        Object.defineProperty(this.objectInstance, this.propertyName, {
            get: () => {
                this.memberAccessedCount++;

                let returnValue = this.objectInstance[privateKey];
                if (!retain) {
                    if (
                        this.objectInstance[privateKey] !== null &&
                        typeof this.objectInstance[privateKey] === "object"
                    ) {
                        returnValue = Array.isArray(
                            this.objectInstance[privateKey]
                        )
                            ? [...(this.objectInstance[privateKey] as [])]
                            : {
                                  ...(this.objectInstance[
                                      privateKey
                                  ] as object),
                              };
                    }

                    this.objectInstance[privateKey] = null;
                }

                return Promise.resolve(returnValue);
            },
            set: (val) => {
                this.objectInstance[privateKey] = val;
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

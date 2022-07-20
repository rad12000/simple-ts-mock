import { ConfigureableMock } from "./configureable-mock.interface";

export class ConfigureReturn<R> implements ConfigureableMock<R> {
    private methodCallsCount: number;

    private readonly propertyName: string;
    private readonly objectInstance: Record<string, unknown>;
    private readonly params: unknown[];

    constructor(
        objectInstance: Record<string, unknown>,
        propertyName: string,
        params: unknown[]
    ) {
        this.objectInstance = objectInstance;
        this.propertyName = propertyName;
        this.params = params;
        this.methodCallsCount = 0;
    }

    returns(value: R, retain = false): void {
        const propertyValueWrapper = () => {
            this.methodCallsCount++;
            if (!retain) {
                this.objectInstance[this.propertyName] = null;
            }
            return value;
        };

        this.objectInstance[this.propertyName] = propertyValueWrapper;
    }

    returnsAsync(value: Awaited<R>, retain = false): void {
        const propertyValueWrapper = () => {
            this.methodCallsCount++;
            if (!retain) {
                this.objectInstance[this.propertyName] = null;
            }
            return Promise.resolve(value);
        };

        this.objectInstance[this.propertyName] = propertyValueWrapper;
    }

    throws(error: Error, retain = false): void {
        const propertyValueWrapper = () => {
            this.methodCallsCount++;
            if (!retain) {
                this.objectInstance[this.propertyName] = null;
            }

            throw error;
        };

        this.objectInstance[this.propertyName] = propertyValueWrapper;
    }

    throwsAsync(error: Error, retain = false): void {
        const propertyValueWrapper = async () => {
            this.methodCallsCount++;
            if (!retain) {
                this.objectInstance[this.propertyName] = null;
            }

            throw error;
        };

        this.objectInstance[this.propertyName] = propertyValueWrapper;
    }

    getCallCount = (): number => this.methodCallsCount;

    resetCallCount = (): void => {
        this.methodCallsCount = 0;
    };
}

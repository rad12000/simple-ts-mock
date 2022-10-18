import { BasicMethod, ObjectInstance } from "../types";
import { ConfigurableMock, MockReturns, MockThrows } from "./interfaces";
import { anyValue } from "./its";

export class ConfigureReturn<R> implements ConfigurableMock<R> {
    private methodCallsCount: number;

    private readonly propertyName: string;
    private readonly objectInstance: ObjectInstance;
    private readonly params: unknown[];
    private callbackFunc?: BasicMethod;
    actualParams?: unknown[];

    constructor(
        objectInstance: ObjectInstance,
        propertyName: string,
        params: unknown[]
    ) {
        this.objectInstance = objectInstance;
        this.propertyName = propertyName;
        this.params = params;
        this.methodCallsCount = 0;
        this.wrapMethod();
    }

    callback<T extends unknown[]>(
        func: (...args: T) => void
    ): MockReturns<R> & MockThrows {
        this.callbackFunc = func;
        return this;
    }

    returns(value: R, retain = false): void {
        const handler = () => {
            if (!retain) {
                delete this.objectInstance[this.propertyName];
            }
            return value;
        };

        this.wrapMethod(handler);
    }

    returnsAsync(value: Awaited<R>, retain = false): void {
        const handler = () => {
            if (!retain) {
                delete this.objectInstance[this.propertyName];
            }
            return Promise.resolve(value);
        };

        this.wrapMethod(handler);
    }

    throws(error: Error, retain = false): void {
        const handler = () => {
            if (!retain) {
                delete this.objectInstance[this.propertyName];
            }

            throw error;
        };

        this.wrapMethod(handler);
    }

    throwsAsync(error: Error, retain = false): void {
        const handler = async () => {
            if (!retain) {
                delete this.objectInstance[this.propertyName];
            }

            throw error;
        };

        this.wrapMethod(handler);
    }

    getCallCount = (): number => this.methodCallsCount;

    resetCallCount = (): void => {
        this.methodCallsCount = 0;
    };

    private wrapMethod(method?: BasicMethod): void {
        const propertyValueWrapper = (...args: unknown[]) => {
            let isValidCall = true;
            this.actualParams = args;

            try {
                for (let i = 0; i < args.length; i++) {
                    const expectedParam = this.params[i];

                    if (expectedParam === anyValue) continue;
                    if (expectedParam === args[i]) continue;
                    isValidCall = false;
                }
            } catch (e) {
                console.log(e);
                isValidCall = false;
            }

            if (!isValidCall) {
                return;
            }

            this.methodCallsCount++;

            if (this.callbackFunc) {
                this.callbackFunc(...args);
            }

            if (method !== undefined) {
                return method();
            }
        };

        (this.objectInstance[this.propertyName] as unknown) =
            propertyValueWrapper;
    }
}

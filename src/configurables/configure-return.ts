import { BasicMethod } from "../types";
import { ConfigureableMock } from "./configurable-mock.interface";
import { anyValue } from "./its";

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
        this.wrapMethod();
    }

    returns(value: R, retain = false): void {
        const handler = () => {
            if (!retain) {
                this.objectInstance[this.propertyName] = null;
            }
            return value;
        };

        this.wrapMethod(handler);
    }

    returnsAsync(value: Awaited<R>, retain = false): void {
        const handler = () => {
            if (!retain) {
                this.objectInstance[this.propertyName] = null;
            }
            return Promise.resolve(value);
        };

        this.wrapMethod(handler);
    }

    throws(error: Error, retain = false): void {
        const handler = () => {
            if (!retain) {
                this.objectInstance[this.propertyName] = null;
            }

            throw error;
        };

        this.wrapMethod(handler);
    }

    throwsAsync(error: Error, retain = false): void {
        const handler = async () => {
            if (!retain) {
                this.objectInstance[this.propertyName] = null;
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

            if (isValidCall) {
                this.methodCallsCount++;
            }

            if (method !== undefined) {
                return method();
            }
        };

        this.objectInstance[this.propertyName] = propertyValueWrapper;
    }
}

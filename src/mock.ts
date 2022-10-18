import { ObjectInstance } from "./types";
import { anyValue } from "./configurables/its/it-is-any";
import {
    ConfigurableMethod,
    ConfigurableValue,
    ConfigureReturn,
    ConfigureValue,
} from "./configurables";
import { Callable } from "./configurables/callable.interface";

/**
 * A class which simplifies mocking of interfaces and classes alike.
 */
class Mock<T> {
    private readonly propertyConfigMap: Record<
        string,
        ConfigurableMethod<T> | ConfigurableValue<T>
    >;

    private readonly _object: T;

    constructor() {
        this._object = {} as unknown as T;
        this.propertyConfigMap = {} as Record<
            string,
            ConfigurableMethod<T> | ConfigurableValue<T>
        >;
    }

    /**
     * Gets the number of calls for a given property.
     * @param configure The property to check the number of calls on.
     * @returns The number of times the method was called.
     */

    getCallCount<R>(configure: (instance: T) => R): number {
        const mockConfig: {
            isMethod: boolean;
            params: unknown[];
            propName: string;
        } = { isMethod: false, params: [], propName: "" };

        // @ts-ignore
        const proxyHandler: ProxyHandler<T> = {
            get: (_: T, propertyName: string) => {
                mockConfig.propName = propertyName;
                return function (...args: unknown[]) {
                    mockConfig.isMethod = true;
                    mockConfig.params = args;
                };
            },
        };

        // @ts-ignore
        const proxyT = new Proxy<T>({} as unknown as T, proxyHandler);

        configure(proxyT);

        const mockedProp = this.propertyConfigMap[mockConfig.propName];

        if (!mockedProp) {
            return 0;
        }

        if (mockConfig.isMethod) {
            const mockedMethod = mockedProp as ConfigureReturn<T>;

            if (!mockedMethod.actualParams) {
                return 0;
            }

            const paramLength = [
                mockedMethod.actualParams.length,
                mockConfig.params.length,
            ].sort((a, b) => b - a)[0];

            for (let i = 0; i < paramLength; i++) {
                if (mockConfig.params[i] == anyValue) {
                    continue;
                }

                if (mockedMethod.actualParams[i] !== mockConfig.params[i]) {
                    return 0;
                }
            }
        }

        return mockedProp.getCallCount();
    }

    /**
     * Clears call count for all methods.
     */
    resetCallCount(): void {
        for (const key of Object.keys(this.propertyConfigMap)) {
            const obj = this.propertyConfigMap as Record<string, Callable>;
            obj[key].resetCallCount();
        }
    }

    /**
     * Get the mocked object.
     * @returns The mocked instance of @type {T}
     */
    object(): T {
        return this._object;
    }

    /**
     * Sets up a method to mock.
     * @param configure a handler to specify the property to mock.
     * @returns A configurable object.
     */
    setup<R>(
        configure: (instance: T) => R
    ): ConfigurableMethod<R> | ConfigurableValue<R> {
        const mockConfig: {
            isMethod: boolean;
            params: unknown[];
            propName: string;
        } = { isMethod: false, params: [], propName: "" };

        // @ts-ignore
        const proxyHandler: ProxyHandler<T> = {
            get: (_: T, propertyName: string) => {
                mockConfig.propName = propertyName;
                return function (...args: unknown[]) {
                    mockConfig.isMethod = true;
                    mockConfig.params = args;
                };
            },
        };

        // @ts-ignore
        const proxyT = new Proxy<T>({} as unknown as T, proxyHandler);

        configure(proxyT);

        let configureObject: ConfigurableValue<R> | ConfigurableValue<R>;
        if (mockConfig.isMethod) {
            configureObject = new ConfigureReturn<R>(
                this._object as ObjectInstance,
                mockConfig.propName,
                mockConfig.params
            );
        } else {
            configureObject = new ConfigureValue<R>(
                this._object as ObjectInstance,
                mockConfig.propName
            );
        }

        (
            this.propertyConfigMap as unknown as Record<
                string,
                ConfigurableMethod<R> | ConfigurableValue<R>
            >
        )[mockConfig.propName] = configureObject;

        return configureObject;
    }
}

export { Mock };

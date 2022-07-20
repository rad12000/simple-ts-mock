import {
    ConfigureableMock,
    ConfigureReturn,
    ConfigureValue,
} from "./configurables";

/**
 * A class which simplifies mocking of interfaces and classes alike.
 */
class Mock<T> {
    private readonly propertyConfigMap: Record<string, ConfigureableMock<T>>;

    private readonly _object: T;

    constructor() {
        this._object = {} as unknown as T;
        this.propertyConfigMap = {} as Record<string, ConfigureableMock<T>>;
    }

    /**
     * Gets the number of calls for a given property.
     * @param property The property to check the number of calls on.
     * @returns The number of times the method was called.
     */
    getCallCount = (property: keyof T): number =>
        this.propertyConfigMap[property.toString()]?.getCallCount() ?? 0;

    /**
     * Clears call count for all methods.
     */
    resetCallCount(): void {
        for (const key of Object.keys(this.propertyConfigMap)) {
            const obj = this.propertyConfigMap as Record<
                string,
                ConfigureableMock<T>
            >;
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
    setup<R>(configure: (instance: T) => R): ConfigureableMock<R> {
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

        let configureObject: ConfigureableMock<R>;
        if (mockConfig.isMethod) {
            configureObject = new ConfigureReturn<R>(
                this._object as Record<string, unknown>,
                mockConfig.propName,
                mockConfig.params
            );
        } else {
            configureObject = new ConfigureValue<R>(
                this._object as Record<string, unknown>,
                mockConfig.propName
            );
        }

        (
            this.propertyConfigMap as unknown as Record<
                string,
                ConfigureableMock<R>
            >
        )[mockConfig.propName] = configureObject;

        return configureObject;
    }

    /**
     * Sets up a method to mock.
     * @param fieldName The name of the method to mock.
     * @returns A configurable object.
     */
    // setupField<K extends keyof T>(fieldName: K): ConfigureValue<T, K> {
    //     const returns = new ConfigureValue<T, K>(this._object, fieldName);
    //     this.propertyConfigMap[fieldName] = returns;

    //     return returns;
    // }
}

export { Mock };

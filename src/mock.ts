import {
    ConfigureableMock,
    ConfigureReturn,
    ConfigureValue,
} from "./configureables";

/**
 * A class which simplifies mocking of interfaces and classes alike.
 */
class Mock<T> {
    private readonly propertyConfigMap: Record<keyof T, ConfigureableMock>;

    private readonly _object: T;

    constructor() {
        this._object = {} as unknown as T;
        this.propertyConfigMap = {} as Record<keyof T, ConfigureableMock>;
    }

    /**
     * Gets the number of calls for a given method.
     * @param method The method to check the number of calls on.
     * @returns The number of times the method was called.
     */
    getCallCount = (method: keyof T): number =>
        this.propertyConfigMap[method]?.getCallCount() ?? 0;

    /**
     * Clears call count for all methods.
     */
    resetCallCount = (): void => {
        for (const key of Object.keys(this.propertyConfigMap)) {
            const obj = this.propertyConfigMap as Record<
                string,
                ConfigureableMock
            >;
            obj[key].resetCallCount();
        }
    };

    /**
     * Get the mocked object.
     * @returns The mocked instance of @type {T}
     */
    object: () => T = (): T => this._object;

    /**
     * Sets up a method to mock.
     * @param methodName The name of the method to mock.
     * @returns A configurable object.
     */
    setupMethod<K extends keyof T>(methodName: K): ConfigureReturn<T, K> {
        const returns = new ConfigureReturn<T, K>(this._object, methodName);
        this.propertyConfigMap[methodName] = returns;

        return returns;
    }

    /**
     * Sets up a method to mock.
     * @param fieldName The name of the method to mock.
     * @returns A configurable object.
     */
    setupField<K extends keyof T>(fieldName: K): ConfigureValue<T, K> {
        const returns = new ConfigureValue<T, K>(this._object, fieldName);
        this.propertyConfigMap[fieldName] = returns;

        return returns;
    }
}

export { Mock };

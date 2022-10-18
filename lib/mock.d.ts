import { ConfigurableMock } from "./configurables";
/**
 * A class which simplifies mocking of interfaces and classes alike.
 */
declare class Mock<T> {
    private readonly propertyConfigMap;
    private readonly _object;
    constructor();
    /**
     * Gets the number of calls for a given property.
     * @param configure The property to check the number of calls on.
     * @returns The number of times the method was called.
     */
    getCallCount<R>(configure: (instance: T) => R): number;
    /**
     * Clears call count for all methods.
     */
    resetCallCount(): void;
    /**
     * Get the mocked object.
     * @returns The mocked instance of @type {T}
     */
    object(): T;
    /**
     * Sets up a method to mock.
     * @param configure a handler to specify the property to mock.
     * @returns A configurable object.
     */
    setup<R>(configure: (instance: T) => R): ConfigurableMock<R>;
}
export { Mock };

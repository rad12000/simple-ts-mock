export interface ConfigureableMock<R> {
    /**
     * Get the number of a calls for method.
     * @returns The number of times the given method has been called.
     */
    getCallCount(): number;

    /**
     * Configures the return value for the given property.
     * @param value The value to return.
     * @param retain A boolean which determines if the mocked return value
     * should be kept for future calls. Default: false.
     */
    returns(value: R, retain?: boolean): void;

    /**
     * Configures the return value for the given property.
     * @param value The value to return.
     * @param retain A boolean which determines if the mocked return value
     * should be kept for future calls. Default: false.
     */
    returnsAsync(value: Awaited<R>, retain?: boolean): void;

    /**
     * Clears the count of calls made to the provided method.
     * @returns {void}
     */
    resetCallCount(): void;

    /**
     * Configures an error to be thrown by the given property.
     * @param error The error to be thrown.
     * @param retain A boolean which determines if the mocked return value
     * should be kept for future calls. Default: false.
     */
    throws(error: Error, retain?: boolean): void;

    /**
     * Configures an error to be thrown by the given property.
     * @param error The error to be thrown.
     * @param retain A boolean which determines if the mocked return value
     * should be kept for future calls. Default: false.
     */
    throwsAsync(error: Error, retain?: boolean): void;
}

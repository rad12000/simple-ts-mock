export interface MockReturns<R> {
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
}

export interface Callable {
    /**
     * Get the number of a calls for method.
     * @returns The number of times the given method has been called.
     */
    getCallCount(): number;
    /**
     * Clears the count of calls made to the provided method.
     * @returns {void}
     */
    resetCallCount(): void;
}

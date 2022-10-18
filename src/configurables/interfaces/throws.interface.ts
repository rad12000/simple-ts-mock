export interface MockThrows {
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

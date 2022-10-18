export interface MockThrows {
    throws(error: Error, retain?: boolean): void;
    throwsAsync(error: Error, retain?: boolean): void;
}
